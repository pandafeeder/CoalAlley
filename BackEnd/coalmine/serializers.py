from models import Artical
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.reverse import reverse

User = get_user_model()

class ArticalBaseSerializer(serializers.ModelSerializer):
   
    self = serializers.HyperlinkedIdentityField(
            view_name="api:artical-detail",
            lookup_field="slug")

    owner = serializers.SerializerMethodField('to_get_owner')

    def to_get_owner(self, obj):
        return obj.author.username

class ArticalListSerializer(ArticalBaseSerializer):

    class Meta:
        model = Artical
        fields = ('title', 'self', 'owner', 'slug', 'modified',)


class ArticalSerializer(ArticalBaseSerializer):

    class Meta:
        model = Artical
        fields = ('title', 'self', 'owner', 'slug', 'author', 'content', 'modified')

    #override create, otherwise Aritcal needs a presaved author obj then 
    #raising a error
    def create(self, validated_data):
        author_instance = validated_data.pop('author')
        artical = Artical.objects.create(author=author_instance, **validated_data)
        return artical
        


class AuthorSerializer(serializers.ModelSerializer):
    self = serializers.HyperlinkedIdentityField(
            view_name="api:author-detail",
            lookup_field="pk")

    articals = serializers.SerializerMethodField('to_get_articals')
    class Meta:
        model = User
        fields = ('self', 'username', 'email', 'articals')
    def to_get_articals(self, obj):
        articals = obj.articals.all()
        request = self.context['request']
        links = []
        for artical in articals:
            links.append(reverse('api:artical-detail', kwargs={'slug': artical.slug}, request=request))
        return links
