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
    loadUrl: `${base}/ProducaoExternaResumo?ano=${anoSelecionado}&groupBy=${agrupamento}`,
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
      ],
    },
    {
      caption: "Eur",
      alignment: "center",
      columns: [
        {
          caption: "Cort",
          dataField: "EURCort",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Cost",
          dataField: "EURCost",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mont",
          dataField: "EURMont",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Acab",
          dataField: "EURAcab",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Total",
          dataField: "TotalLiq",
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
          caption: "Cort",
          dataField: "EurParCort",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Cost",
          dataField: "EurParCost",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mont",
          dataField: "EurParMont",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 2 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Acab",
          dataField: "EurParAcab",
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
      column: "EURCort",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EURCost",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EURMont",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EURAcab",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalLiq",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },

    {
      column: "EurParCort",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParCost",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParMont",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurParAcab",
      summaryType: "sum",
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
      mode: "single",
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

      const camposMA = [
        "PrtCort",
        "PrtCost",
        "PrtMont",
        "PrtAcab",
        "MinCort",
        "MinCost",
        "MinMont",
        "MinAcab",
        "TotalMin",
        "MPCort",
        "MPCost",
        "MPMont",
        "MPAcab",
        "EURCort",
        "EURCost",
        "EURMont",
        "EURAcab",
        "TotalLiq",
        "EurParCort",
        "EurParCost",
        "EurParMont",
        "EurParAcab",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });
    },
  });
}
