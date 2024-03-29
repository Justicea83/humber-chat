from googletrans import Translator
from rest_framework import serializers
from langdetect import detect


class ChatSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    def respond_to_chat(self):
        # this query will always have a value because of the validation
        query = self.validated_data.pop('query', '')

        lang = detect(query)

        # we can validate to work with only French and English,
        # but we're working with Google Translate so were all good

        if lang != 'en':
            query = self.translate(query)

        print('\n\n QUERY')
        # this is the english text
        print(query)

    @staticmethod
    def translate(query: str, dest_language: str = 'en') -> str:
        translator = Translator()
        translation = translator.translate(query, dest=dest_language)
        return translation.text

    @staticmethod
    def search_humber(query: str):
        pass
