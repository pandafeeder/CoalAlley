from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='coalmine/index.html'), name='index'),
    url(r'^api/', include('coalmine.urls', namespace='api')) 
]


urlpatterns += [
        url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns += [
        url(r'^api-token-auth/', obtain_jwt_token, name="token"),
]

urlpatterns += [
        url(r'^test', TemplateView.as_view(template_name='coalmine/test.html')),
]
