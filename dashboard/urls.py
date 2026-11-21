from django.urls import path
from dashboard import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login/', views.login_dashboard, name='login'),
    path('logout/', views.logout_dashboard, name='logout'),
    path('customers/', views.dashboard_customer, name='dashboard_customer'),
    path('orders/', views.dashboard_order, name='dashboard_order'),
    path('products/', views.dashboard_product, name='dashboard_product'),
    path('categories/', views.dashboard_category, name='dashboard_category'),
]