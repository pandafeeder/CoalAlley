from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from serializers import ArticalListSerializer, ArticalSerializer, AuthorSerializer
from models import Artical
from django.contrib.auth import get_user_model
from django.http import Http404

from permissions import IsOwnerOrReadOnly


User = get_user_model()


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
	'articals': reverse('api:artical-list', request=request, format=format),
	#'authors':  reverse('api:author-list',  request=request, format=format)
	'token':  reverse('token',  request=request, format=format)
    })


class ArticalListView(APIView):
    """View for endpoint /articals, return artical list,
    GET and POST"""
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self, request, format=None):
        #print request.user
        articals = Artical.objects.all()
        serializer = ArticalListSerializer(articals, many=True, context={'request':request})
        return Response(serializer.data)

    def post(self, request, format=None):
        author = self.request.user
        request.data.update({'author': author.id})
        serializer = ArticalSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ArticalDetailView(APIView):
    """View for endpoint /artical/(?P<slug>), return detail of an artical,
    GET, PUT, DELETE"""
    permission_classes = (IsOwnerOrReadOnly,)
    def get_object(self, slug):
        try:
            return Artical.objects.get(slug=slug)
        except Artical.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        artical = self.get_object(slug)
        serializer = ArticalSerializer(artical, context={'request': request})
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        artical = self.get_object(slug)
        author = request.user
        request.data.update({'author': author.id})
        serializer = ArticalSerializer(artical, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        artical = self.get_object(slug)
        artical.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#class AuthorListView(generics.ListAPIView):
    #serializer_class = AuthorSerializer
    #queryset = User.objects.all()

#class AuthorDetailView(generics.RetrieveAPIView):
    #serializer_class = AuthorSerializer
    #queryset = User.objects.all()
