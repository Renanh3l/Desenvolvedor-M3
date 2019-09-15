var currentIndex = 6;
var products = [];
const api_url = "http://localhost:3000"

// Atualiza a página com os primeiros 6 produtos
async function loadInitialProducts() {
    try {
        const response = await fetch(`${api_url}/products?_start=0&_limit=6`, {
            method: "GET"
        });
        
        products = await response.json();
        renderInitialProducts();
    } catch(e) {
        currentIndex = 0;
    }
}

// Atualiza a interface com os primeiros 6 produtos carregados
function renderInitialProducts() {
    var div = document.createElement('div');
    div.setAttribute('class', 'mobile-products-container');

    for (var i=0; i < products.length; i++) {
            let price = products[i].price.toFixed(2).replace('.', ',');

            div.innerHTML += `
            <div class="mobile-product">
                <div class="mob-product">
                    <img src="${products[i].img}">
                    <div class="mob-product-details">
                        <span class="mob-product-title">
                            ${products[i].name}
                        </span>
                        <span class="mob-product-price">
                            R$ ${price}
                        </span>
                        <span class="mob-product-price2">
                            ${products[i].miniDesc}
                        </span>
                        <button class="mob-buy-product" name="${products[i].id}" onclick="addToCart(${products[i].id}, 1)">COMPRAR</button>
                    </div>
                </div>
            </div>
            `
    }

    // Insere a nossas novas divs ACIMA do botão de carregar mais
    document.getElementById('products-container').insertBefore(div, document.getElementById('products-container').firstChild);
}


// Retorna mais 6 produtos do JSON
async function loadMoreProducts() {
    try {

        const response = await fetch(`http://localhost:3000/products?_start=${currentIndex}&_limit=6`, {
            method: "GET"
        });
        
        var produtosRetornados = await response.json();

        if (produtosRetornados.length > 0) {
            products = [...products, ...produtosRetornados];
            currentIndex = products.length;
            renderProducts();
        } else {
            // Não há mais produtos a serem carregados
        };

    } catch (e) {
        console.log(e);
    }
}

// Atualiza a interface com produtos do JSON
function renderProducts() {
    var div = document.createElement('div');
    div.setAttribute('class', 'mobile-products-container');

    if (products.length === 0) {
        div.innerHTML = "<h1>Nenhum produto foi encontrado.</h1>";
    } else {
        for (let i=currentIndex-6; i < products.length; i++) {
                let price = products[i].price.toFixed(2).replace('.', ',');

                div.innerHTML += `
                <div class="mobile-product">
                    <div class="mob-product">
                        <img src="${products[i].img}">
                        <div class="mob-product-details">
                            <span class="mob-product-title">
                                ${products[i].name}
                            </span>
                            <span class="mob-product-price">
                                R$ ${price}
                            </span>
                            <span class="mob-product-price2">
                                ${products[i].miniDesc}
                            </span>
                            <button class="mob-buy-product" name="${i}" onclick="addToCart(${products[i].id}, 1)">COMPRAR</button>
                        </div>
                    </div>
                </div>

                `
        }
    }

    // Insere nossas novas divs ACIMA do botão de carregar mais
    document.getElementById('products-container').insertBefore(div, document.getElementById('products-container').lastElementChild);

}

// Função do botão carregar mais produtos
function carregarMais() {
    if (products.length !== 0 && checkFilters() === false) loadMoreProducts();
}

// Carrega os primeiros produtos na página
loadInitialProducts();