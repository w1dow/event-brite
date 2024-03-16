from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

# all the endpoints
urlpatterns = [
    path('api/getuser', views.get_users),
    path('api/adduser', views.add_user,name="adduser"),
    path('api/addevent', views.add_event,name="addevent"),
    path('api/login', views.login),
    path('api/getevent', views.getevent),
    path('api/like', views.likethis),
    path('event_images/<path:image_path>', views.get_img, name='get_image'),  
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
