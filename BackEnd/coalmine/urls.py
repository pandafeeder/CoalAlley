from django.conf.urls import url
from . import views

urlpatterns = (
    url(r'^$', views.api_root, name='api-root'),
    url(r'^articals/?$', views.ArticalListView.as_view(), name='artical-list'),
    url(r'^articals/(?P<slug>[\d\w\-]+)', views.ArticalDetailView.as_view(), name='artical-detail'),
    #url(r'^authors/$', views.AuthorListView.as_view(), name='author-list'),
    #url(r'^authors/(?P<pk>\d+)', views.AuthorDetailView.as_view(), name='author-detail'),
)
