// ===========================
// Cart / LocalStorage
// ===========================
let cart = [];

// تحميل السلة من LocalStorage عند فتح الصفحة
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
}

// تحديث عداد السلة
function updateCartCount(){
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// إضافة منتج إلى السلة
function addToCart(product){
    // product يجب أن يكون كائن: {id, name, price, image}
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} تمت إضافته إلى السلة!`);
}

// ===========================
// مثال على ربط أزرار المنتجات
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // مثال على المنتج
            const productCard = btn.parentElement;
            const product = {
                id: index + 1,
                name: productCard.querySelector('h3').textContent,
                price: 0, // يمكن إضافة سعر لكل منتج
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        });
    });
});
