from django.contrib.auth.models import get_user_model

from rest_framework.authentication import BaseAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed

import jwt
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.settings import JSONWebTokenAuthentication



class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split
        if not auth or auth[0].lower() != b"bearer":
            return None
        
        if len(auth) == 1:
            msg = "invalide bearer header. No credentials provided."
            raise AuthenticationFailed(msg)

        if len(auth) > 2:
            msg = "nvalid bearer header. Credentials string should not contain spaces."
            raise AuthenticationFailed(msg)

#JSONWebTokenAuthentication supplied by rest_framework_jwt doesn't attach user to request,
#the following class inherit it and set request.user by overriding its authenticate method
class JSONWebTokenAuthentication2(JSONWebTokenAuthentication):
    def authenticate(self, request):
        user = super(JSONWebTokenAuthentication2, self).authenticate()
