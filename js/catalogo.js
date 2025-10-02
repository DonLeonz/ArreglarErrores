// js/catalogo.js
// Sistema de Catálogo (antes API)
class CatalogoSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupProductSearch();
        this.setupIndustryFilters();
    }

    setupProductSearch() {
        const form = document.getElementById('product-search-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = document.getElementById('product-search-input').value;
                const category = document.getElementById('category-filter').value;
                this.searchProducts(query, category);
            });
        }
    }

    setupIndustryFilters() {
        const buttons = document.querySelectorAll('.industry-filter');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const industry = e.target.dataset.industry;
                this.filterByIndustry(industry);
            });
        });
    }

    searchProducts(query, category) {
        const loadingDiv = document.getElementById('product-loading');
        const resultsDiv = document.getElementById('product-results');

        // Reset states
        resultsDiv.innerHTML = '';
        loadingDiv.style.display = 'block';

        // Simular búsqueda
        setTimeout(() => {
            loadingDiv.style.display = 'none';

            let filteredProducts = [...productItems];
            
            // Filtrar por query
            if (query) {
                filteredProducts = filteredProducts.filter(product => 
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
            }

            // Filtrar por categoría
            if (category) {
                filteredProducts = filteredProducts.filter(product => {
                    if (category === 'vidrio') return product.category.includes('Vidrio');
                    if (category === 'plastico') return product.category.includes('Plásticos');
                    if (category === 'tapas') return product.category.includes('Tapas');
                    if (category === 'cosmetico') return product.category.includes('Cosmét');
                    if (category === 'farmaceutico') return product.category.includes('Farmacéut');
                    if (category === 'industrial') return product.category.includes('Industrial');
                    return true;
                });
            }

            if (filteredProducts.length > 0) {
                this.renderProductResults(filteredProducts);
            } else {
                resultsDiv.innerHTML = '<p class="uk-text-center uk-text-muted">No se encontraron productos con esos criterios</p>';
            }
        }, 500);
    }

    filterByIndustry(industry) {
        const resultsDiv = document.getElementById('industry-results');
        
        let filteredProducts = [...productItems];
        
        if (industry !== 'todas') {
            const industryMap = {
                'alimentos': 'Alimentos',
                'bebidas': 'Bebidas',
                'cosmetica': 'Cosmética',
                'farmaceutica': 'Farmacéutica',
                'quimicos': 'Químicos',
                'limpieza': 'Limpieza',
                'industrial': 'Industrial'
            };
            
            filteredProducts = filteredProducts.filter(product => 
                product.industry && product.industry.includes(industryMap[industry])
            );
        }

        if (filteredProducts.length > 0) {
            resultsDiv.innerHTML = `
                <h3>Productos recomendados para tu industria:</h3>
                <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" uk-grid="true">
                    ${this.renderProductCards(filteredProducts)}
                </div>
            `;
        } else {
            resultsDiv.innerHTML = '<p class="uk-text-center uk-text-muted">No hay productos específicos para esta industria</p>';
        }
    }

    renderProductResults(products) {
        const resultsDiv = document.getElementById('product-results');
        
        resultsDiv.innerHTML = `
            <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match uk-margin-top" uk-grid="true">
                ${this.renderProductCards(products)}
            </div>
        `;
    }

    renderProductCards(products) {
        return products.map(product => `
            <div>
                <div class="uk-card uk-card-default uk-card-body uk-text-center">
                    <img src="${product.img}" alt="${product.title}"
                        style="height: 120px; object-fit: cover;" class="uk-margin-bottom">
                    <h3 class="uk-card-title uk-text-truncate">${product.title}</h3>
                    <p class="uk-text-meta">${product.category}</p>
                    <p class="uk-text-bold">${product.price}</p>
                    <p class="uk-text-small">${product.minimumOrder || 'Consultar'}</p>
                    <a href="https://wa.me/573001234567?text=Hola,%20me%20interesa:%20${encodeURIComponent(product.title)}" 
                       target="_blank" 
                       class="uk-button uk-button-primary uk-button-small">
                        <span uk-icon="whatsapp"></span> Cotizar
                    </a>
                </div>
            </div>
        `).join('');
    }

    calculateQuantity() {
        const dailyProduction = document.getElementById('daily-production').value;
        const inventoryDays = document.getElementById('inventory-days').value;
        const resultDiv = document.getElementById('calculator-result');

        if (!dailyProduction || !inventoryDays) {
            resultDiv.innerHTML = `
                <div class="uk-alert-warning" uk-alert>
                    <p>Por favor completa todos los campos</p>
                </div>
            `;
            return;
        }

        const totalNeeded = parseInt(dailyProduction) * parseInt(inventoryDays);
        const boxes24 = Math.ceil(totalNeeded / 24);
        const boxes48 = Math.ceil(totalNeeded / 48);
        const boxes100 = Math.ceil(totalNeeded / 100);

        resultDiv.innerHTML = `
            <div class="uk-alert-success" uk-alert>
                <h3>Resultado del Cálculo:</h3>
                <p><strong>Total de envases necesarios:</strong> ${totalNeeded.toLocaleString('es-CO')} unidades</p>
                <hr>
                <h4>Opciones de compra:</h4>
                <ul>
                    <li>Cajas de 24 unidades: <strong>${boxes24} cajas</strong></li>
                    <li>Cajas de 48 unidades: <strong>${boxes48} cajas</strong></li>
                    <li>Cajas de 100 unidades: <strong>${boxes100} cajas</strong></li>
                </ul>
                <p class="uk-text-small uk-text-muted">
                    * Recomendamos agregar un 10% adicional como inventario de seguridad
                </p>
                <div class="uk-margin-top">
                    <a href="https://wa.me/573001234567?text=Necesito%20cotización%20para%20${totalNeeded}%20envases" 
                       target="_blank" 
                       class="uk-button uk-button-primary">
                        <span uk-icon="whatsapp"></span> Solicitar Cotización
                    </a>
                </div>
            </div>
        `;
    }
}

// Inicializar el sistema de catálogo
const catalogoSystem = new CatalogoSystem();