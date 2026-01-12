const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
const Default = {
  scrollbarTheme: "os-theme-light",
  scrollbarAutoHide: "leave",
  scrollbarClickScroll: true,
};
document.addEventListener("DOMContentLoaded", function () {
  const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
  if (sidebarWrapper && typeof OverlayScrollbarsGlobal !== "undefined") {
    OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
      scrollbars: {
        theme: Default.scrollbarTheme,
        autoHide: Default.scrollbarAutoHide,
        clickScroll: Default.scrollbarClickScroll,
      },
    });
  }
});

const cardHeaders = document.querySelectorAll(
  ".connectedSortable .card-header"
);
cardHeaders.forEach((cardHeader) => {
  cardHeader.style.cursor = "move";
});

function abrirPopup() {
  Swal.fire({
    title: "AVISO",
    text: "EM DESENVOLVIMENTO!",
    icon: "warning",
    confirmButtonText: "Fechar",
  });
}

// Função principal para carregar o header e o sidebar
function loadHeaderAndSidebar() {
  // Carrega o header
  fetch("/Projeto/Frontend/html/layout/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header-container").innerHTML = html;

const btn = document.getElementById("btnRefresh");
const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
if (btn) {
  btn.addEventListener("click", async () => {
    try {
      // 1) abre popup em loading
      if (window.Swal) {
        Swal.fire({
          title: "A atualizar...",
          html: "Por favor aguarde.",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });
      }

      // 2) dispara o job (não fecha o popup aqui!)
      const resp = await fetch(`${base}/Snapshots/Refresh`, { method: "POST" });
      if (!resp.ok) {
        const txt = await resp.text();
        if (window.Swal) Swal.close();
        return Swal ? Swal.fire("Erro", txt || "Falha ao iniciar o job.", "error") : alert("Erro a iniciar o job.");
      }

      // 3) polling do estado até terminar
      const maxWaitMs = 30 * 60 * 1000; // 30 minutos de salvaguarda
      const startTs = Date.now();

      async function isRunning() {
        const r = await fetch(`${base}/Snapshots/Status`);
        if (!r.ok) throw new Error("Falha ao consultar o estado do job.");
        const s = await r.json();
        return !!s.isRunning; // true se ainda a correr
      }

      let running = true;
      while (running) {
        if (Date.now() - startTs > maxWaitMs) throw new Error("Timeout à espera do job.");
        await new Promise(res => setTimeout(res, 4000)); // espera 4s
        running = await isRunning();
      }

      // 4) terminou -> fecha popup e avisa
      if (window.Swal) {
        Swal.close();
        Swal.fire("Sucesso", "Atualização concluída!", "success");
      } else {
        alert("Atualização concluída!");
      }
    } catch (e) {
      if (window.Swal) Swal.close();
      console.error(e);
      Swal ? Swal.fire("Erro", e.message || "Falha ao contactar o servidor.", "error")
           : alert("Erro: " + (e.message || "Falha ao contactar o servidor."));
    }
  });
} else {
  console.warn("Não encontrei #btnRefresh no header!");
}

      // ✅ SÓ aqui o DOM do header está disponível — agora podemos definir o nome
      const nome = localStorage.getItem("nome");
      if (nome) {
        const span = document.getElementById("nomeUtilizador");
        if (span) span.textContent = nome;

        // ✅ Também atualiza o <p> do dropdown com o cargo
        const pCargo = document.getElementById("nomeCargo");
        if (pCargo) pCargo.textContent = `${nome} - Contablista`;
      }

      // ✅ AQUI: Associar o evento ao botão "Sair"
      const botaoSair = document.getElementById("botaoSair");
      if (botaoSair) {
        botaoSair.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("token");
          localStorage.removeItem("nome");
          localStorage.removeItem("email");
          window.location.href = "../.././autenticacao/login.html"; // ajusta conforme necessário
        });
      }

      const botaoSuspender = document.getElementById("botaoSuspender");
      if (botaoSuspender) {
        botaoSuspender.addEventListener("click", function (e) {
          e.preventDefault();
          // Apaga o token, mas mantém os outros dados
          localStorage.removeItem("token");
          window.location.href = "../.././autenticacao/lockscreen.html"; // página onde só pedes a password
        });
      }

      loadScripts(); // Se tiveres scripts no header
    })
    .catch((error) => console.error("Erro ao carregar o header:", error));

  // Carrega o sidebar
  fetch("/Projeto/Frontend/html/layout/sidebar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("sidebar-container").innerHTML = html;
      marcarLinkAtivo(); // Marca o link atual como ativo
    })
    .catch((error) => console.error("Erro ao carregar o sidebar:", error));
}

// Função para marcar o link do menu correspondente à página atual
function marcarLinkAtivo() {
  const currentPage = window.location.pathname.split("/").pop().split("?")[0];

  // Seleciona todos os links do menu lateral
  document.querySelectorAll(".sidebar-menu .nav-link").forEach((link) => {
    if (!link.href || link.href === "#") return;

    const linkPage = link.href.split("/").pop().split("?")[0];

    // Verifica se o link corresponde à página atual
    if (linkPage === currentPage) {
      link.classList.add("active");

      // Abre o menu pai se existir
      const menuItem = link.closest(".menu");
      if (menuItem) {
        menuItem.classList.add("menu-open");

        const parentLink = menuItem.querySelector(":scope > .nav-link");
        if (parentLink) {
          parentLink.classList.add("active");
        }
      }
    }
  });
}

// Função para carregar novamente o adminlte.js
function loadScripts() {
  const adminlteScript = document.createElement("script");
  adminlteScript.src = "/Projeto/Frontend/js/adminlte.js";
  document.body.appendChild(adminlteScript);
}

window.addEventListener("load", loadHeaderAndSidebar);


// --- carregar scripts globais (como calendario.js) automaticamente ---
function loadGlobalScripts() {
  const scripts = [
    "/Projeto/Frontend/js/config.js",
    "/Projeto/Frontend/js/security.js",
    "/Projeto/Frontend/html/Utilitario/calendario.js",
  ];

  scripts.forEach((src) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      document.body.appendChild(s);
    }
  });
}

// chama a função assim que o layout estiver pronto
window.addEventListener("load", () => {
  loadGlobalScripts();
});


