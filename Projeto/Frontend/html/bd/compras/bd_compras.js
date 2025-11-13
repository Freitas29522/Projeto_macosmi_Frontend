function initDataGrid(translations) {


  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  $("#dataGridContainer").dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "ID",
      loadUrl: `${base}/Compras`,
    }),

    remoteOperations: true,
    height: "90vh",
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
    filterPanel: { visible: true },
    filterRow: { visible: true },
    focusedRowEnabled: true,
    columnChooser: {
      enabled: true,
      mode: "select",
    },

    columns: [
      {
        caption: translations["encomenda"] || "ENCOMENDA",
        alignment: "center",
        columns: [
          {
            dataField: "NrEnc",
            caption: translations["numero"] || "Nº",
          },
          { dataField: "Est", caption: translations["estacao"] || "Est" },
          { dataField: "Ano", caption: translations["ano"] || "Ano" },
          { dataField: "TP", caption: translations["tipo"] || "TP" },
          { dataField: "Marca", caption: translations["marca"] || "Marca" },
          {
            dataField: "DataEnc",
            caption: translations["dataenc"] || "Data Enc.",
            dataType: "date",
          },
        ],
      },
      {
        caption: translations["fornecedor"] ||"FORNECEDOR",
        alignment: "center",
        columns: [
          {
            dataField: "NrForn",
            caption: translations["numero"] || "Nº",
          },
          {
            dataField: "Nome",
            caption: translations["designacao"] || "Designação",
          },
        ],
      },
      {
        caption: translations["plano"] ||"PLANO",
        alignment: "center",
        columns: [
          { dataField: "Plano", caption: translations["numero"] || "Nº" },
          {
            dataField: "QtEnc",
            caption: translations["pares"] || "Pares",
            dataType: "number",
          },
        ],
      },

      {
        caption: translations["compras"] ||"COMPRAS",
        alignment: "center",
        columns: [
          { dataField: "Cod", caption: translations["codigo"] || "Cód." },
          { dataField: "Fam", caption: translations["familia"] || "Fam." },
          {
            dataField: "DescFam",
            caption: translations["designacao"] || "Designação ",
          },
          { dataField: "UniMP", caption: translations["uni"] || "Uni." },
          {
            dataField: "ConvMP",
            caption: translations["conv"] || "Conv.",
            dataType: "number",
          },
        ],
      },

      {
        caption: translations["requisicao"] || "REQUISIÇÃO",
        alignment: "center",
        columns: [
          { dataField: "TReq", caption: translations["tipo"] || "TP" },
          { dataField: "NReq", caption: translations["numero"] || "Nº" },
          {
            dataField: "DtReq",
            caption: translations["data"] || "Data",
            dataType: "date",
          },
          {
            dataField: "DtEntrReq",
            caption: translations["preventrega"] || "Prev Entr.",
          },
          {
            dataField: "DtVencReq",
            caption: translations["datavenc"] || "Data Venc",
          },
          {
            dataField: "QtReq",
            caption: translations["qtdreq"] || "Qtd Req",
            dataType: "number",
          },
          {
            dataField: "QtEntrReq",
            caption: translations["qtdreqentr"] || "Qtd Entr Req",
            dataType: "number",
          },
          {
            dataField: "ValorLiquReq",
            caption: translations["vlrliquido"] || "VLR Liqui.",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          {
            dataField: "VlrReqCIva",
            caption: translations["valorCIva"] || "VLR c/ IVA",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
        ],
      },
      {
        caption: translations["entregas"] ||"ENTREGAS",
        alignment: "center",
        columns: [
          {
            dataField: "numDocEntrega",
            caption: translations["numero"] || "Nº",
          },
          {
            dataField: "dataDocEntrega",
            caption: translations["data"] || "Data",
            dataType: "date",
          },
          {
            dataField: "data_venc",
            caption: translations["vencimento"] || "Vencimento",
            dataType: "date",
          },
          {
            dataField: "qtdEntregue",
            caption: translations["qtdentregue"] || "Qtd Entregue",
            dataType: "number",
          },
          {
            dataField: "ValorLiquidoEntrega",
            caption:
              translations["vlrliqentr"] || "VLR Líqui Entrega",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          {
            dataField: "ValorComIvaEntrega",
            caption:
              translations["vlrcivaentr"] || "VLR c/ IVA",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          { dataField: "Estado", caption: translations["estado"] || "Estado" },
        ],
      },
      {
        caption: translations["situacao"] ||"SITUAÇÃO",
        alignment: "center",
        columns: [
          {
            dataField: "Correcções",
            caption: translations["correcoes"] || "Correções",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
          {
            dataField: "PorEntregar",
            caption: translations["porentregar"] || "Por Entregar",
            dataType: "number",
            format: { style: "currency", currency: "EUR" },
          },
        ],
      },
    ],
  });
}
