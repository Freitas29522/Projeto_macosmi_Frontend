function initPivotGrid(anoSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "mes"
        ? "MesNumero"
        : agrupamento === "cliente"
        ? "NomeCliente"
        : agrupamento === "pais"
        ? "Pais"
        : agrupamento === "quadrimestre"
        ? "NumeroQuadrimestre"
        : agrupamento === "estacaoano"
        ? "EstacaoAno"
        : agrupamento === "estacao"
        ? "Estacao"
        : undefined,
    loadUrl: `${base}/ComercializacaoResumo?ano=${anoSelecionado}&groupBy=${agrupamento}`,
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
      : agrupamento === "pais"
      ? {
          caption: "Pais",
          dataField: "Pais",
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
      : {},

    {
      caption: "Encomendas",
      alignment: "center",
      columns: [
        {
          caption: "Pares",
          alignment: "center",
          columns: [
            {
              caption: "Produtos",
              dataField: "ParesProdutos",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Servicos",
              dataField: "ParesServico",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Total",
              dataField: "TotalPares",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
        {
          caption: "Faturação",
          alignment: "center",
          columns: [
            {
              caption: "Produtos",
              dataField: "ValorProdutos",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Servicos",
              dataField: "ValorServicos",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "Total",
              dataField: "TotalValor",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
      ],
    },
    {
      caption: "Valores Liqu. s/IVA",
      alignment: "center",
      columns: [
        {
          caption: "Comissoes c/ Vendas",
          dataField: "VlrCM",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Transportes e Despachos",
          dataField: "VlrTP",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Royalties c/ Vendas",
          dataField: "VlrRY",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Descontos Pagamentos",
          dataField: "VlrPP",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Juros e Gastos",
          dataField: "VlrPG",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Outros",
          dataField: "VlrOC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Total",
          alignment: "center",
          columns: [
            /*             {
              caption: "Eur",
              dataField: "SomaEur",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            }, */
            {
              //ISTO ESTA BEM OS DOIS COM O MESMO DATAFIELD?
              caption: "%",
              dataField: "SomaEur",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
      ],
    },
    {
      caption: "Indicadores",
      alignment: "center",
      columns: [
        {
          caption: "Eur/Par",
          dataField: "EurPar",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 3 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "% FL",
          dataField: "EurPerc",
          dataType: "number",
          format: { type: "fixedPoint", precision: 3 },
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
          : agrupamento === "pais"
          ? "Pais"
          : agrupamento === "quadrimestre"
          ? "NomeQuadrimestre"
          : agrupamento === "estacaoano"
          ? "EstacaoAno"
          : agrupamento === "estacao"
          ? "Estacao"
          : undefined,
      summaryType: "count",
      displayFormat: "TOTAL",
      customizeText: () => "TOTAL",
    },
    {
      column: "ParesProdutos",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "ParesServico",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalPares",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "ValorProdutos",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "vAlorServicos",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalValor",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrCM",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrTP",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrRY",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrPP",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrPG",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "VlrOC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "SomaEur",
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
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurPerc",
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
        "Pais",
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
      //data = data.filter((item) => item.TotalMP > 0);

      const camposMA = [
        "ParesProdutos",
        "ParesServico",
        "TotalPares",
        "ValorProdutos",
        "ValorServicos",
        "TotalValor",
        "VlrCM",
        "VlrTP",
        "VlrRY",
        "VlrPP",
        "VlrPG",
        "VlrOC",
        "SomaEur",
        "TotalProd",
        "EurPar",
        "EurPerc",
      ];

      camposMA.forEach((campo) => {
        const allZero = data.every((row) => row[campo] === 0);
        e.component.columnOption(campo, "visible", !allZero);
      });

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
              : agrupamento === "pais"
              ? "Pais"
              : "MesNumero",
          type: "line",
        },
        series: [{ valueField: "EurPerc", name: "% FL" }],
        legend: {
          visible: false,
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
          "%FL por " +
          agrupamento.charAt(0).toUpperCase() +
          agrupamento.slice(1),
        valueAxis: {
          label: { format: { type: "percent", precision: 1 } },
          type: "continuous", // <- Muda de 'logarithmic' para 'continuous'
        },
        argumentAxis: {
          title: agrupamento.charAt(0).toUpperCase() + agrupamento.slice(1),
          tickInterval: 1,
        },
      });
    },
  });
}
