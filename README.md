# MaxWay — Ovqat buyurtma qilish veb-sayti

**MaxWay** — Django yordamida ishlab chiqilgan ovqat buyurtma qilish veb-sayti. Foydalanuvchilar turli xil taomlarni ko‘rishlari, kategoriyalar bo‘yicha mahsulotlarni tanlashlari, savatga qo‘shishlari va buyurtma berishlari mumkin.

Loyihada mahsulotlar, kategoriyalar, mijozlar va buyurtmalarni boshqarish uchun alohida administrator paneli ham mavjud.

## Asosiy imkoniyatlar

### Foydalanuvchilar uchun

- Barcha mavjud mahsulotlarni ko‘rish.
- Mahsulotlarni kategoriyalar bo‘yicha saralash.
- Mahsulotlar haqida ma'lumot va narxlarni ko‘rish.
- Mahsulotlarni savatga qo‘shish.
- Buyurtma berish.
- To‘lov usulini tanlash.

### Administrator paneli

- Umumiy statistika va ma'lumotlarni ko‘rish.
- Mahsulotlarni qo‘shish, ko‘rish, tahrirlash va o‘chirish (CRUD).
- Kategoriyalarni boshqarish (CRUD).
- Mijozlarni boshqarish (CRUD).
- Buyurtmalarni ko‘rish va boshqarish.
- Buyurtma holatini o‘zgartirish.

## Ishlatilgan texnologiyalar

| Texnologiya | Vazifasi                |
| ----------- | ----------------------- |
| Python      | Asosiy dasturlash tili  |
| Django      | Backend framework       |
| HTML5       | Veb-sahifa tuzilishi    |
| CSS3        | Veb-sahifa dizayni      |
| JavaScript  | Interaktiv imkoniyatlar |
| SQLite      | Ma'lumotlar bazasi      |

## Loyiha tuzilishi

```text
MaxWay/
│
├── dashboard/
│   ├── templates/
│   ├── static/
│   ├── views.py
│   └── urls.py
│
├── food/
│   ├── migrations/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── templates/
│   ├── base.html
│   ├── menu.html
│   └── ...
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── MaxWay/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── manage.py
└── db.sqlite3
```

## Loyihani ishga tushirish

### 1. Repozitoriyani yuklab olish

```bash
git clone https://github.com/XudayberganovAllanazar1211/MaxWay.git
```

### 2. Loyiha papkasiga kirish

```bash
cd MaxWay
```

### 3. Virtual muhit yaratish

```bash
python -m venv venv
```

### 4. Virtual muhitni faollashtirish

Windows uchun:

```bash
venv\Scripts\activate
```

### 5. Kerakli kutubxonalarni o‘rnatish

```bash
pip install django pillow
```

### 6. Ma'lumotlar bazasini tayyorlash

```bash
python manage.py migrate
```

### 7. Administrator hisobini yaratish

```bash
python manage.py createsuperuser
```

### 8. Loyihani ishga tushirish

```bash
python manage.py runserver
```

Brauzerda quyidagi manzilni oching:

**Asosiy sahifa:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

**Django Admin:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

## Ma'lumotlar bazasi modellari

Loyihada quyidagi modellar ishlatiladi:

- **Category** — mahsulot kategoriyalarini saqlaydi.
- **Product** — mahsulot nomi, tavsifi, narxi, rasmi va kategoriyasini saqlaydi.
- **Customer** — mijozlar haqidagi ma'lumotlarni saqlaydi.
- **Order** — buyurtmalar va to‘lov ma'lumotlarini saqlaydi.
- **OrderProduct** — buyurtmalar tarkibidagi mahsulotlar, ularning soni va narxini saqlaydi.

## Loyihaning maqsadi

Ushbu kurs loyihasi sifatida ishlab chiqilmoqda. Uning asosiy maqsadi Django framework, ma'lumotlar bazasi bilan ishlash, CRUD amallari, frontend yaratish va onlayn buyurtma tizimini ishlab chiqish bo‘yicha amaliy tajriba orttirishdir.

---

**MaxWay — Sevimli taomingiz, o‘z tanlovingiz!**
