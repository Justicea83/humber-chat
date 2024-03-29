from django.http import StreamingHttpResponse
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from core.renderers.sse_renderer import ServerSentEventRenderer

from chat.serializers import ChatSerializer, PromptResponse
from chat.utils import cache_text


# Create your views here.

class ChatView(APIView):
    serializer_class = ChatSerializer
    authentication_classes = []
    permission_classes = []
    renderer_classes = [ServerSentEventRenderer]

    def get(self, request: Request):
        serializer = ChatSerializer(data=request.query_params)
        res = None

        if serializer.is_valid():
            try:
                res: PromptResponse = serializer.respond_to_chat()
            except Exception as e:
                print(e)

            if res is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            stream_data = []

            def event_stream():
                nonlocal stream_data
                for chunk in res.output:
                    if chunk:
                        stream_data.append(chunk)
                        print(chunk, end="|", flush=True)
                        data = json.dumps({
                            'text': chunk
                        })
                        yield f"data: {data}\n\n"
                    else:
                        if len(stream_data) > 0:
                            output_text = "".join(stream_data)
                            data = json.dumps({
                                'text': '<stream-complete>'
                            })
                            cache_text(res.query, output_text)
                            yield f"data: {data}\n\n"
                            break

            response = StreamingHttpResponse(event_stream(), content_type="text/event-stream")
            response['X-Accel-Buffering'] = 'no'  # Disable buffering in nginx
            response['Cache-Control'] = 'no-cache'  # Ensure clients don't cache the data
            return response

        return Response(status=status.HTTP_400_BAD_REQUEST)
