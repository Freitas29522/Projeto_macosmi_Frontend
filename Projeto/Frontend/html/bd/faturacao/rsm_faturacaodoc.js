// Inicialização do DataGrid para Faturação Resumo
function initPivotGrid(anoSelecionado) {

  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  const currencyFormat = {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const createCurrencyColumn = (dataField, caption) => ({
    dataField,
    caption,
    dataType: "number",
    format: currencyFormat,
    customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
  });

  const createNumberColumn = (dataField, caption) => ({
    dataField,
    caption,
    dataType: "number",
    customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
  });

  function extractNumericColumns(columns) {
    const result = [];
    columns.forEach((col) => {
      if (col.columns) {
        result.push(...extractNumericColumns(col.columns));
      } else if (col.dataField && col.dataType === "number") {
        result.push(col);
      }
    });
    return result;
  }

  const store = DevExpress.data.AspNet.createStore({
    key: "NomeCliente",
    loadUrl: `${base}/FaturacaoResumoDoc?ano=${anoSelecionado}`,
    onLoadingChanged: function (isLoading) {
      if (isLoading) {
        // Mostrar spinner
      } else {
        // Esconder spinner
      }
    },
    onLoadError: function (error) {
      DevExpress.ui.notify(
        "Erro ao carregar dados: " + error.message,
        "error",
        3000
      );
    },
  });

  const columns = [
    { caption: "Cliente", dataField: "NomeCliente" },
    {
      caption: "Encomendas",
      alignment: "center",
      columns: [
        {
          caption: "FAC",
          alignment: "center",
          columns: [
            createNumberColumn("ParesFAC", "Pares"),
            createCurrencyColumn("EurosFAC", "Euro"),
          ],
        },
        {
          caption: "NCC",
          alignment: "center",
          columns: [
            createNumberColumn("ParesNCC", "Pares"),
            createCurrencyColumn("EurosNCC", "Euro"),
          ],
        },
        {
          caption: "Soma",
          alignment: "center",
          columns: [
            createNumberColumn("EncPares", "Pares"),
            createCurrencyColumn("EncEuros", "Euros"),
            createCurrencyColumn("PMV_Enc", "PMV"),
          ],
        },
      ],
    },
    {
      caption: "Amostras",
      alignment: "center",
      columns: [
        {
          caption: "FAE",
          alignment: "center",
          columns: [
            createNumberColumn("ParesFAE", "Pares"),
            createCurrencyColumn("EurosFAE", "Euro"),
          ],
        },
        {
          caption: "GTC",
          alignment: "center",
          columns: [createNumberColumn("ParesGTC", "Pares")],
        },
        {
          caption: "FAO",
          alignment: "center",
          columns: [createNumberColumn("ParesFAO", "Pares")],
        },
        {
          caption: "Soma",
          alignment: "center",
          columns: [
            createNumberColumn("AmoPares", "Pares"),
            createCurrencyColumn("AmoEuros", "Euros"),
            createCurrencyColumn("PMV_Amo", "PMV"),
          ],
        },
      ],
    },
    {
      caption: "Outros",
      alignment: "center",
      columns: [
        {
          caption: "FA",
          alignment: "center",
          columns: [createCurrencyColumn("EurosFA", "Euro")],
        },
        {
          caption: "NC",
          alignment: "center",
          columns: [createCurrencyColumn("EurosNC", "Euro")],
        },
        {
          caption: "GT",
          alignment: "center",
          columns: [createCurrencyColumn("EurosGT", "Euro")],
        },
        {
          caption: "Soma",
          alignment: "center",
          columns: [createCurrencyColumn("OutEuros", "€")],
        },
      ],
    },
    {
      caption: "Total",
      alignment: "center",
      columns: [
        createNumberColumn("TotalPares", "Total Pares"),
        createCurrencyColumn("TotalEuros", "Total €"),
      ],
    },
  ];

  $("#dataGridContainer").dxDataGrid({
    dataSource: {
      store,
      remoteOperations: true,
    },
    columns: columns,
    showBorders: true,
    height: "85vh",
    paging: {
      pageSize: 50,
    },
    selection: {
      mode: "single",
    },
    columnAutoWidth: true,
    wordWrapEnabled: true,
    headerFilter: { visible: true },
    summary: {
      totalItems: [
        {
          column: "NomeCliente",
          summaryType: "count",
          displayFormat: "TOTAL",
          customizeText: () => "TOTAL",
        },
        ...extractNumericColumns(columns).map((col) => ({
          column: col.dataField,
          summaryType: "sum",
          displayFormat: "{0}",
          valueFormat: col.format || undefined,
        })),
      ],
    },
    onCellPrepared: function (e) {
      if (e.rowType === "totalFooter") {
        e.cellElement.css({
          "background-color": "#ececec",
          "font-weight": "bold",
          color: "#333",
        });
      }
      if (e.column && e.column.dataField === "NomeCliente") {
        e.cellElement.css({
          "background-color": "#f9f4ef",
          "font-weight": "bold",
          color: "#3c3c3c",
        });
      }
    },
  });
}
