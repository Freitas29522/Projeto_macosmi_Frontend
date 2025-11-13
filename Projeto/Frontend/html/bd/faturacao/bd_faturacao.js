function initDataGrid(translations) {
  /*  const token = localStorage.getItem("token"); */
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  $("#dataGridContainer").dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "ID",
      loadUrl: `${base}/Faturacao`,

      /*       onBeforeSend: function (operation, ajaxSettings) {
        ajaxSettings.headers = {
          Authorization: "Bearer " + token
        };
      } */
    }),

    remoteOperations: true,
    height: "90vh",

    paging: {
      pageSize: 50,
    },

    scrolling: {
      mode: "virtual",
      rowRenderingMode: "virtual",
    },

    allowColumnReordering: true,
    allowColumnResizing: true,
    columnResizingMode: "nextColumn",
    columnMinWidth: 80,
    columnAutoWidth: true,
    columnHidingEnabled: false,
    rowAlternationEnabled: true,
    showBorders: true,

    headerFilter: {
      visible: true,
    },

    filterPanel: {
      visible: true,
    },

    filterRow: {
      visible: true,
    },

    focusedRowEnabled: true,

    columns: [
      {
        caption: translations["cliente"] || "Cliente",
        alignment: "center",
        columns: [
          { dataField: "NrCliente", caption: translations["numero"] || "Nº" },
          { dataField: "NomeCliente", caption: translations["nome"] || "Nome" },
          { dataField: "Pais", caption: translations["pais"] || "País" },
        ],
      },

      {
        caption: translations["documento"] || "Documento",
        alignment: "center",
        columns: [
          { dataField: "TipoDoc", caption: translations["tipo"] || "TP" },
          { dataField: "NumDoc", caption: translations["numero"] || "Nº" },
          {
            dataField: "DataDoc",
            caption: translations["dataemissao"] || "Data Emissão",
            dataType: "date",
          },
          {
            dataField: "VencDoc",
            caption: translations["vencimento"] || "Vencim",
            dataType: "date",
          },
        ],
      },

      {
        caption: translations["encomenda"] || "Encomenda",
        alignment: "center",
        columns: [
          { dataField: "Nr", caption: translations["numero"] || "Nº" },
          { dataField: "Est", caption: translations["estacao"] || "Est" },
          { dataField: "Ano", caption: translations["ano"] || "Ano" },
          { dataField: "TP", caption: translations["tipo"] || "TP" },
          { dataField: "Marca", caption: translations["marca"] || "Marca" },
          {
            dataField: "Referencia",
            caption: translations["referencia"] || "Ref.",
          },
        ],
      },

      {
        caption: translations["quantidade"] || "Quantidades",
        alignment: "center",
        columns: [
          { dataField: "Unid", caption: translations["uni"] || "Unid." },
          { dataField: "Quant", caption: translations["quant"] || "Quant" },
          { dataField: "Pares", caption: translations["pares"] || "Pares" },
        ],
      },

      {
        caption: translations["faturacaosiva"] || "Faturação S/IVA",
        alignment: "center",
        columns: [
          {
            dataField: "VlrBruto",
            caption: translations["vlrbruto"] || "Vlr Bruto",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          {
            dataField: "Descontos",
            caption: translations["descontos"] || "Dsc",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          {
            dataField: "VlrLiquido",
            caption: translations["vlrliquido"] || "Vlr Líq",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
        ],
      },
      {
        dataField: "PMVLiq",
        dataType: "number",
        caption: translations["pmvliquido"] || "PMV Líq",
        format: { style: "currency", currency: "EUR" },
      },
      {
        caption: translations["iva"] || "IVA",
        alignment: "center",
        columns: [
          {
            dataField: "PercIVA",
            caption: translations["perciva"] || "%",
            format: { type: "percent", precision: 0 },
          },
          {
            dataField: "IVAEuro",
            caption: translations["iva€"] || "IVA (€)",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
        ],
      },

      {
        dataField: "ValorComIVA",
        caption: translations["faturacaociva"] || "Faturaçao c/IVA",
        dataType: "number",
        format: { style: "currency", currency: "EUR" },
      },
    ],
  });
}
