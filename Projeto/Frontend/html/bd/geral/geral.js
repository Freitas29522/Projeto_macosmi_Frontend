// geral.js

function carregarGraficoFaturacaoNoGeral({
  ano = 2025,
  tp = "F1",
  agrupamento = "mes",
  targetId = "#grafico1",
  valueField = "TotalPares",
  nomeSerie = "Total de Pares",
  isCurrency = false,
} = {}) {
  // Garantir APP_CONFIG
  if (!window.APP_CONFIG) {
    console.error("APP_CONFIG não está definido. Confirma o config.js.");
    return;
  }

  // Montar base URL de forma segura
  const baseUrl = (window.APP_CONFIG.API_BASE_URL || "").replace(/\/$/, "");
  const apiPath = (window.APP_CONFIG.API_PATH || "").replace(/^\/?/, "/");
  const base = baseUrl + apiPath;

  const token = localStorage.getItem("token");

  const argumentField =
    agrupamento === "cliente"
      ? "NomeCliente"
      : agrupamento === "mes"
      ? "MesNumero"
      : agrupamento === "quadrimestre"
      ? "NomeQuadrimestre"
      : agrupamento === "pais"
      ? "NomePais"
      : agrupamento === "estacaoano"
      ? "EstacaoAno"
      : agrupamento === "estacao"
      ? "Estacao"
      : agrupamento === "tipodoc"
      ? "TipoDocumento"
      : "NomeCliente";

  // Limpa o target para tirar o :empty placeholder
  $(targetId).empty();

  // LoadPanel
  const $lp = $("<div>").appendTo(targetId);
  const lpInstance = $lp
    .dxLoadPanel({
      visible: true,
      shading: false,
      message: "A carregar...",
    })
    .dxLoadPanel("instance");

  $.ajax({
    url: `${base}/FaturacaoResumo?ano=${ano}&tp=${tp}&groupBy=${agrupamento}`,
    method: "GET",
    headers: token ? { Authorization: "Bearer " + token } : {},
  })
    .done(function (data) {
      lpInstance.dispose();
      $lp.remove();

      // Se vier vazio, mostra mensagem
      if (!Array.isArray(data) || data.length === 0) {
        $(targetId).html(
          `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
             Sem dados
           </div>`
        );
        return;
      }

      // Criar gráfico
      $(targetId).dxChart({
        dataSource: data,
        series: {
          argumentField: argumentField,
          valueField: valueField,
          name: nomeSerie,
          type: "bar",
          color: "#ffaa66",
        },
        title:
          nomeSerie +
          " por " +
          (agrupamento === "mes"
            ? "Mês"
            : agrupamento.charAt(0).toUpperCase() + agrupamento.slice(1)),
        argumentAxis: {
          label: {
            rotationAngle: 45,
            overlappingBehavior: "rotate",
          },
        },
        valueAxis: {
          label: {
            format: isCurrency
              ? { type: "currency", currency: "EUR", precision: 0 }
              : { type: "fixedPoint", precision: 0 },
          },
        },
        tooltip: {
          enabled: true,
          format: isCurrency
            ? { type: "currency", currency: "EUR", precision: 2 }
            : { type: "fixedPoint", precision: 0 },
        },
        legend: {
          verticalAlignment: "bottom",
          horizontalAlignment: "center",
        },
      });
    })
    .fail(function (xhr) {
      lpInstance.dispose();
      $lp.remove();

      console.error("Erro no request:", xhr.status, xhr.responseText);

      $(targetId).html(
        `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
           Erro ao carregar gráfico
         </div>`
      );
    });
}

$(function () {
  // Se o token ainda não estiver pronto (depende do security.js), espera um pouco
  const esperarPorTokenEConfig = () => {
    if (!window.APP_CONFIG) return setTimeout(esperarPorTokenEConfig, 200);
    if (!localStorage.getItem("token"))
      return setTimeout(esperarPorTokenEConfig, 200);

    // Gráfico 1: Pares por mês
    carregarGraficoFaturacaoNoGeral({
      ano: 2025,
      tp: "F1",
      agrupamento: "mes",
      targetId: "#grafico1",
      valueField: "TotalPares",
      nomeSerie: "Pares",
      isCurrency: false,
    });

    // Gráfico 2: Total faturado por mês (líquido)
    carregarGraficoFaturacaoNoGeral({
      ano: 2025,
      tp: "F1",
      agrupamento: "mes",
      targetId: "#grafico2",
      valueField: "TotalComDescontos",
      nomeSerie: "Total faturado (€)",
      isCurrency: true,
    });
  };

  esperarPorTokenEConfig();

  // Exemplo: ao clicar no botão, muda o gráfico 1 para "por cliente"
  $("#btnResumoFaturacao").on("click", function () {
    carregarGraficoFaturacaoNoGeral({
      ano: 2025,
      tp: "F1",
      agrupamento: "cliente",
      targetId: "#grafico1",
      valueField: "TotalPares",
      nomeSerie: "Pares",
      isCurrency: false,
    });
  });
});
