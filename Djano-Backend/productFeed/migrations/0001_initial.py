# Generated by Django 3.1.8 on 2023-01-22 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductFeed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productSKU', models.CharField(max_length=100)),
                ('productName', models.CharField(max_length=2200)),
                ('productSaleDate', models.DateField()),
                ('productPrice', models.IntegerField()),
                ('storeId', models.CharField(max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
