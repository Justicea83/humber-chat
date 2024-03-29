from rest_framework import status
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
        serializer = ChatSerializer(data=request.data)

        if serializer.is_valid():
            return Response({
                'message': serializer.respond_to_chat()
            })
        return Response(status=status.HTTP_400_BAD_REQUEST)
