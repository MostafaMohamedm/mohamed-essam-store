// ==============================
// بيانات المنتجات مع السعر
// ==============================
const products = [
    {id: 1, name: "قميص كلاسيكي", desc: "قميص رجالي أنيق", price: 250, img: "images/shirt1.jpg", category: "shirts"},
    {id: 2, name: "قميص كاجوال", desc: "قميص مريح يومي", price: 200, img: "images/shirt2.jpg", category: "shirts"},
    {id: 3, name: "بنطلون جينز", desc: "بنطلون جينز عصري", price: 300, img: "images/pants1.jpg", category: "pants"},
    {id: 4, name: "بنطلون رسمي", desc: "بنطلون رسمي للدوام", price: 350, img: "images/pants2.jpg", category: "pants"},
    {id: 5, name: "جاكيت جلد", desc: "جاكيت جلد فخم", price: 600, img: "images/jacket1.jpg", category: "jackets"},
    {id: 6, name: "جاكيت شتوي", desc: "جاكيت شتوي دافئ", price: 550, img: "images/jacket2.jpg", category: "jackets"},
    {id: 7, name: "حذاء رياضي", desc: "حذاء مريح للرياضة", price: 400, img: "images/shoes1.jpg", category: "shoes"},
    {id: 8, name: "حذاء رسمي", desc: "حذاء رسمي أنيق", price: 450, img: "images/shoes2.jpg", category: "shoes"}
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
                <p>السعر: ${item.price} جنيه</p>
            </div>
            <button onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    updateCartCount();
}
renderCart();

// ==============================
// Checkout - فاتورة WhatsApp مع الأسعار
// ==============================
const checkoutBtn = document.getElementById('checkout-btn');
if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=>{
        if(cart.length === 0){
            alert('السلة فارغة!');
            return;
        }

        let invoice = "فاتورة مشتريات Mohamed Essam:%0A";
        let total = 0;

        cart.forEach((item,index)=>{
            invoice += `${index+1}. ${item.name} - ${item.desc} - السعر: ${item.price} جنيه%0A`;
            total += item.price;
        });

        invoice += `%0Aالمجموع الكلي: ${total} جنيه`;

        const phone = "01062835140"; // يمكنك تغييره للرقم الجديد
        const waURL = `https://api.whatsapp.com/send?phone=${phone}&text=${invoice}`;
        window.open(waURL,"_blank");

        // مسح السلة بعد الدفع
        cart = [];
        localStorage.setItem('cart',JSON.stringify(cart));
        renderCart();
    });
}
