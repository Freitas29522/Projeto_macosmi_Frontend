function initDataGrid(translations) {

  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  $("#dataGridContainer")
    .dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: `${base}/Custeio`,
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

      filterValue: [["TP", "=", "F1"]],

      filterRow: {
        visible: true,
      },

      focusedRowEnabled: true,

      columnChooser: {
        enabled: true,
        mode: "select",
      },


      

      columns: [
        { dataField: "Nr", caption: translations["numero"] || "Nº" },
        { dataField: "Est", caption: translations["estacao"] || "Est"  },
        { dataField: "Ano", caption: translations["ano"] || "Ano"  },
        { dataField: "TP", caption: translations["tipo"] || "TP" },
        { dataField: "Marca", caption: translations["marca"] || "Marca" },
        { dataField: "NrCliente", caption: translations["nCliente"] || "Nº Cliente" },
        { dataField: "Pais", caption: translations["pais"] || "País" },
        { dataField: "DataRegisto", caption: translations["dataRegisto"] || "Data Registo" , dataType: "date" },
        { dataField: "DataEntrega", caption: translations["dataEntrega"] || "Data Entrega", dataType: "date" },
        { dataField: "Pares", caption: translations["pares"] || "Pares" },
        {
          dataField: "PMV",
          caption: translations["pmv"] || "PMV",
          format: { type: "fixedPoint", precision: 2 },
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
        {
          dataField: "ValorBrutoVenda",
          caption: translations["valorBrutoVenda"] || "Valor Bruto Venda",
          format: { type: "fixedPoint", precision: 2 },
          dataType: "number",
            format: { style: "currency", currency: "EUR" },
        },
        {
          caption: translations["artigo"] || "Artigo",
          alignment: "center",
          columns: [
            { dataField: "Referencia", caption: translations["referencia"] || "Ref" },
            { dataField: "Modelo", caption: translations["modelo"] || "Modelo" },
            { dataField: "Sx", caption: translations["sx"] || "Sx" },
            {
              dataField: "PrecoFC",
              caption: translations["precoFC"] || "Prc FC",
              format: { type: "fixedPoint", precision: 2 },
              dataType: "number",
            format: { style: "currency", currency: "EUR" },
            },
          ],
        },
      ],

      masterDetail: {
        enabled: true,
        template(container, options) {
          const id = options.data.ID;

          // Buscar os dados detalhados da API
          fetch(`${base}/Custeio/Detalhes/${id}`)
            .then((response) => {
              if (!response.ok) throw new Error("Erro ao carregar detalhes");
              return response.json();
            })
            .then((data) => {
              $("<div>")
                .dxTabPanel({
                  items: [
                    {
                      title: translations["custounimat"] || "Custos Uni. Mat. (€/Par)",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "KMPCrt",
                              caption: translations["corte"] || "Corte",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KMPCst",
                              caption: translations["costura"] || "Costura",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KMPMon",
                              caption: translations["montagem"] || "Montagem",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KMPAca",
                              caption: translations["acabamento"] || "Acabamento",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["aplicacaoservicos"] || "Aplicação/Serv. (€/Par)",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            { dataField: "SRVCrt", caption: translations["corte"] || "Corte" },
                            { dataField: "SRVCst", caption: translations["costura"] || "Costura" },
                            { dataField: "SRVMon", caption: translations["montagem"] || "Montagem" },
                            { dataField: "SRVAca", caption: translations["acabamento"] || "Acabamento" },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["tempprod"] || "Temp. Prod. (min/Par)",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "MINCrt",
                              caption: translations["corte"] || "Corte",  
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "MINCst",
                              caption: translations["costura"] || "Costura",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "MINMon",
                              caption: translations["montagem"] || "Montagem",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "MINAca",
                              caption: translations["acabamento"] || "Acabamento",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["transfprod"] ||"Transf. Prod. (€/Par)",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "KTRCrt",
                              caption: translations["corte"] || "Corte",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KTRCst",
                              caption: translations["costura"] || "Costura",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KTRMon",
                              caption: translations["montagem"] || "Montagem",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                            {
                              dataField: "KTRAca",
                              caption: translations["acabamento"] || "Acabamento",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["estrutura"] || "Estrutura (€/Par)",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "ESTGer",
                              caption: translations["geral"] || "Geral",
                              format: { type: "fixedPoint", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["pag"] ||"Pag.",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            { dataField: "Dias", caption: translations["dias"] || "Dias" },
                            {
                              dataField: "TxJuro",
                              caption: translations["txjuro"] || "Tx Juro",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "KuPag",
                              caption: translations["kupag"] || "Ku Pag",
                              format: { type: "fixedPoint", precision: 5 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["comercializacao"] ||"Comercialização",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "PercentCom",
                              caption: translations["percomicao"] || "% Comiss",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "PercentTran",
                              caption: translations["pertransp"] || "% Transp",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "PercentPag",
                              caption: translations["perpagam"] || "% Pagam",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "PercentDPag",
                              caption: translations["perdesc"] || "% Desc",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "PercentCOut",
                              caption: translations["peroutros"] || "% Outros",
                              format: { type: "percent", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                    {
                      title: translations["dsccomercia"] ||"Dsc Comercialização",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [data],
                          showBorders: false,
                          columns: [
                            {
                              dataField: "PercentDsc1",
                              caption: translations["percDesc1"] || "% Desc 1",
                              format: { type: "percent", precision: 2 },
                            },
                            {
                              dataField: "PercentDsc2",
                              caption: translations["percDesc2"] || "% Desc 2",
                              format: { type: "percent", precision: 2 },
                            },
                          ],
                        });
                      },
                    },
                  ],
                  animationEnabled: true,
                  showNavButtons: true,
                })
                .appendTo(container);
            })
            .catch((error) => {
              console.error(
                "Erro ao carregar detalhes do masterDetail:",
                error
              );
              $("<div>")
                .text("❌ Erro ao carregar detalhes.")
                .appendTo(container);
            });
        },
      },
    })
};