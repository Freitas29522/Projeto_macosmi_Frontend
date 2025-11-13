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
        : agrupamento === "pais"
        ? "NomePais"
        : agrupamento === "estacaoano"
        ? "EstacaoAno"
        : agrupamento === "estacao"
        ? "Estacao"
        : agrupamento === "tipodoc"
        ? "TipoDocumento"
        : undefined,
    loadUrl: `${base}/FaturacaoResumoTotal?ano=${anoSelecionado}&groupBy=${agrupamento}`,
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
      caption: "Desc",
      dataField: "TotalDescontos",
      dataType: "number",
      format: { style: "currency", currency: "EUR" },
      customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
    },
    {
      caption: "% Desc",
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
        "EstacaoAno",
        "Estacao",
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

    onContentReady: function (e) {
      let data = e.component.getDataSource().items();
      data = data.filter((item) => item.PMV > 0);

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

      const argumentField =
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
          : "NomeCliente";

      $("#chart").dxChart({
        dataSource: data,
        title:
          "Total por " +
          agrupamento.charAt(0).toUpperCase() +
          agrupamento.slice(1),
        argumentAxis: {
          label: {
            rotationAngle: 45,
            overlappingBehavior: "rotate",
          },
          tickInterval: 1,
        },
        valueAxis: {
          label: {
            format: {
              type: "fixedPoint",
              precision: 2,
              currency: "EUR",
            },
          },
        },
        series: [
          {
            argumentField: argumentField,
            valueField: "TotalComDescontos",
            name: "Total",
            type: "bar", 
            /* color: "#ffc107", */
          },
        ],
        tooltip: {
          enabled: true,
          customizeTooltip: function (arg) {
            return {
              text: `${arg.argumentText}: ${arg.value.toFixed(2)} €`,
            };
          },
        },
        legend: {
          visible: false,
        },
        });
    },
  });
}

function abrirPopupComHtml(arquivoHtml, parametros = {}) {
  let screenWidth = window.innerWidth;
  let modalWidth = screenWidth <= 768 ? 360 : screenWidth - 40;

  const popup = $("#popupPrint");

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
    title: "Resumo de Faturação",
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
  $("#btnFaturacaoDoc").on("click", function () {
    abrirPopupComHtml("rsm_faturacaodoc.html", { ano: 2025 });
  });

  // Botão 2 abre outro arquivo HTML diferente, exemplo
  $("#btnFaturacao").on("click", function () {
    abrirPopupComHtml("rsm_faturacao.html", {
      ano: 2025,
      tp: "F1",
      agrupamento: "cliente",
    });
  });
});
