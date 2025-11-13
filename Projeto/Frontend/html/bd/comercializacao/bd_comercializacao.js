function initDataGrid(translations) {

  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

$("#dataGridContainer")
    .dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID", // Chave primária dos dados
        loadUrl: `${base}/Comercializacao`,
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
          caption: translations["fornecedor"] ||"Fornecedor",
          alignment: "center",
          columns: [
            { dataField: "NrForn", caption: translations["numero"] ||"Nº" },
            { dataField: "NomeForn", caption: translations["nome"] ||"Nome" },
            { dataField: "Pais", caption: translations["pais"] ||"País" },
          ],
        },

        {
          caption: translations["documento"] || "Documento",
          alignment: "center",
          columns: [
            { dataField: "NumDoc", caption: translations["numero"] || "Nº" },
            { dataField: "DataDoc", caption: translations["dataemissao"] ||"Data Emissão", dataType: "date" },
            { dataField: "VencDoc", caption: translations["vencimento"] ||"Vencimento", dataType: "date" },
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
          ],
        },

        { dataField: "Ref", caption: translations["referencia"] ||"Ref." },

        {
          caption: translations["quantidades"] ||"Quantidades",
          alignment: "center",
          columns: [
            { dataField: "Cod", caption: translations["codigo"] ||"Cod" },
            {
              dataField: "Pares",
              caption: translations["pares"] ||"Pares",
              dataType: "number",
              format: { type: "fixedPoint", precision: 0 },
            },
          ],
        },

        {
          dataField: "VlrLiq",
          caption: translations["valorIva"] || "Vlr S/ IVA",
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
        {
          dataField: "PMVl",
          caption: translations["pmv€par"] ||"PMV (€/Par)",
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
        {
          dataField: "Iva",
          caption: translations["iva€"] || "IVA (€)",
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
        {
          dataField: "VlrCIVA",
          caption: translations["valorCIva"] || "Vlr com IVA (€)",
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
      ],
    })
}
