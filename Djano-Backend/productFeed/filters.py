from django_filters import rest_framework as filters
from .models import ProductFeed


# We create filters for each field we want to be able to filter on
class ProductFeedFilter(filters.FilterSet):
    productSKU = filters.CharFilter(lookup_expr='icontains')
    productName = filters.CharFilter(lookup_expr='icontains')
    storeId = filters.CharFilter(lookup_expr='icontains')
    productPrice__gt = filters.NumberFilter(field_name='productPrice', lookup_expr='gt')
    productPrice__lt = filters.NumberFilter(field_name='productPrice', lookup_expr='lt')
    productSaleDate__gt = filters.NumberFilter(field_name='productSaleDate', lookup_expr='gt')
    productSaleDate__lt = filters.NumberFilter(field_name='productSaleDate', lookup_expr='lt')
    class Meta:
        model = ProductFeed
        fields = ['productSKU', 'productName', 'storeId', 'productPrice__gt', 'productPrice__lt']
