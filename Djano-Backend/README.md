[Django REST framework](http://www.django-rest-framework.org/) is a powerful and flexible toolkit for building Web APIs.

## Requirements
- Python 3.6
- Django 3.1
- Django REST Framework

## Installation
After you cloned the repository, you want to create a virtual environment, so you have a clean python installation.
You can do this by running the command
```
python -m venv env
```

After this, it is necessary to activate the virtual environment, you can get more information about this [here](https://docs.python.org/3/tutorial/venv.html)

You can install all the required dependencies by running
```
pip install -r requirements.txt
```

## Structure
In a RESTful API, endpoints (URLs) define the structure of the API and how end users access data from our application using the HTTP methods - GET, POST, PUT, DELETE. Endpoints should be logically organized around _collections_ and _elements_, both of which are resources.

In our case, we have one single resource, `productFeed`, so we will use the following URLS - `/productFeed/` and `/productFeed/<id>` for collections and elements, respectively:

Endpoint |HTTP Method | CRUD Method | Result
-- | -- |-- |--
`productFeed` | GET | READ | Get all productFeed
`productFeed/:id` | GET | READ | Get a single productFeed
`productFeed`| POST | CREATE | Create a new productFeed
`productFeed/:id` | PUT | UPDATE | Update a productFeed
`productFeed/:id` | DELETE | DELETE | Delete a productFeed


```

First, we have to start up Django's development server.
```
python manage.py runserver
```
We have bypassed all the authentication for the various API'S
```
Get all productFeed
http http://127.0.0.1:8000/api/v1/productFeed/ 
Get a single productFeed
http GET http://127.0.0.1:8000/api/v1/productFeed/{productFeed_id}/ 

Create a new productFeed
http POST http://127.0.0.1:8000/api/v1/productFeed/ 
{
    
    "productSKU": "2345667",
    "productName": "Abcdef",
    "productSaleDate": "2223-10-15",
    "productPrice": 23,
    "storeId": "12345"
}

Full update a productFeed | Used in Edit functionality
http PUT http://127.0.0.1:8000/api/v1/productFeed/{productFeed_id}/ 
{
    
    "productSKU": "2345667",
    "productName": "Abcdef",
    "productSaleDate": "2223-10-15",
    "productPrice": 23,
    "storeId": "12345"
}




### Pagination
The API supports pagination, by default responses have a page_size=10 but if you want change that you can pass through params page_size={your_page_size_number}
```
http http://127.0.0.1:8000/api/v1/productFeed/?page=1 
http http://127.0.0.1:8000/api/v1/productFeed/?page=3 
http http://127.0.0.1:8000/api/v1/productFeed/?page=3&page_size=15 

### Filters

Get 
http://127.0.0.1:8000/api/v1/productFeed/?page=1&page_size=15&productName=&productSKU=&productPrice__gt=20&productPrice__lt=30&storeId=12345

Api supports filtering records by 
1.) Product Name
2.) Product SKU
3.) Product Price (Lower Limit and Upper Limit)
4.) Store Id


Upload Functionality

http://127.0.0.1:8000/api/v1/productFeed/upload/
Send csv file as input.
{file: input CSV File}
