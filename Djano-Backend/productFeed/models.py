
from django.db import models


class ProductFeed(models.Model):
    productSKU = models.CharField(max_length=100)
    productName = models.CharField(max_length=2200)
    productSaleDate = models.DateField()
    productPrice = models.IntegerField()
    storeId = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        ordering = ['-id']
