let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function addToCart(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(name + " تم إضافته إلى السلة!");
}

function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("تم حذف المنتج من السلة");
}

function updateCartCount(){
    document.getElementById('cart-count').innerText = cart.length;
}

function checkout(){
    if(cart.length === 0){
        alert("السلة فارغة!");
        return;
    }

    let message = "أريد طلب هذه المنتجات:\n";
    let total = 0;
    cart.forEach(item => {
        message += "- " + item.name + " : " + item.price + " جنيه\n";
        total += item.price;
    });
    message += "المجموع: " + total + " جنيه";

    let whatsappUrl = "https://wa.me/201016254602?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
}
