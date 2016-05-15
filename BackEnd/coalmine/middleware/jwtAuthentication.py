from django.utils.functional import SimpleLazyObject
from django.contrib.auth.models import AnonymousUser

from rest_framework.request import Request
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

def get_user_jwt(request):
    user = None
    try:
        #print "AUTHENTICATING..."
        user_jwt = JSONWebTokenAuthentication().authenticate(Request(request))
        if user_jwt is not None:
            print user_jwt
            user = user_jwt[0]
    except:
        pass

    return user or AnonymousUser


class JWTAuthenticationMiddleware(object):
    def process_request(self, request):
        request.user = SimpleLazyObject(lambda : get_user_jwt(request))
