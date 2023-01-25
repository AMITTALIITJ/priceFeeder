from rest_framework import serializers
from .models import ProductFeed
from django.contrib.auth.models import User


class ProductFeedSerializer(serializers.ModelSerializer):  # create class to serializer model
   

    class Meta:
        model = ProductFeed
        fields = ('id', 'productSKU', 'productName', 'productSaleDate', 'productPrice','storeId')

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class SaveFileSerializer(serializers.Serializer):
    
    class Meta:
        model = ProductFeed
        fields = "__all__"