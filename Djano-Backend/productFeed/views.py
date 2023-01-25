from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from .models import ProductFeed
from .permissions import IsOwnerOrReadOnly
from .serializers import ProductFeedSerializer,FileUploadSerializer
from .pagination import CustomPagination
from .filters import ProductFeedFilter
from rest_framework.decorators import authentication_classes, permission_classes
from django.shortcuts import render
from rest_framework import generics
import io, csv, pandas as pd
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class ListCreateProductFeedAPIView(ListCreateAPIView):
    serializer_class = ProductFeedSerializer
    queryset = ProductFeed.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFeedFilter

    def perform_create(self, serializer):
        
        serializer.save()

@authentication_classes([])
@permission_classes([])
class RetrieveUpdateDestroyProductFeedAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductFeedSerializer
    queryset = ProductFeed.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]



# remember to import the File model
# remember to import the FileUploadSerializer and SaveFileSerializer
@authentication_classes([])
@permission_classes([])
class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file)
        new_ProductFeeds = []
        for _, row in reader.iterrows():
            new_ProductFeed = ProductFeed(
                       storeId = row['StoreId'],
                       productSKU= row["SKU"],
                       productSaleDate= row['Date'],
                       productPrice= row["Price"],
                       productName= row["Product Name"]
                       )
            new_ProductFeeds.append(new_ProductFeed)
            if len(new_ProductFeeds) > 5:
                ProductFeed.objects.bulk_create(new_ProductFeeds)
                new_ProductFeeds = []
        if new_ProductFeeds:
            ProductFeed.objects.bulk_create(new_ProductFeeds)

        return Response({"status": "success"})


#=====================================

