from googletrans import Translator
from rest_framework import serializers
from langchain_exa import ExaSearchRetriever
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from langdetect import detect
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from chat.utils import retrieve_cached_text


class PromptResponse:
    def __init__(self, output, query):
        if isinstance(output, str):
            self.output = self._chunkify(output, chunk_size=1024)
        else:
            self.output = output
        self.query = query

    @staticmethod
    def _chunkify(text, chunk_size):
        """Split text into chunks of specified size."""
        return (text[i:i + chunk_size] for i in range(0, len(text), chunk_size))


class ChatSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    def respond_to_chat(self):
        # this query will always have a value because of the validation
        query = self.validated_data.pop('query', '')

        original_query = query

        res = retrieve_cached_text(query)

        if res is not None:
            return PromptResponse(
                output=res,
                query=query
            )

        # check if this has been queried before
        lang = detect(query)

        # we can validate to work with only French and English,
        # but we're working with Google Translate so were all good
        if lang == 'unknown':
            raise NotImplementedError('We could not detect your language.')

        if lang != 'en':
            query = self.translate(query)

        return self.search_humber(original_query, query, lang)

    @staticmethod
    def translate(query: str, dest_language: str = 'en') -> str:
        translator = Translator()
        translation = translator.translate(query, dest=dest_language)
        return translation.text

    @staticmethod
    def search_humber(original_query: str, query: str, lang: str):
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

        llm = ChatOpenAI(
            stream=True
        )

        parser = StrOutputParser()

        chain = RunnableParallel(
            query=lambda x: x["query"],
            context=lambda x: retriever_chain.invoke(x["query"]),
            lang=lambda x: x["lang"]
        ) | generation_prompt | llm | parser

        output = chain.stream({
            "query": query,
            "lang": lang
        })

        return PromptResponse(
            output=output,
            query=original_query
        )
