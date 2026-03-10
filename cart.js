// تحميل السلة من LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay(){
    const cartItems = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    cartItems.innerHTML = '';

    if(cart.length === 0){
        cartItems.innerHTML = '<p>السلة فارغة.</p>';
        totalItems.textContent = 0;
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="80">
            <span>${item.name}</span>
            <button onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItems.appendChild(div);
    });

    totalItems.textContent = cart.length;
}

// إزالة منتج من السلة
function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert('تم حذف المنتج من السلة.');
}

// شراء عبر WhatsApp
document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0){
        alert('السلة فارغة!');
        return;
    }
    let message = 'طلبية من متجر Mohamed Essam:\n';
    cart.forEach((item, idx) => {
        message += `${idx+1}. ${item.name}\n`;
    });
    message += 'الرجاء التواصل لتأكيد الطلب.';
    const whatsappURL = `https://wa.me/201016254602?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
});

// تهيئة السلة عند فتح الصفحة
updateCartDisplay();
