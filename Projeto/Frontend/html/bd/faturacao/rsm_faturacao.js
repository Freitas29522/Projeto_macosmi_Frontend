function initPivotGrid(anoSelecionado, tpSelecionado, agrupamento) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  const store = DevExpress.data.AspNet.createStore({
    key:
      agrupamento === "mes"
        ? "MesNumero"
        : agrupamento === "cliente"
        ? "NomeCliente"
        : agrupamento === "quadrimestre"
        ? "NumeroQuadrimestre"
        : agrupamento === "pais"
        ? "NomePais"
        : agrupamento === "estacaoano"
        ? "EstacaoAno"
        : agrupamento === "estacao"
        ? "Estacao"
        : agrupamento === "tipodoc"
        ? "TipoDocumento"
        : undefined,
    loadUrl: `${base}/FaturacaoResumo?ano=${anoSelecionado}&tp=${tpSelecionado}&groupBy=${agrupamento}`,
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
      : agrupamento === "pais"
      ? {
          caption: "País",
          dataField: "NomePais",
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
      : agrupamento === "tipodoc"
      ? {
          caption: "Tipo Documento",
          dataField: "TipoDocumento",
          customizeText: (cellInfo) =>
            cellInfo.rowType === "totalFooter" ? "TOTAL" : cellInfo.value,
        }
      : {},

    {
      caption: "Pares",
      dataField: "TotalPares",
      dataType: "number",
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "Bruto",
      dataField: "TotalBruto",
      dataType: "number",
      format: { style: "currency", currency: "EUR" },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "Descontos",
      dataField: "TotalDescontos",
      dataType: "number",
      format: { style: "currency", currency: "EUR" },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "% Desconto",
      dataField: "PercentagemDesconto",
      dataType: "number",
      format: { type: "percent", precision: 2 },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "Total",
      dataField: "TotalComDescontos",
      dataType: "number",
      format: { style: "currency", currency: "EUR" },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "PMV",
      dataField: "PMV",
      dataType: "number",
      format: {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
  ];

  const extraColumnsByTipo = {
    A1: [
      {
        caption: "Pares Faturados",
        dataField: "ParesFaturados",
        dataType: "number",
        customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
      },
      {
        caption: "Pares Oferecidos",
        dataField: "ParesOferecidos",
        dataType: "number",
        customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
      },
    ],
    K: [
      {
        caption: "Pares Faturados",
        dataField: "ParesFaturados",
        dataType: "number",
        customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
      },
      {
        caption: "Pares Oferecidos",
        dataField: "ParesOferecidos",
        dataType: "number",
        customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
      },
    ],
  };

  const columns = baseColumns.concat(extraColumnsByTipo[tpSelecionado] || []);

  const baseSummaryItems = [
    {
      column:
        agrupamento === "mes"
          ? "MesNumero"
          : agrupamento === "cliente"
          ? "NomeCliente"
          : agrupamento === "quadrimestre"
          ? "NomeQuadrimestre"
          : agrupamento === "pais"
          ? "NomePais"
          : agrupamento === "estacaoano"
          ? "EstacaoAno"
          : agrupamento === "estacao"
          ? "Estacao"
          : agrupamento === "tipodoc"
          ? "TipoDocumento"
          : undefined,
      summaryType: "count",
      displayFormat: "TOTAL",
      customizeText: () => "TOTAL",
    },
    {
      column: "TotalPares",
      summaryType: "sum",
      displayFormat: "{0}",
    },
    {
      column: "TotalBruto",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "TotalDescontos",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "PercentagemDesconto",
      summaryType: "avg",
      valueFormat: { type: "percent", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalComDescontos",
      summaryType: "sum",
      valueFormat: { style: "currency", currency: "EUR" },
      displayFormat: "{0}",
    },
    {
      column: "PMV",
      summaryType: "avg",
      valueFormat: {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      displayFormat: "{0}",
    },
  ];

  if (["A1", "K"].includes(tpSelecionado)) {
    baseSummaryItems.push(
      {
        column: "ParesFaturados",
        summaryType: "sum",
        displayFormat: "{0}",
      },
      {
        column: "ParesOferecidos",
        summaryType: "sum",
        displayFormat: "{0}",
      }
    );
  }

  // Inicializa o DataGrid
  $("#dataGridContainer").dxDataGrid({
    dataSource: store,
    columns: columns,
    showBorders: true,
    height: "85vh",
    columnAutoWidth: true,
    wordWrapEnabled: true,
    paging: {
      pageSize: 20,
    },
    selection: {
    mode: "single",
  },
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
        "NomePais",
        "Estacao",
        "EstacaoAno",
        "TipoDocumento",
      ];
      if (e.column && firstColumnFields.includes(e.column.dataField)) {
        e.cellElement.css({
          "background-color": "#f9f4ef",
          "font-weight": "bold",
          color: "#3c3c3c",
        });
      }
    },
  });

  
  store.load().then((data) => {
    $("#chart").dxChart({
      dataSource: data,
      series: {
        argumentField:
          agrupamento === "cliente"
            ? "NomeCliente"
            : agrupamento === "mes"
            ? "MesNumero"
            : agrupamento === "quadrimestre"
            ? "NomeQuadrimestre"
            : agrupamento === "pais"
            ? "NomePais"
            : agrupamento === "estacaoano"
            ? "EstacaoAno"
            : agrupamento === "estacao"
            ? "Estacao"
            : agrupamento === "tipodoc"
            ? "TipoDocumento"
            : "NomeCliente", 
        valueField: "TotalPares",
        name: "Total de Pares",
        type: "bar",
        color: "#ffaa66",
      },
      title:
        "Pares por " +
        agrupamento.charAt(0).toUpperCase() +
        agrupamento.slice(1),
      argumentAxis: {
        label: {
          rotationAngle: 45,
          overlappingBehavior: "rotate",
        },
      },
      tooltip: {
        enabled: true,
        format: {
          type: "fixedPoint",
          precision: 0,
        },
      },
      legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center",
      },
    });
  });
} 