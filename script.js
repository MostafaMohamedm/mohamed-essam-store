// بيانات المنتجات
const products = [
    {id: 1, name: "قميص أبيض", category: "shirts", img: "images/shirt1.jpg", desc: "قميص رسمي للرجال، خامة ممتازة."},
    {id: 2, name: "قميص كحلي", category: "shirts", img: "images/shirt2.jpg", desc: "قميص كاجوال مناسب للعمل والخروجات."},
    {id: 3, name: "بنطال أسود", category: "pants", img: "images/pants1.jpg", desc: "بنطال كلاسيكي، خامة مريحة."},
    {id: 4, name: "بنطال جينز", category: "pants", img: "images/pants2.jpg", desc: "جينز عصري يناسب كل الأوقات."},
    {id: 5, name: "جاكيت أسود", category: "jackets", img: "images/jacket1.jpg", desc: "جاكيت أنيق للخروجات الرسمية والكاجوال."},
    {id: 6, name: "حذاء أسود", category: "shoes", img: "images/shoes1.jpg", desc: "حذاء رسمي مريح ومتين."},
];

// LocalStorage للسلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
if(cartCount) cartCount.textContent = cart.length;

// عرض المنتجات حسب الفئة
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const categoryTitle = document.getElementById('category-title');
const container = document.getElementById('products-container');

if(categoryTitle) categoryTitle.textContent = category ? category.charAt(0).toUpperCase() + category.slice(1) : "جميع المنتجات";

if(container){
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <button onclick="addToCart(${product.id})">أضف إلى السلة</button>
        `;
        container.appendChild(div);
    });
}

// إضافة للسلة
function addToCart(id){
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    if(cartCount) cartCount.textContent = cart.length;
    alert('تمت إضافة المنتج إلى السلة');
}

// عرض السلة
const cartContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
if(cartContainer){
    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <button onclick="removeFromCart(${item.id})">إزالة</button>
        `;
        cartContainer.appendChild(div);
    });
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

const checkoutBtn = document.getElementById('checkout-btn');
if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=> alert('تمت عملية الدفع بنجاح'));
}
