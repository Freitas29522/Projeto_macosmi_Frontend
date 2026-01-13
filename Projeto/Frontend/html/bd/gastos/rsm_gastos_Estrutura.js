function initPivotGrid(anoSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "mes"
        ? "MesNumero"
        : agrupamento === "marca"
        ? "ChaveTexto"
        : agrupamento === "quadrimestre"
        ? "ChaveTexto"
        : undefined,
    loadUrl: `${base}/GastosResumo?ano=${anoSelecionado}&groupBy=${agrupamento}`,
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
      : agrupamento === "marca"
      ? {
          caption: "Marca",
          dataField: "ChaveTexto",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "quadrimestre"
      ? {
          caption: "Quadrimestre",
          dataField: "ChaveTexto",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : {},
    {
      caption: "Estrutura",
      alignment: "center",
      columns: [
        {
          caption: "Vendas Enc.",
          alignment: "center",
          columns: [
            {
              caption: "Pares",
              dataField: "TotalParesFaturados",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Euros",
              dataField: "TotalValorFaturado",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "PMV",
              dataField: "PMV",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "Custos de estrutura",
          dataField: "CustosEstrutura",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Indicadores",
          alignment: "center",
          columns: [
            {
              caption: "Eur/Par",
              dataField: "IndicadoresEurPar",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 2 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "%s/Vnd",
              dataField: "IndicadoresVnd",
              dataType: "number",
              format: { type: "percent", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
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
          : agrupamento === "marca"
          ? "ChaveTexto"
          : agrupamento === "quadrimestre"
          ? "ChaveTexto"
          : undefined,
      summaryType: "count",
      displayFormat: "TOTAL",
      customizeText: () => "TOTAL",
    },
    {
      column: "TotalParesFaturados",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalValorFaturado",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" }, 
      displayFormat: "{0}",
    },
    {
      column: "PMV",
      summaryType: "avg",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "CustosEstrutura",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "IndicadoresEurPar",
      summaryType: "avg",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "IndicadoresVnd",
      summaryType: "avg",
      valueFormat: { style: "percent", precision: 2 }, 
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
      pageSize: 50,
    },
    height: "80vh", //baixei de 80vh para 70vh
    width: "100%", //testes de largura

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

      const firstColumnFields = ["MesNumero", "ChaveTexto", "ChaveTexto"];
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

      const camposMA = [
        "TotalParesFaturados",
        "TotalValorFaturado",
        "PMV",
        "CustosEstrutura",
        "IndicadoresEurPar",
        "IndicadoresVnd",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });
    },
  });
}
