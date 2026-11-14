document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const filters = document.querySelectorAll(".filter-button");
    const cards = document.querySelectorAll(".menu-card");

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            filters.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            cards.forEach((card) => {
                const visible = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("is-hidden", !visible);
            });
        });
    });

    const toast = document.querySelector(".toast");
    let toastTimeout;

    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.dataset.product;
            const price = Number(button.dataset.price);
            let cart = [];

            try {
                cart = JSON.parse(localStorage.getItem("maxway-cart") || "[]");
                if (!Array.isArray(cart)) cart = [];
            } catch {
                cart = [];
            }

            const existing = cart.find((item) => item.product === product);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ product, price, quantity: 1 });
            }

            localStorage.setItem("maxway-cart", JSON.stringify(cart));

            if (toast) {
                toast.textContent = product + " savatga qo'shildi";
                toast.classList.add("show");
                window.clearTimeout(toastTimeout);
                toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2200);
            }
        });
    });
});