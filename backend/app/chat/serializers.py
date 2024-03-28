from rest_framework import serializers


class ChatSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    def respond_to_chat(self):
        pass
