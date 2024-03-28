"""
URL mappings for the integrations
"""

from django.urls import (
    path
)

from chat.views import ChatView

app_name = 'chat'

urlpatterns = [
    path('', ChatView.as_view()),
]
