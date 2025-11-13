function initDataGrid(translations) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  const currentYearShort = new Date().getFullYear() % 100;

$("#dataGridContainer")
    .dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: `${base}/Producao`,
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

      columnChooser: {
        enabled: true,
        mode: "select",
      },

      columns: [
        {
          caption: translations["encomenda"] ||"ENCOMENDA",
          alignment: "center",
          columns: [
            { dataField: "DataMovimento", caption: translations["mov"] ||"Movimento", dataType: "date" },
            { dataField: "Plano", caption: translations["plano"] ||"Plano", dataType: "date" },
            { dataField: "Nr", caption: translations["numero"] ||"Nº" },
            { dataField: "Est", caption: translations["estacao"] ||"Est" },
            { dataField: "Ano", caption: translations["ano"] ||"Ano" },
            { dataField: "TP", caption: translations["tipo"] ||"TP" },
            { dataField: "Marca", caption: translations["marca"] ||"Marca" },
          ],
        },

        { dataField: "Referencia", caption: translations["referencia"] ||"Ref" },
      ],

      masterDetail: {
        enabled: true,
        template(container, options) {
          const id = options.data.ID;

          fetch(`${base}/Producao/Detalhes/${id}`)
            .then((response) => {
              if (!response.ok) throw new Error("Erro ao carregar detalhes");
              return response.json();
            })
            .then((data) => {
              $("<div>")
                .dxTabPanel({
                  items: [
                    {
                      title: translations["pares"] ||"Pares",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [
                            {
                              ParesCrt: data.ParesCrt,
                              ParesCst: data.ParesCst,
                              ParesMon: data.ParesMon,
                              ParesAca: data.ParesAca,
                            },
                          ], 
                          showBorders: false,
                          columns: [
                            { dataField: "ParesCrt", caption: translations["corte"] || "Corte" },
                            { dataField: "ParesCst", caption: translations["costura"] || "Costura" },
                            { dataField: "ParesMon", caption: translations["montagem"] || "Montagem" },
                            { dataField: "ParesAca", caption: translations["acabamento"] || "Acabamento" },
                          ],
                        });
                      }
                    },
                    {
                      title: translations["minpar"] ||"Min/Par",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [
                            {
                              MPCrt: data.MPCrt,
                              MPCst: data.MPCst,
                              MPMon: data.MPMon,
                              MPAca: data.MPAca,
                              MPTTL: data.MPTTL,
                            },
                          ],
                          showBorders: false,
                          columns: [
                            { dataField: "MPCrt", caption: translations["corte"] || "Corte" },
                            { dataField: "MPCst", caption: translations["costura"] || "Costura" },
                            { dataField: "MPMon", caption: translations["montagem"] || "Montagem" },
                            { dataField: "MPAca", caption: translations["acabamento"] || "Acabamento" },
                            { dataField: "MPTTL", caption: translations["total"] || "Total" },
                          ],
                        });
                      }
                    },
                    {
                      title: translations["minutos"] ||"Minutos",
                      template() {
                        return $("<div>").dxDataGrid({
                          dataSource: [
                            {
                              MINCrt: data.MINCrt,
                              MINCst: data.MINCst,
                              MINMon: data.MINMon,
                              MINAca: data.MINAca,
                              MINTtl: data.MINTtl,
                            },
                          ],
                          showBorders: false,
                          columns: [
                            { dataField: "MINCrt", caption: translations["corte"] || "Corte" },
                            { dataField: "MINCst", caption: translations["costura"] || "Costura" },
                            { dataField: "MINMon", caption: translations["montagem"] || "Montagem" },
                            { dataField: "MINAca", caption: translations["acabamento"] || "Acabamento" },
                            { dataField: "MINTtl", caption: translations["total"] || "Total" },
                          ],
                        });
                      }
                    },
                  ],
                  animationEnabled: true,
                  swipeEnabled: true,
                  showNavButtons: true
                })
                .appendTo(container);
            })
            .catch((error) => {
              console.error("Erro ao carregar detalhes do masterDetail:", error);
              $("<div>")
                .text("❌ Erro ao carregar detalhes.")
                .appendTo(container);
            });
        }
      },

    });
  }