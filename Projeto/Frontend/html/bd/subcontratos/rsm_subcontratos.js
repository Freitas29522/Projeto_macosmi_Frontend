function initPivotGrid(anoSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "mes"
        ? "MesNumero"
        : agrupamento === "cliente"
        ? "NomeCliente"
        : agrupamento === "fornecedor"
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
    loadUrl: `${base}/SubContratosResumoAnalise?ano=${anoSelecionado}&groupBy=${agrupamento}`,
    onBeforeSend: function (operation, ajaxOptions) {
      const token = localStorage.getItem("token");
      ajaxOptions.headers = ajaxOptions.headers || {};
      if (token) ajaxOptions.headers["Authorization"] = `Bearer ${token}`;
    },
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
      : agrupamento === "fornecedor"
      ? {
          caption: "Fornecedor",
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
          caption: "C&C",
          dataField: "PrtCC",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "PrtMM",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Minutos",
      alignment: "center",
      columns: [
        {
          caption: "C&C",
          dataField: "MinCC",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "MinMM",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Soma",
          dataField: "TotalMin",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Minutos Pares",
      alignment: "center",
      columns: [
        {
          caption: "C&C",
          dataField: "MPCC",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "MPCMM",
          dataType: "number",
          format: { type: "fixedPoint", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Eur",
      alignment: "center",
      columns: [
        {
          caption: "C&C",
          dataField: "EurCC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "EurMM",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Soma",
          dataField: "TotalEur",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Eur/Par",
      alignment: "center",
      columns: [
        {
          caption: "C&C",
          dataField: "EurParCC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "EurParMM",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Eur/Min",
      alignment: "center",
      columns: [
        {
          caption: "C&C",
          dataField: "EurMinCC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "M&A",
          dataField: "EurMinMM",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
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
          : agrupamento === "fornecedor"
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
      column: "PrtCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "PrtMM",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MinMM",
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
      column: "MPCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "MPCMM",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurMM",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalEur",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParCC",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParMM",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurMinCC",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },

    {
      column: "EurMinMM",
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
        "EstacaoAno",
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
      data = data.filter((item) => item.TotalMin > 0);

      //TENTATIVA

      // Oculta colunas M&A se forem todas 0
      const camposMA = [
        "PrtMM",
        "MinMM",
        "MPCMM",
        "EurMM",
        "EurParMM",
        "EurMinMM",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });

      //ACABA AQUI

      $("#chart").dxChart({
        dataSource: data,
        commonSeriesSettings: {
          argumentField:
            agrupamento === "mes"
              ? "MesNumero"
              : agrupamento === "quadrimestre"
              ? "NomeQuadrimestre"
              : agrupamento === "estacaoano"
              ? "EstacaoAno"
              : agrupamento === "estacao"
              ? "Estacao"
              : agrupamento === "cliente"
              ? "NomeCliente"
              : agrupamento === "tipo"
              ? "Tipo"
              : "MesNumero",
          type: "line",
        },
        series: [
          { valueField: "PrtCC", name: "Par C&C" },
          { valueField: "PrtMM", name: "Par M&M" },
        ],
        legend: {
          visible: true,
          position: "bottom",
        },
        tooltip: {
          enabled: true,
          format: {
            type: "fixedPoint",
            precision: 2,
            currency: "EUR",
          },
        },
        title:
          "Pares por " +
          agrupamento.charAt(0).toUpperCase() +
          agrupamento.slice(1),
        valueAxis: {
          title: "€ por Par",
          label: { format: { type: "fixedPoint", precision: 2 } },
        },
        argumentAxis: {
          title: agrupamento.charAt(0).toUpperCase() + agrupamento.slice(1),
          tickInterval: 1,
        },
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
    title: "Resumo de SubContratados",
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
  $("#btnSubContratosAnalise").on("click", function () {
    abrirPopupComHtml("rsm_subcontratosdetalhes.html", { ano: 2025 });
  });

  // Botão 2 abre outro arquivo HTML diferente, exemplo
  $("#btnSubContratosAnoAnterior").on("click", function () {
    abrirPopupComHtml("rsm_subcontratosano.html", {
      ano: 2025,
      tp: "F1",
      agrupamento: "cliente",
    });
  });
});
