import jwt
import os
from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth.models import User

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET', 'secret'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')

        try:
            user = User.objects.get(id=payload.get('user_id'))
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')

        return (user, token)
