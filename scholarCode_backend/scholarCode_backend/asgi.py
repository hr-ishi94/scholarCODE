"""
ASGI config for scholarCode_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from chat.channels_middleware import JWTwebsocketMiddleware 



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scholarCode_backend.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
# django.setup()


from chat.routing import websocket_urlpatterns
from notifications.route import notification_urlpatterns

django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter({
    'http':django_asgi_app,
    'websocket': 
    JWTwebsocketMiddleware(
        AuthMiddlewareStack(URLRouter(websocket_urlpatterns + notification_urlpatterns))
    )

})

