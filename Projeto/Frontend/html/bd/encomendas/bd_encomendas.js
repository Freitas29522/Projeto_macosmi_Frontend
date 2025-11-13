function initDataGrid(translations) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  const currentYearShort = new Date().getFullYear() % 100;

  $("#dataGridContainer").dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "ID",
      loadUrl: `${base}/Encomendas`,
    }),

    remoteOperations: true,
    height: "90vh",
    export: {
      enabled: true,
    },

    onExporting: function (e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Faturação");

      DevExpress.excelExporter
        .exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          autoFilterEnabled: true,
        })
        .then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "Faturacao.xlsx"
            );
          });
        });

      e.cancel = true; 
    },

    paging: { pageSize: 20 },
    scrolling: {
      mode: "virtual",
      rowRenderingMode: "virtual",
      preloadEnabled: true,
    },
    selection: { mode: "single" },
    columnMinWidth: 80,
    columnAutoWidth: true,
    columnHidingEnabled: false,
    rowAlternationEnabled: true,
    showBorders: true,
    headerFilter: { visible: true },
    filterValue: [["Ano", "=", currentYearShort], "and", ["TP", "=", "F1"]],
    filterPanel: { visible: true },
    filterRow: { visible: true },
    focusedRowEnabled: true,
    columnChooser: {
      enabled: true,
      mode: "select",
    },

    columns: [
      { dataField: "Nr", caption: translations["numero"] || "Nº" },
      { dataField: "Est", caption: translations["estacao"] || "Est" },
      { dataField: "Ano", caption: translations["ano"] || "Ano" },
      { dataField: "TP", caption: translations["tipo"] || "TP" },
      { dataField: "Marca", caption: translations["marca"] || "Marca" },
      {
        dataField: "NrCliente",
        caption: translations["nCliente"] || "Nº Cliente",
      },
      { dataField: "Pais", caption: translations["pais"] || "País" },
      {
        dataField: "DataRegisto",
        caption: translations["dataRegisto"] || "Data Registo",
        dataType: "date",
      },
      {
        dataField: "DataEntrega",
        caption: translations["dataEntrega"] || "Data Entrega",
        dataType: "date",
      },
    ],
    masterDetail: {
      enabled: true,
      autoExpandAll: false,
      template(container, options) {
        $("<div>")
          .addClass("internal-grid")
          .appendTo(container)
          .dxDataGrid({
            dataSource: new DevExpress.data.CustomStore({
              key: "ID",
              load: (loadOptions) => {
                const id = options.data.ID;
                return fetch(
                  `${base}/Encomendas/Detalhes/${id}`
                )
                  .then((response) => {
                    if (!response.ok)
                      throw new Error("Erro ao carregar detalhes");
                    return response.json();
                  })
                  .then((data) => [data])
                  .catch((error) => {
                    console.error(error);
                    return [];
                  });
              },
            }),
            showBorders: false,
            columnAutoWidth: true,
            columns: [
              { dataField: "Pares", caption: translations["pares"] || "Pares" },
              {
                dataField: "ValorBruto",
                caption: translations["valorBruto"] || "Vlr Bruto",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "PMB",
                caption: translations["pmb"] || "PMB",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },

              {
                dataField: "PercentDsc1",
                caption: translations["percDesc1"] || "%Dsc1",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "ValorDsc1",
                caption: translations["valorDesc1"] || "Vlr Dsc 1",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "PercentDsc2",
                caption: translations["percDesc2"] || "%Dsc2",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "ValorDsc2",
                caption: translations["valorDesc2"] || "Vlr Dsc 2",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "ValorLiquido",
                caption: translations["valorLiquido"] || "Vlr Líquido",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "PML",
                caption: translations["pml"] || "PML",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "PercentIVA",
                caption: translations["percIva"] || "%IVA",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "ValorIVA",
                caption: translations["valorIva"] || "Vlr s/IVA",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
              {
                dataField: "ValorCIVA",
                caption: translations["valorCIva"] || "Vlr c/IVA",
                dataType: "number",
                format: { style: "currency", currency: "EUR" },
              },
            ],
          });
      },
    },
  });
}
