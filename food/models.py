from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/')
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)

class Order(models.Model):
    order_id = models.CharField(max_length=200, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
