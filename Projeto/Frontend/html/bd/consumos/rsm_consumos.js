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
    loadUrl: `${base}/ConsumosResumo?ano=${anoSelecionado}&groupBy=${agrupamento}`,
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
      caption: "Materiais",
      alignment: "center",
      columns: [
        {
          caption: "Materia Prima",
          dataField: "MateriaPrima",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Subsidiária",
          dataField: "Subsidiaria",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Embalagem",
          dataField: "Embalagem",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Outras",
          dataField: "Outros",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Soma",
          dataField: "TotalMaterias",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Gastos Adicionais",
      alignment: "center",
      columns: [
        {
          caption: "Transportes",
          dataField: "Transporte",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Alfandega",
          dataField: "Alfandega",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Outras",
          dataField: "OutrasDespesas",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Soma",
          dataField: "TotalGastos",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Serviço",
      dataField: "Servico",
      dataType: "number",
      format: { type: "currency", currency: "EUR", precision: 0 },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    /*     {
      caption: "Outras",
      dataField: "Totais",
      dataType: "number",
      format: { type: "fixedPoint", precision: 2 },
    }, */
    {
      caption: "Total",
      dataField: "Totais",
      dataType: "number",
      format: { type: "currency", currency: "EUR", precision: 0 },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "Producao em Pares",
      alignment: "center",
      columns: [
        {
          caption: "Interna",
          dataField: "Interna",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Externa",
          dataField: "Externa",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Total",
          dataField: "TotalProd",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Eur/Par",
          dataField: "EurPar",
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
          caption: "Cons",
          dataField: "EurParCons",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Serv",
          dataField: "EurParServ",
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
      column: "MateriaPrima",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Subsidiaria",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Embalagem",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Outros",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalMaterias",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Transporte",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Alfandega",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "OutrasDespesas",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalGastos",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Servico",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Totais",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Externa",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "Interna",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },

    {
      column: "TotalProd",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "EurPar",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParCons",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 2 },
      displayFormat: "{0}",
    },

    {
      column: "EurParServ",
      summaryType: "sum",
      valueFormat: { type: "currency", currency: "EUR", precision: 2 },
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
      if (window.applyNegativeClass) window.applyNegativeClass(e);

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
        "EstacaoAno",
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
      //data = data.filter((item) => item.TotalMP > 0);

      //TENTATIVA

      const camposMA = ["Alfandega", "Externa"];

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
              : agrupamento === "cliente"
              ? "NomeCliente"
              : agrupamento === "tipo"
              ? "Tipo"
              : "MesNumero",
          type: "bar",
        },
        series: [
          { valueField: "TotalMaterias", name: "Materiais" },
          { valueField: "TotalGastos", name: "Gastos" },
          { valueField: "Servico", name: "Servico" },
        ],
        legend: {
          visible: true,
          position: "bottom",
        },
        tooltip: {
          enabled: true,
          format: {
            type: "fixedPoint",
            precision: 0,
            currency: "EUR",
          },
        },
        title:
          "Custos por " +
          agrupamento.charAt(0).toUpperCase() +
          agrupamento.slice(1),
        valueAxis: {
          title: "Valor (€)",
          label: { format: { type: "fixedPoint", precision: 0 } },

          type: "logarithmic",
          logarithmBase: 10,
        },
        argumentAxis: {
          title: agrupamento.charAt(0).toUpperCase() + agrupamento.slice(1),
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
    title: "Resumo de Consumos",
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
    abrirPopupComHtml("rsm_consumosmensal.html", {
      ano: 2025,
      agrupamento: "cliente",
    });
  });
});
