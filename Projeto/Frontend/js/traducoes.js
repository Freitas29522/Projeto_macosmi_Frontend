function setLanguage(lang) {
  // Guardar o idioma selecionado no localStorage
  localStorage.setItem("app-language", lang);

  // Atualizar idioma interno do DevExtreme
  DevExpress.localization.locale(lang);

  // Carregar as traduções e atualizar os textos
  loadTranslations(lang)
    .then((translations) => {
      updateTexts(translations);
      // Atualizar os textos com as traduções

      // Verifica se a DataGrid já está inicializada
      const gridElement = $("#gridContainer")[0];
      const gridInstance = gridElement && $.data(gridElement, "dxDataGrid");

      if (gridInstance) {
        gridInstance.dispose();
      }

      initDataGrid(translations); // Inicializa a grelha com os captions traduzidos
    })
    .catch((error) => {
      console.error("Erro ao carregar traduções:", error);
    });
}

// Função para carregar as traduções a partir do arquivo JSON
function loadTranslations(lang) {
  return new Promise((resolve, reject) => {
    const jsonPath = `${window.location.origin}/Projeto/Frontend/traducoes/${lang}.json`;

    fetch(jsonPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error("Erro ao carregar as traduções:", error);
        reject(error);
      });
  });
}

function updateTexts(translations) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}

// Função para carregar o idioma preferido ao carregar a página
function initLanguage() {
  const savedLanguage = localStorage.getItem("app-language") || "pt";
  setLanguage(savedLanguage); // Carregar traduções e aplicar na página
}

// Chama a função de inicialização quando a página estiver carregada

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    const savedLanguage = localStorage.getItem("app-language") || "pt";
    setLanguage(savedLanguage);
  });
});
