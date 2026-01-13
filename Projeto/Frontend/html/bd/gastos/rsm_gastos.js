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
    /* {
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
              format: { type: "fixedPoint", precision: 2 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
            {
              caption: "PMV",
              dataField: "PMV",
              dataType: "number",
              format: { type: "fixedPoint", precision: 2 },
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
              format: { type: "currency", currency: "EUR", precision: 1 },
              customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
            },
          ],
        },
      ],
    }, */
    {
      caption: "Total",
      alignment: "center",
      columns: [
        {
          caption: "Pares",
          dataField: "TotalParesAcab",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Euros",
          dataField: "TotalEuros",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Eur/Par",
          dataField: "TotalEurPar",
          dataType: "number",
          format: { type: "fixedPoint", precision: 1 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Eur C&C",
          dataField: "TotalFinalEurCC",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Eur M&A",
          dataField: "TotalFinalEurMA",
          dataType: "number",
          format: { type: "currency", currency: "EUR", precision: 0 },
          customizeText: (e) => (e.value === 0 ? "-" : e.valueText),
        },
        {
          caption: "Custos Estrutura",
          dataField: "TotalFinalCustosEstrutura",
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
    /* {
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
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "EurosCostura",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "SomaEurCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "MinParCC",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "EurMinCC",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 3 },
      displayFormat: "{0}",
    },
    {
      column: "EurParCC",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
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
    {
      column: "TotalParesFaturados",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalValorFaturado",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "PMV",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "CustosEstrutura",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "IndicadoresEurPar",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "IndicadoresVnd",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 1 },
      displayFormat: "{0}",
    }, */
    {
      column: "TotalParesAcab",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalEuros",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalEurPar",
      summaryType: "avg",
      valueFormat: { type: "fixedPoint", precision: 2 },
      displayFormat: "{0}",
    },
    {
      column: "TotalFinalEurCC",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalFinalEurMA",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
      displayFormat: "{0}",
    },
    {
      column: "TotalFinalCustosEstrutura",
      summaryType: "sum",
      valueFormat: { type: "fixedPoint", precision: 0 },
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
        /* "MinCorte",
        "MinCostura",
        "SomaMinCC",
        "ParesCostura",
        "EurosCorte",
        "EurosCostura",
        "SomaEurCC",
        "MinParCC",
        "EurMinCC",
        "EurParCC",
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
        "TotalParesFaturados",
        "TotalValorFaturado",
        "PMV",
        "CustosEstrutura",
        "IndicadoresEurPar",
        "IndicadoresVnd", */
        "TotalParesAcab",
        "TotalEuros",
        "TotalEurPar",
        "TotalFinalEurCC",
        "TotalFinalEurMA",
        "TotalFinalCustosEstrutura",
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
              ? "ChaveTexto"
              : agrupamento === "marca"
              ? "ChaveTexto"
              : "MesNumero",
          type: "line",
        },
        series: [{ valueField: "TotalEurPar", name: "€/Par" }],
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
          "€/Par por " +
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
    title: "Resumo de Gastos",
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

  $("#btnGastosCC").on("click", function () {
    abrirPopupComHtml("rsm_gastos_CC.html", { ano: 2025 });
  });

  $("#btnGastosMA").on("click", function () {
    abrirPopupComHtml("rsm_gastos_MA.html", { ano: 2025 });
  });

  $("#btnGastosEstrutura").on("click", function () {
    abrirPopupComHtml("rsm_gastos_Estrutura.html", { ano: 2025 });
  });
});
