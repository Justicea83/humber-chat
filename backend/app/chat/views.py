from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.serializers import ChatSerializer


# Create your views here.

class ChatView(APIView):
    serializer_class = ChatSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request: Request):
        return Response()
