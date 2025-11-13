function initPivotGrid(anoSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "mes"
        ? "MesNumero"
        : agrupamento === "cliente"
        ? "NomeCliente"
        : agrupamento === "quadrimestre"
        ? "NumeroQuadrimestre"
        : agrupamento === "estacaoano"
        ? "EstacaoAno"
        : agrupamento === "estacao"
        ? "Estacao"
        : agrupamento === "tipo"
        ? "Tipo"
        : undefined,
    loadUrl: `${base}/ProducaoTotalResumo?ano=${anoSelecionado}&groupBy=${agrupamento}`,
  });

  const baseColumns = [
    agrupamento === "mes"
      ? {
          caption: "Mês",
          dataField: "MesNumero",
          customizeText: function (cellInfo) {
            if (cellInfo.rowType === "totalFooter") return "TOTAL";
            const nomesMeses = [
              "",
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ];
            return nomesMeses[cellInfo.value];
          },
        }
      : agrupamento === "cliente"
      ? {
          caption: "Cliente",
          dataField: "NomeCliente",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "quadrimestre"
      ? {
          caption: "Quadrimestre",
          dataField: "NomeQuadrimestre",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "estacaoano"
      ? {
          caption: "EstaçãoAno",
          dataField: "EstacaoAno",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "estacao"
      ? {
          caption: "Estação",
          dataField: "Estacao",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "tipo"
      ? {
          caption: "Tipo",
          dataField: "Tipo",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : {},

    {
      caption: "Pares",
      alignment: "center",
      columns: [
        {
          caption: "Cort",
          dataField: "PrtCort",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Cost",
          dataField: "PrtCost",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mont",
          dataField: "PrtMont",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Acab",
          dataField: "PrtAcab",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Minutos",
      alignment: "center",
      columns: [
        {
          caption: "Cort",
          dataField: "MinCort",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Cost",
          dataField: "MinCost",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mont",
          dataField: "MinMont",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Acab",
          dataField: "MinAcab",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Total",
          dataField: "TotalMin",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Minutos Pares",
      alignment: "center",
      columns: [
        {
          caption: "Cort",
          dataField: "MPCort",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Cost",
          dataField: "MPCost",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mont",
          dataField: "MPMont",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Acab",
          dataField: "MPAcab",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Total",
          dataField: "TotalMP",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Medias",
      alignment: "center",
      columns: [
        {
          caption: "Min/Dia",
          dataField: "MediaMinDia",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Pares/Dia",
          dataField: "MediaParesDia",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
  ];

  const columns = baseColumns;
  const baseSummaryItems = [
    {
      column:
        agrupamento === "mes"
          ? "MesNumero"
          : agrupamento === "cliente"
          ? "NomeCliente"
          : agrupamento === "quadrimestre"
          ? "NomeQuadrimestre"
          : agrupamento === "estacaoano"
          ? "EstacaoAno"
          : agrupamento === "estacao"
          ? "Estacao"
          : agrupamento === "tipo"
          ? "Tipo"
          : undefined,
      summaryType: "count",
      displayFormat: "TOTAL",
      customizeText: () => "TOTAL",
    },
    {
      column: "PrtCort",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "PrtCost",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "PrtMont",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "PrtAcab",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinCort",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinCost",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinMont",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinAcab",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalMin",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MPCort",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MPCost",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MPMont",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MPAcab",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalMP",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MediaMinDia",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MediaParesDia",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
  ];

  $("#dataGridContainer").dxDataGrid({
    dataSource: store,
    columns: columns,
    showBorders: true,
    columnAutoWidth: true,
    wordWrapEnabled: true,
    paging: {
      pageSize: 20,
    },
    height: "80vh", //baixei de 80vh para 70vh
    width: "70%", //testes de largura

    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 20, 50],
      showInfo: true,
    },
    headerFilter: {
      visible: true,
    },
    sorting: {
      mode: "multiple",
    },
    selection: {
      mode: "single", // ou "multiple" se quiseres permitir várias
    },
    summary: {
      totalItems: baseSummaryItems,
    },
    onCellPrepared: function (e) {
      if (e.rowType === "totalFooter") {
        e.cellElement.css({
          "background-color": "#ececec",
          "font-weight": "bold",
          color: "#333",
        });
      }

      const firstColumnFields = [
        "MesNumero",
        "NomeCliente",
        "NomeQuadrimestre",
        "Estacao",
        "Tipo",
      ];
      if (e.column && firstColumnFields.includes(e.column.dataField)) {
        e.cellElement.css({
          "background-color": "#f9f4ef",
          "font-weight": "bold",
          color: "#3c3c3c",
        });
      }
    },

    onContentReady: function (e) {
      let data = e.component.getDataSource().items();
      data = data.filter((item) => item.TotalMP > 0);

      $("#chart").dxChart({
        dataSource: data,
        commonSeriesSettings: {
          argumentField:
            agrupamento === "cliente"
              ? "NomeCliente"
              : agrupamento === "mes"
              ? "MesNumero"
              : agrupamento === "quadrimestre"
              ? "NomeQuadrimestre"
              : agrupamento === "estacaoano"
              ? "EstacaoAno"
              : agrupamento === "estacao"
              ? "Estacao"
              : agrupamento === "tipo"
              ? "Tipo"
              : "NomeCliente",
          type: "bar",
        },
        series: [
          {
            valueField: "MediaParesDia",
            name: "Pares/Dia",
            /* color: "#4e73df",  */
          },
        ],
        legend: {
          visible: false,
          position: "bottom",
        },
        tooltip: {
          enabled: true,
          format: {
            type: "fixedPoint",
            precision: 2,
          },
        },
        title:
          "Produção por " +
          agrupamento.charAt(0).toUpperCase() +
          agrupamento.slice(1),
      });
    },
  });
}

function abrirPopupComHtml(arquivoHtml, parametros = {}) {
  let screenWidth = window.innerWidth;
  let modalWidth = screenWidth <= 768 ? 360 : screenWidth - 40;

  const popup = $("#popupPrint");

  // Monta query string para passar os parâmetros na URL
  const queryString = Object.keys(parametros)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(parametros[key])}`
    )
    .join("&");

  const url = queryString ? `${arquivoHtml}?${queryString}` : arquivoHtml;

  popup.data("anoSelecionado", parametros.ano || null);

  const popupInstance = popup.dxPopup("instance");
  if (!popupInstance) {
    DevExpress.ui.notify(
      "Popup não foi inicializado corretamente!",
      "error",
      2000
    );
    return;
  }

  popupInstance.option({
    width: modalWidth,
    height: "95vh",
    contentTemplate: function (contentElement) {
      contentElement.css({
        height: "100%",
        padding: "0",
        margin: "0",
        overflow: "hidden",
      });
      contentElement.html(`
        <iframe
          src="${url}"
          style="border:none; width:100%; height:100%;"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `);
    },
  });

  popupInstance.show();
}

$(document).ready(function () {
  $("#popupPrint").dxPopup({
    title: "Resumo de Producao",
    showCloseButton: true,
    dragEnabled: true,
    resizeEnabled: true,
    visible: false,
    position: {
      my: "center",
      at: "center",
      of: window,
    },
  });

  // Botão 1 abre rsm_faturacaodoc.html com ano 2025
  $("#btnProducaoInterna").on("click", function () {
    abrirPopupComHtml("rsm_producaointerna.html", { ano: 2025 });
  });

  // Botão 2 abre outro arquivo HTML diferente, exemplo
  $("#btnProducaoExterna").on("click", function () {
    abrirPopupComHtml("rsm_producaoexterna.html", {
      ano: 2025,
      tp: "F1",
      agrupamento: "cliente",
    });
  });
});
