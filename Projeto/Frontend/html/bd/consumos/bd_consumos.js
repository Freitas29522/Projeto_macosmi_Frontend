function initDataGrid(translations) {

  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

  $("#dataGridContainer")
    .dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID", // Chave primária dos dados
        loadUrl: `${base}/Consumos`,
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
          caption: translations["encomenda"] || "Encomenda",
          alignment: "center",
          columns: [
            { dataField: "NrEnc", caption: translations["numero"] || "Nº" },
            { dataField: "Est", caption: translations["estacao"] || "Est" },
            { dataField: "Ano", caption: translations["ano"] || "Ano" },
            { dataField: "TP", caption: translations["tipo"] || "TP" },
            { dataField: "Marca", caption: translations["marca"] || "Marca" },
          ],
        },

        {
          caption: translations["plano"] || "Plano",
          alignment: "center",
          columns: [
            { dataField: "Plano", caption: translations["numero"] || "Nº" },
            { dataField: "Ref", caption: translations["referencia"] || "Ref" },
            { dataField: "ParPlano", caption: translations["pares"] || "Pares" },
          ],
        },

        {
          caption: translations["artigos"] || "Artigos",
          alignment: "center",
          columns: [
            { dataField: "GrpArt", caption: translations["codigo"] || "Cod" },
            { dataField: "Fam", caption: translations["familia"] || "Fam" },
            { dataField: "DescFam", caption: translations["designacao"] ||"Designação" },
          ],
        },

        {
          caption: translations["fornecedor"] || "Fornecedor",
          alignment: "center",
          columns: [
            { dataField: "NrForn", caption: translations["numero"] || "Nº" },
            { dataField: "NomeForn", caption: translations["designacao"] || "Designação",
              
              customizeText: function(e) {
              return inserirQuebras(e.value, 20);
            }},
          ],
        },

        {
          caption: translations["documentos"] || "Documentos",
          alignment: "center",
          columns: [
            { dataField: "TpDoc", caption: translations["tipo"] || "TP" },
            { dataField: "NrDoc", caption: translations["numero"] ||"Nº" },
            { dataField: "DtDoc", caption: translations["data"] || "Data", dataType: "date" },
            { dataField: "VencDoc", caption: translations["vencimento"] ||"Vencim", dataType: "date" },
            { dataField: "UnDoc", caption: translations["uni"] || "Uni" },
            {
              dataField: "QuantDoc",
              caption: translations["quantidade"] ||"Quantidade",
              dataType: "number",
            },
            {
              dataField: "ValorDoc",
              caption: translations["valor"] ||"Valor",
              dataType: "number",
            format: { style: "currency", currency: "EUR" },
            },
          ],
        },
      ],
    })
  }

//funcao para dar quebra de linha no texto
function inserirQuebras(texto, limite) {
  if (!texto) return texto;
  return texto.match(new RegExp('.{1,' + limite + '}', 'g')).join('\n');
}
