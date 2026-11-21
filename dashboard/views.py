from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from food.models import Category, Product, Customer, Order

# Create your views here.
def login_dashboard(request):
    if request.method == 'POST':
        password=request.POST['password']
        username=request.POST['username']
        user=authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        return render(request, 'login.html')
    else:
        return render(request, 'login.html')
def logout_dashboard(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def dashboard(request):
    context = {
        'categories': Category.objects.count(),
        'products': Product.objects.count(),
        'orders': Order.objects.count(),
        'customers': Customer.objects.count(),
    }
    return render(request, 'dashboard.html', context)

@login_required(login_url='login')
def dashboard_category(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        context = {
            'categories': categories,
        }
        return render(request, 'categories.html', context)
    elif request.method == 'POST':
        if request.POST['crud_action']=="create":
            name=request.POST.get('name')
            slug=request.POST.get('slug')
            Category.objects.create(name=name, slug=slug)
            return redirect('dashboard_category')
        elif request.POST['crud_action']=="update":
            name=request.POST.get('name')
            slug=request.POST.get('slug')
            category_id=request.POST.get('category_id')
            Category.objects.filter(id=category_id).update(name=name, slug=slug)
            return redirect('dashboard_category')
        elif request.POST['crud_action']=="delete":
            category_id=request.POST.get('category_id')
            Category.objects.filter(id=category_id).delete()
            return redirect('dashboard_category')

@login_required(login_url='login')
def dashboard_product(request):
    if request.method == 'GET':
        products = Product.objects.all()
        context = {
            'products': products,
            'categories': Category.objects.all(),
        }
        return render(request, 'products.html', context)
    else:
        if request.POST['crud_action']=="create":
            name=request.POST.get('name')
            price=request.POST.get('price')
            category_id=request.POST.get('category')
            image=request.FILES.get('image')
            description=request.POST.get('description')
            Product.objects.create(name=name, price=price, category=Category.objects.get(id=category_id), image=image, description=description)
            return redirect('dashboard_product')
        elif request.POST['crud_action']=="update":
            name=request.POST.get('name')
            price=request.POST.get('price')
            category_id=request.POST.get('category')
            image=request.FILES.get('image')
            description=request.POST.get('description')
            product_id=request.POST.get('product_id')
            product=Product.objects.get(id=product_id)
            product.name=name
            product.price=price
            product.category=Category.objects.get(id=category_id)
            if image:
                product.image=image
            product.description=description
            product.save()
            return redirect('dashboard_product')
        elif request.POST['crud_action']=="delete":
            product_id=request.POST.get('product_id')
            Product.objects.filter(id=product_id).delete()
            return redirect('dashboard_product')

@login_required(login_url='login')
def dashboard_order(request):
    if request.method == 'GET':
        orders = Order.objects.all().order_by('-created_at')
        context = {
            'orders': orders,
        }
        return render(request, 'orders.html', context)
    else:
        if request.POST['crud_action']=="update":
            order_id=request.POST.get('order_id')
            status=request.POST.get('status')
            Order.objects.filter(id=order_id).update(status=status)
            return redirect('dashboard_order')
        elif request.POST['crud_action']=="delete":
            order_id=request.POST.get('order_id')
            Order.objects.filter(id=order_id).delete()
            return redirect('dashboard_order')

@login_required(login_url='login')
def dashboard_customer(request):
    if request.method == 'GET':
        customers = Customer.objects.all().order_by('-id')
        context = {
            'customers': customers,
        }
        return render(request, 'customers.html', context)
    else:
        if request.POST['crud_action']=="create":
            first_name=request.POST.get('first_name')
            last_name=request.POST.get('last_name')
            phone_number=request.POST.get('phone_number')
            email=request.POST.get('email')
            address=request.POST.get('address')
            Customer.objects.create(first_name=first_name, last_name=last_name, phone_number=phone_number, email=email, address=address)
            return redirect('dashboard_customer')
        elif request.POST['crud_action']=="update":
            first_name=request.POST.get('first_name')
            last_name=request.POST.get('last_name')
            phone_number=request.POST.get('phone_number')
            email=request.POST.get('email')
            address=request.POST.get('address')
            customer_id=request.POST.get('customer_id')
            Customer.objects.filter(id=customer_id).update(first_name=first_name, last_name=last_name, phone_number=phone_number, email=email, address=address)
            return redirect('dashboard_customer')
        elif request.POST['crud_action']=="delete":
            customer_id=request.POST.get('customer_id')
            Customer.objects.filter(id=customer_id).delete()
            return redirect('dashboard_customer')
