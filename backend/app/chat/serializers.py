from operator import itemgetter

from googletrans import Translator
from langchain_core.documents import Document
from rest_framework import serializers
from langchain_exa import ExaSearchRetriever
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from langdetect import detect
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser


class ChatSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    def respond_to_chat(self):
        # this query will always have a value because of the validation
        query = self.validated_data.pop('query', '')

        lang = detect(query)

        # we can validate to work with only French and English,
        # but we're working with Google Translate so were all good
        if lang == 'unknown':
            raise NotImplementedError('We could not detect your language.')

        if lang != 'en':
            query = self.translate(query)

        print('\n\n QUERY')
        # this is the english text
        print(query)

        return self.search_humber(query, lang)

    @staticmethod
    def translate(query: str, dest_language: str = 'en') -> str:
        translator = Translator()
        translation = translator.translate(query, dest=dest_language)
        return translation.text

    @staticmethod
    def search_humber(query: str, lang: str):
        retriever = ExaSearchRetriever(k=3, include_domains=['https://humber.ca'], highlights=True)

        document_prompt = PromptTemplate.from_template("""
        <source>
            <url>{url}</url>
            <highlights>{highlights}</highlights>
        </source>
        """)
        document_chain = RunnableLambda(
            lambda document:
            {
                "highlights": document.metadata['highlights'],
                'url': document.metadata['url']
            }
        ) | document_prompt

        retriever_chain = retriever | document_chain.map() | (lambda docs: "\n".join([i.text for i in docs]))

        generation_prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                "You are a helpful assistant at a Humber College."
                " You use xml-formatted context to research people's questions "
                "and provide valuable response"
            ),
            (
                "human", """
                Answer the following query based on the provided context. 
                Cite your sources at the end of your response.
                Answer in the language: {lang}
                Query: {query}
                <context>
                {context}
                </context>
                """
            ),
        ])

        llm = ChatOpenAI()
        parser = StrOutputParser()

        chain = RunnableParallel(
            query=lambda x: x["query"],
            context=lambda x: retriever_chain.invoke(x["query"]),
            lang=lambda x: x["lang"]
        ) | generation_prompt | llm | parser

        return chain.invoke({
            "query": query,
            "lang": lang
        })
