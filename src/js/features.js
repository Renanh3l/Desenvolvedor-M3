
// Abrir ou fechar a janela de Filtro (versão mobile)
function toggleMobileFilterModal() {
    let div = document.getElementById("mobile-filter-modal");

    div.style.display == "block" ? div.style.display = "none" : div.style.display = "block";
}

// Abrir ou fechar a janela de Ordenar (versão mobile)
function toggleMobileOrderModal() {
    let div = document.getElementById("mobile-order-modal");

    div.style.display == "block" ? div.style.display = "none" : div.style.display = "block";
}

// Abrir ou fechar a filtro de Cores (versão mobile)
function openColorFilter() {
    let div = document.getElementById("mobile-color-filter");
    let openIcon = document.getElementById("fa-color-open");
    let closeIcon = document.getElementById('fa-color-close');

    if (div.style.display == "flex") {
        // Se estiver aberto
        div.style.display = "none"; // Fechar
        openIcon.style.display = "block";
        closeIcon.style.display = "none";
    } else {
        // Se estiver fechado
        div.style.display = "flex"; // Abrir
        closeIcon.style.display = "block";
        openIcon.style.display = "none";
    }
}

// Abrir ou fechar a filtro de Tamanhos (versão mobile)
function openSizeFilter() {
    let div = document.getElementById("mobile-size-filter");
    let openIcon = document.getElementById("fa-size-open");
    let closeIcon = document.getElementById('fa-size-close');

    if (div.style.display == "flex") {
        // Se estiver aberto
        div.style.display = "none"; // Fechar
        openIcon.style.display = "block";
        closeIcon.style.display = "none";
    } else {
        // Se estiver fechado
        div.style.display = "flex"; // Abrir
        closeIcon.style.display = "block";
        openIcon.style.display = "none";
    }
}

// Abrir ou fechar a filtro de Preços (versão mobile)
function openPriceFilter() {
    let div = document.getElementById("mobile-price-filter");
    let openIcon = document.getElementById("fa-price-open");
    let closeIcon = document.getElementById('fa-price-close');

    if (div.style.display == "flex") {
        // Se estiver aberto
        div.style.display = "none"; // Fechar
        openIcon.style.display = "block";
        closeIcon.style.display = "none";
    } else {
        // Se estiver fechado
        div.style.display = "flex"; // Abrir
        closeIcon.style.display = "block";
        openIcon.style.display = "none";
    }
}

function loadMoreColors() {
    let element = document.getElementById("load-more-colors");
    let div = document.getElementById("more-color-filters");

    if (div.style.display == "block") {
        div.style.display = "none";
        element.innerHTML = 'Ver todas as cores <i class="fas fa-chevron-down"></i>'
    } else {
        div.style.display = "block";
        element.innerHTML = 'Ver menos cores <i class="fas fa-chevron-up"></i>'
    }

}