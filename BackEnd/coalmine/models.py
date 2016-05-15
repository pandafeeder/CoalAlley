from __future__ import unicode_literals

from django.utils.encoding import python_2_unicode_compatible
from django.db import models
from django.conf import settings

class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified= models.DateTimeField(auto_now=True)
    class Meta:
	abstract=True

@python_2_unicode_compatible
class Artical(BaseModel):
    title = models.CharField(max_length=100, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="articals")
    content = models.TextField()
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
	return self.title
    
    class Meta:
        ordering = ('-modified',)
