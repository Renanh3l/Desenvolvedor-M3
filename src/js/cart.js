const MAX_CART_ITEMS = 20;
var cartItems = [];

// Carregar items do localStorage
function loadCartItems() {
    for (let i = 0; i < MAX_CART_ITEMS; i++) {

        let item = localStorage.getItem(`m3product-${i}`);

        if (item != null) {
            cartItems.push(item)
        }
    }

    updateBag();
}

// Adicionar ao carrinho
function addToCart(product, quant) {

    for (let i=0; i < MAX_CART_ITEMS; i++) {
        if (localStorage.getItem(`m3product-${i}`) == null) {
            localStorage.setItem(`m3product-${i}`, product);
            localStorage.setItem(`m3productquant-${i}`, quant)
            cartItems = [...cartItems, product];
            alert('Produto adicionado ao carrinho!');
            updateBag();
            break;
        }
    }

}

// Atualiza a quantidade de items no carrinho na página
function updateBag() {
    let element = document.getElementById('cart-quant');

    element.innerHTML = cartItems.length.toString();
}

// Carrega os items que já estão no carrinho
loadCartItems();