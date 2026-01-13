function initPivotGrid(anoSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "encomenda"
        ? "RefEncomenda"
        : agrupamento === "cliente"
        ? "NomeCliente"
        : agrupamento === "amostra"
        ? "RefAmostra"
        : undefined,
    loadUrl: `${base}/ConsumosResumoMensal?ano=${anoSelecionado}&groupBy=${agrupamento}`,
    onBeforeSend: function (operation, ajaxOptions) {
      const token = localStorage.getItem("token");
      ajaxOptions.headers = ajaxOptions.headers || {};
      if (token) ajaxOptions.headers["Authorization"] = `Bearer ${token}`;
    },
  });

  const baseColumns = [
    agrupamento === "cliente"
      ? {
          caption: "Cliente",
          dataField: "NomeCliente",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : agrupamento === "encomenda"
      ? {
          caption: "Encomenda",
          alignment: "center",
          columns: [
            {
              caption: "Referência",
              dataField: "RefEncomenda",
              customizeText: (cellInfo) =>
                cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
            },
            {
              caption: "NrEnc",
              dataField: "NrEnc",
              dataType: "number",
            },
            {
              caption: "Est",
              dataField: "Est",
              dataType: "number",
            },
            {
              caption: "Ano",
              dataField: "Ano",
              dataType: "number",
            },
            {
              caption: "TP",
              dataField: "TP",
              dataType: "number",
            },
          ],
        }
      : agrupamento === "amostra"
      ? {
          caption: "Amostra",
          alignment: "center",
          columns: [
            {
              caption: "Referência",
              dataField: "RefAmostra",
              customizeText: (cellInfo) =>
                cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
            },
            {
              caption: "NrEnc",
              dataField: "NrEnc",
              dataType: "number",
            },
            {
              caption: "Est",
              dataField: "Est",
              dataType: "number",
            },
            {
              caption: "Ano",
              dataField: "Ano",
              dataType: "number",
            },
            {
              caption: "TP",
              dataField: "TP",
              dataType: "number",
            },
          ],
        }
      : {},

    {
      caption: "Meses",
      alignment: "center",
      columns: [
        {
          caption: "Jan",
          dataField: "Jan",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Fev",
          dataField: "Fev",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mar",
          dataField: "Mar",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Abr",
          dataField: "Abr",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Mai",
          dataField: "Mai",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Jun",
          dataField: "Jun",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Jul",
          dataField: "Jul",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Ago",
          dataField: "Ago",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Set",
          dataField: "Setem",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Out",
          dataField: "Outb",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Nov",
          dataField: "Nov",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Dez",
          dataField: "Dez",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
    {
      caption: "Total",
      dataField: "TotalAnual",
      dataType: "number",
      format: { type: "currency", currency: "EUR", precision: 0 },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "Produção",
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
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
      ],
    },
  ];

  const columns = baseColumns;
  const baseSummaryItems = [
    {
      column:
        agrupamento === "cliente"
          ? "NomeCliente"
          : agrupamento === "encomenda"
          ? "RefEncomenda"
          : agrupamento === "amostra"
          ? "RefAmostra"
          : undefined,
      summaryType: "count",
      displayFormat: "TOTAL",
      customizeText: () => "TOTAL",
    },
    {
      column: "Jan",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Fev",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Mar",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Abr",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Mai",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Jun",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Jul",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Ago",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Setem",
      summaryType: "sum",
     valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Outb",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Nov",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Dez",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "TotalAnual",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Interna",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "Externa",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "TotalProd",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "EurPar",
      summaryType: "sum",
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
      enabled: false,
    },
    height: "80vh", //baixei de 80vh para 70vh

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
        "NomeCliente",
        "RefEncomenda",
        "NrEnc",
        "Est",
        "Ano",
        "TP",
        "RefAmostra",
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
      if (agrupamento === "encomenda") {
        e.component.columnOption("RefEncomenda", "visible", false);
      }
      if (agrupamento === "amostra") {
        e.component.columnOption("RefAmostra", "visible", false);
      }

      let data = e.component.getDataSource().items();
      data = data.filter((item) => item.TotalAnual > 0);

      //TENTATIVA

      // Oculta colunas M&A se forem todas 0
      const camposMA = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Setem",
        "Outb",
        "Nov",
        "Dez",
        "TotalAnual",
        "Interna",
        "Externa",
        "TotalProd",
        "EurPar",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });
    },
  });
}
