// ==============================
// بيانات المنتجات
// ==============================
const products = [
    {id: 1, name: "قميص كلاسيكي", desc: "قميص رجالي أنيق", img: "images/shirt1.jpg", category: "shirts"},
    {id: 2, name: "قميص كاجوال", desc: "قميص مريح يومي", img: "images/shirt2.jpg", category: "shirts"},
    {id: 3, name: "بنطلون جينز", desc: "بنطلون جينز عصري", img: "images/pants1.jpg", category: "pants"},
    {id: 4, name: "بنطلون رسمي", desc: "بنطلون رسمي للدوام", img: "images/pants2.jpg", category: "pants"},
    {id: 5, name: "جاكيت جلد", desc: "جاكيت جلد فخم", img: "images/jacket1.jpg", category: "jackets"},
    {id: 6, name: "جاكيت شتوي", desc: "جاكيت شتوي دافئ", img: "images/jacket2.jpg", category: "jackets"},
    {id: 7, name: "حذاء رياضي", desc: "حذاء مريح للرياضة", img: "images/shoes1.jpg", category: "shoes"},
    {id: 8, name: "حذاء رسمي", desc: "حذاء رسمي أنيق", img: "images/shoes2.jpg", category: "shoes"}
];

// ==============================
// إدارة السلة (LocalStorage)
// ==============================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');

function updateCartCount(){
    if(cartCount) cartCount.textContent = cart.length;
}
updateCartCount();

function addToCart(id){
    const product = products.find(p => p.id === id);
    if(product){
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} تم إضافته إلى السلة`);
    }
}

// ==============================
// إزالة من السلة
// ==============================
function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// ==============================
// عرض السلة
// ==============================
const cartItemsContainer = document.getElementById('cart-items');
function renderCart(){
    if(!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    if(cart.length === 0){
        cartItemsContainer.innerHTML = '<p>السلة فارغة</p>';
        updateCartCount();
        return;
    }

    cart.forEach((item,index)=>{
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
            <button onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    updateCartCount();
}
renderCart();

// ==============================
// Checkout - فاتورة WhatsApp
// ==============================
const checkoutBtn = document.getElementById('checkout-btn');
if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=>{
        if(cart.length === 0){
            alert('السلة فارغة!');
            return;
        }

        // إنشاء نص الفاتورة
        let invoice = "فاتورة مشتريات Mohamed Essam:%0A";
        cart.forEach((item,index)=>{
            invoice += `${index+1}. ${item.name} - ${item.desc}%0A`;
        });

        // رقم WhatsApp
        const phone = "01062835140";
        const waURL = `https://api.whatsapp.com/send?phone=${phone}&text=${invoice}`;
        window.open(waURL,"_blank");

        // مسح السلة
        cart = [];
        localStorage.setItem('cart',JSON.stringify(cart));
        renderCart();
    });
}
