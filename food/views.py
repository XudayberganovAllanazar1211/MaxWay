from django.shortcuts import render, redirect
from .models import Product, Customer, Order, OrderProduct
import uuid


def home(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'home.html', context)


def menu(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'menu.html', context)


def add_to_cart(request, product_id):
    cart = request.session.get('cart', {})
    product_id = str(product_id)

    if product_id in cart:
        cart[product_id] += 1
    else:
        cart[product_id] = 1

    request.session['cart'] = cart
    return redirect('menu')


def remove_from_cart(request, product_id):
    cart = request.session.get('cart', {})
    product_id = str(product_id)

    if product_id in cart:
        cart[product_id] -= 1

        if cart[product_id] <= 0:
            del cart[product_id]

    request.session['cart'] = cart
    return redirect('cart')


def cart(request):
    carts = request.session.get('cart', {})
    context = {'carts': carts}
    return render(request, 'cart.html', context)


def checkout(request):
    cart = request.session.get('cart', {})

    if request.method == 'POST':
        customer = Customer.objects.create(
            first_name=request.POST.get('first_name'),
            last_name=request.POST.get('last_name'),
            phone_number=request.POST.get('phone_number'),
            email='',
            address=''
        )

        products = Product.objects.filter(id__in=cart.keys())

        total_price = 0

        for product in products:
            total_price += product.price * cart[str(product.id)]

        order = Order.objects.create(
            order_id=str(uuid.uuid4()),
            customer=customer,
            payment_method=request.POST.get('payment_method'),
            status='Pending',
            total_price=total_price
        )

        for product in products:
            OrderProduct.objects.create(
                order=order,
                product=product,
                quantity=cart[str(product.id)],
                price=product.price
            )

        request.session['cart'] = {}
        return redirect('/?order=success')

    return render(request, 'checkout.html')