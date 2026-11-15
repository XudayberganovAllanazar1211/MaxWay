from django.contrib import admin
from food import models

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'order_id', 'created_at', 'payment_method', 'status', 'total_price']
    search_fields = ('customer__first_name', 'order_id', 'payment_method', 'status')
    list_filter = ('status',)
    ordering = ('status', 'order_id', '-created_at', 'payment_method',)

@admin.register(models.OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price',)
    search_fields = ('order__order_id', 'product__name',)
    list_filter = ('product', 'order',)
    ordering = ('order', 'product', 'quantity', 'price',)

@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email',)
    search_fields = ('first_name', 'last_name', 'email',)
    ordering = ('first_name', 'last_name', 'email',)

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price',)
    search_fields = ('name', 'category__name',)
    ordering = ('name',)

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug',)
    search_fields = ('name', 'slug',)
    ordering = ('name', 'slug',)
    prepopulated_fields = {'slug': ('name',)}