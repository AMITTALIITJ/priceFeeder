from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListCreateProductFeedAPIView.as_view(), name='get_post_productFeed'),
    path('<int:pk>/', views.RetrieveUpdateDestroyProductFeedAPIView.as_view(), name='get_delete_update_productFeed'),
    path('upload/', views.UploadFileView.as_view(), name='upload-file')
]


