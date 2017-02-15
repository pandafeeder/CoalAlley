from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='coalmine/index.html'), name='index'),
    url(r'^api/', include('coalmine.urls', namespace='api')) 
]


urlpatterns += [
        url(r'^api-token-auth/', obtain_jwt_token, name="token"),
        url(r'^api-token-verify/', verify_jwt_token, name="verify"),
]
