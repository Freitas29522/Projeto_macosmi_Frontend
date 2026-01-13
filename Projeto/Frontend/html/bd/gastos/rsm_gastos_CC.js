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
      caption: "C&C - Corte e Costura",
      alignment: "center",
      columns: [
        {
          caption: "Minutos",
          alignment: "center",
          columns: [
            {
              caption: "Corte",
              dataField: "MinCorte",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Costura",
              dataField: "MinCostura",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Soma",
              dataField: "SomaMinCC",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "Pares",
          dataField: "ParesCostura",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Euros",
          alignment: "center",
          columns: [
            {
              caption: "Corte",
              dataField: "EurosCorte",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Costura",
              dataField: "EurosCostura",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Soma",
              dataField: "SomaEurCC",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "MinPar",
          dataField: "MinParCC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Euro",
          alignment: "center",
          columns: [
            {
              caption: "Min",
              dataField: "EurMinCC",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 3 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Par",
              dataField: "EurParCC",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 2 },
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
      column: "MinCorte",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "MinCostura",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "SomaMinCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "ParesCostura",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "EurosCorte",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "EurosCostura",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "SomaEurCC",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "MinParCC",
      summaryType: "avg",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "EurMinCC",
      summaryType: "avg",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "EurParCC",
      summaryType: "avg",
      valueFormat: { style: "currency", currency: "EUR" },
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
        "MinCorte",
        "MinCostura",
        "SomaMinCC",
        "ParesCostura",
        "EurosCorte",
        "EurosCostura",
        "SomaEurCC",
        "MinParCC",
        "EurMinCC",
        "EurParCC",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });
    },
  });
}
