// Busca os produtos com os devidos filtros
async function getFilteredProducts(colorFilters, sizeFilters, priceFilters) {
    try {

        // Caso nenhum filtro esteja selecionado paramos por aqui
        if (colorFilters.length == 0 && sizeFilters.length == 0 && priceFilters.length == 0) {
            clearFilters();
            toggleMobileFilterModal();
            return;
        }

        let fetchString = api_url;
        fetchString += "/products?"

        // Filtrar por cores
        for (let i=0; i < colorFilters.length; i++) {
            fetchString += `colors_like=${colorFilters[i]}&`
        }

        // Filtrar por tamanhos
        for (let i=0; i < sizeFilters.length; i++) {
            fetchString += `sizes_like=${sizeFilters[i]}&`
        }

        const response = await fetch(fetchString, {
            method: "GET"
        });
        
        products = await response.json();

        // Filtrar por preços
        if (priceFilters.length > 0) {
            products = products.filter((product) => {
                for (let x=0; x < priceFilters.length - 1; x+=2) {
                    if (product.price >= priceFilters[x] && product.price <= priceFilters[x+1]) {
                        return true;
                    }
                }
            })
        }

        currentIndex = 6;

        clearProductRendering(); // Limpa os produtos que estavam renderizados
        renderProducts(); // Renderiza os produtos filtrados
        toggleMobileFilterModal(); // Fecha o modal que estava aberto
    } catch(e) {
        console.log("Erro ao filtrar produtos: " + e);
    }
}

// Função do botão aplicar filtros
function applyFilters() {
    let colorFilters = [];
    let sizeFilters = [];
    let priceFilters = [];

    var inputs = document.getElementsByClassName("color-input");

    // Varremos os checkboxs marcados (Filtro de Cores)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            colorFilters.push(inputs[i].name);
        }
    }

    inputs = document.getElementsByClassName("size-input");

    // Varremos os checkboxs marcados (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            sizeFilters.push(inputs[i].name);
        }
    }

    inputs = document.getElementsByClassName("price-input");

    // Varremos os checkboxs marcados (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            switch (inputs[i].name) {
                case "pricefilter1": 
                    priceFilters.push(0.00, 50.00);
                    break;

                case "pricefilter2": 
                    priceFilters.push(51.00, 150.00)
                    break;

                case "pricefilter3":
                    priceFilters.push(151.00, 300.00)
                    break;

                case "pricefilter4":
                    priceFilters.push(301.00, 500.00)
                    break;

                case "pricefilter5":
                    priceFilters.push(500.00, 999.00)
                    break;
                
                default:
                    priceFilters = [];
            }
        }
    }

    getFilteredProducts(colorFilters, sizeFilters, priceFilters);
}

function clearFilters() {

    // Limpa os checkboxs
    document.getElementById('color-filter-form').reset();
    document.getElementById('mob-color-filter-form').reset();
    document.getElementById('size-filter-form').reset();
    document.getElementById('mob-size-filter-form').reset();
    document.getElementById('price-filter-form').reset();
    document.getElementById('mob-price-filter-form').reset();

    // Voltamos a renderizar os primeiros 6 produtos da api
    clearProductRendering();
    currentIndex = 6;
    loadInitialProducts();
}

// Limpa a renderização de produtos
function clearProductRendering() {
    document.getElementById("products-container").innerHTML = `
    <div class="load-products">
        <button class="load-products-btn" onclick="carregarMais()">CARREGAR MAIS</button>
    </div>
    `
}

// Checa se tem algum filtro selecionado
function checkFilters() {
    var inputs = document.getElementsByClassName("color-input");

    // Varremos os checkboxs (Filtro de Cores)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return true;
        }
    }

    inputs = document.getElementsByClassName("size-input");

    // Varremos os checkboxs (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return true;
        }
    }

    inputs = document.getElementsByClassName("price-input");

    // Varremos os checkboxs marcados (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return true;
        }
    }

    return false;
}

// Programa os botões para automaticamente ativar os filtros
function setupFilterButtons() {
    var inputs = document.getElementsByClassName("color-input");

    // Varremos os checkboxs (Filtro de Cores)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("mobile") !== "1") inputs[i].addEventListener('change', applyFilters);
    }

    inputs = document.getElementsByClassName("size-input");

    // Varremos os checkboxs (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("mobile") !== "1") inputs[i].addEventListener('change', applyFilters);
    }

    inputs = document.getElementsByClassName("price-input");

    // Varremos os checkboxs marcados (Filtro de Tamanhos)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("mobile") !== "1") inputs[i].addEventListener('change', applyFilters);
    }
}

setupFilterButtons();