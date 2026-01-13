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
      caption: "M&A - Montagem e Acabamento",
      alignment: "center",
      columns: [
        {
          caption: "Minutos",
          alignment: "center",
          columns: [
            {
              caption: "Montagem",
              dataField: "MinMontagem",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Acabamento",
              dataField: "MinAcabamento",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Soma",
              dataField: "SomaMinMA",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "Pares",
          dataField: "ParesAcabamento",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Euros",
          alignment: "center",
          columns: [
            {
              caption: "Montagem",
              dataField: "EurosMontagem",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Acabamento",
              dataField: "EurosAcabamento",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Soma",
              dataField: "SomaEurMA",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "MinPar",
          dataField: "MinParMA",
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
              dataField: "EurMinMA",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 3 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Par",
              dataField: "EurParMA",
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
      column: "MinMontagem",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "MinAcabamento",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "SomaMinMA",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },

    {
      column: "ParesAcabamento",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "EurosMontagem",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "EurosAcabamento",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "SomaEurMA",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "MinParMA",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurMinMA",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 3 },
      displayFormat: "{0}",
    },
    {
      column: "EurParMA",
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
      pageSize: 50,
    },
    height: "80vh", //baixei de 80vh para 70vh
    width: "70%", //testes de largura

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
        "MinMontagem",
        "MinAcabamento",
        "SomaMinMA",
        "ParesAcabamento",
        "EurosMontagem",
        "EurosAcabamento",
        "SomaEurMA",
        "MinParMA",
        "EurMinMA",
        "EurParMA",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });
    },
  });
}
