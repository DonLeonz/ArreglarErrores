// ========================================
// SCRIPT DE DEBUGGING PARA CATÁLOGO
// Agregar temporalmente para diagnosticar problemas
// ========================================

console.log("=== DEBUGGING CATÁLOGO ===");

// 1. Verificar que productItems está cargado
console.log("1. Verificando productItems...");
if (typeof window.productItems !== "undefined") {
  console.log(`✓ productItems existe`);
  console.log(`✓ Total de productos: ${window.productItems.length}`);
  console.log(`✓ Primer producto:`, window.productItems[0]);
} else {
  console.error("❌ productItems NO está definido");
}

// 2. Verificar que UIkit está cargado
console.log("\n2. Verificando UIkit...");
if (typeof UIkit !== "undefined") {
  console.log(`✓ UIkit está cargado`);
} else {
  console.error("❌ UIkit NO está cargado");
}

// 3. Verificar elementos del DOM
console.log("\n3. Verificando elementos del DOM...");
const elementos = {
  "product-search-form": document.getElementById("product-search-form"),
  "product-search-input": document.getElementById("product-search-input"),
  "category-filter": document.getElementById("category-filter"),
  "product-results": document.getElementById("product-results"),
  "industry-results": document.getElementById("industry-results"),
  "catalog-cart-items": document.getElementById("catalog-cart-items"),
  "burger-menu": document.getElementById("burger-menu"),
};

Object.keys(elementos).forEach((key) => {
  if (elementos[key]) {
    console.log(`✓ ${key} encontrado`);
  } else {
    console.error(`❌ ${key} NO encontrado`);
  }
});

// 4. Verificar botones de industria
console.log("\n4. Verificando botones de industria...");
const industryButtons = document.querySelectorAll(".industry-filter");
console.log(`✓ Botones de industria encontrados: ${industryButtons.length}`);

// 5. Verificar sistema de catálogo
console.log("\n5. Verificando sistema de catálogo...");
setTimeout(() => {
  if (
    window.surtienvases &&
    window.surtienvases.catalogo &&
    window.catalogoSystem
  ) {
    console.log(`✓ Sistema de catálogo inicializado`);
    console.log(
      `✓ Productos en el sistema: ${window.catalogoSystem.products.length}`
    );

    // Mostrar lista completa de productos
    console.log("\n6. Lista de productos cargados:");
    window.catalogoSystem.products.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title} (${p.category}) - ID: ${p.id}`);
    });
  } else {
    console.error("❌ Sistema de catálogo NO inicializado correctamente");
  }

  console.log("\n=== FIN DEBUGGING ===");
}, 1000);
