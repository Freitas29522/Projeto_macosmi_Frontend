(() => {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  let popupParametros;
  let selectedCodigo = null;

  $("#dataGridContainer").dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "codigo",
      loadUrl: `${base}/orcamento-previsoes`,
    }),

    remoteOperations: true,
    height: "90vh",

    paging: { pageSize: 50 },

    scrolling: {
      mode: "virtual",
      rowRenderingMode: "virtual",
    },

    allowColumnReordering: true,
    allowColumnResizing: true,
    columnResizingMode: "nextColumn",
    columnMinWidth: 80,
    columnAutoWidth: true,
    rowAlternationEnabled: true,
    showBorders: true,

    headerFilter: { visible: true },
    filterPanel: { visible: true },
    filterRow: { visible: true },

    focusedRowEnabled: true,

    columns: [
      {
        type: "buttons",
        width: 80,
        buttons: [
          {
            hint: "Editar parâmetros",
            icon: "edit",
            onClick: function (e) {
              openParametrosPopup(e.row.data);
            },
          },
        ],
      },

      { dataField: "cliente", caption: "Cliente" },
      { dataField: "artigo", caption: "Artigo" },
      { dataField: "estacao", caption: "Estação" },
      { dataField: "referencia", caption: "Referência" },
      {
        caption: "Datas",
        alignment: "center",
        columns: [
          {
            dataField: "data_rececao",
            caption: "Receção",
            dataType: "date",
          },
          {
            dataField: "data_entrega",
            caption: "Entrega",
            dataType: "date",
          },
        ],
      },
      { dataField: "pares", caption: "Pares", dataType: "number" },
      {
        dataField: "pmv",
        caption: "PMV",
        alignment: "right",
        format: {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        },
      },

      // ======================================
      // VALORES TOTAIS
      // ======================================
      {
        caption: "Valores Totais",
        alignment: "center",
        columns: [
          {
            dataField: "VolumeNegocios",
            caption: "VOLUME NEGÓCIO",
            dataType: "number",
            alignment: "right",
            format: {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            },
          },
          {
            dataField: "Comercializacao",
            caption: "Comercialização",
            dataType: "number",
            alignment: "right",
            format: {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            },
          },
          {
            dataField: "Materias",
            caption: "Matérias",
            dataType: "number",
            alignment: "right",
            format: {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            },
          },
          {
            caption: "Margem Bruta",
            alignment: "center",
            columns: [
              {
                dataField: "MargemBrutaEur",
                caption: "EUR",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
              {
                dataField: "MargemBrutaPerc",
                caption: "%",
                dataType: "number",
                format: {
                  type: "percent",
                  precision: 2, // 2 casas decimais → 100.00%
                },
              },
            ],
          },
          {
            caption: "Transformação",
            alignment: "center",
            columns: [
              {
                dataField: "TransformacaoCC",
                caption: "C&C",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
              {
                dataField: "TransformacaoMA",
                caption: "M&A",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
            ],
          },
          {
            dataField: "Estrutura",
            caption: "Estrutura",
            dataType: "number",
            alignment: "right",
            format: {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            },
          },
          {
            caption: "Margem Líquida",
            alignment: "center",
            columns: [
              {
                dataField: "MargemLiquidaEur",
                caption: "EUR",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
              {
                dataField: "MargemLiquidaPerc",
                caption: "%",
                dataType: "number",
                format: {
                  type: "percent",
                  precision: 2,
                },
              },
            ],
          },
        ],
      },
      {
        caption: "Descontos Comerciais",
        alignment: "center",
        columns: [
          {
            caption: "Desconto1",
            alignment: "center",
            columns: [
              {
                dataField: "Desconto1eur",
                caption: "EUR",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
              {
                dataField: "Desconto1perc",
                caption: "%",
                dataType: "number",
                format: {
                  type: "percent",
                  precision: 2,
                },
              },
            ],
          },
          {
            caption: "Desconto2",
            alignment: "center",
            columns: [
              {
                dataField: "Desconto2eur",
                caption: "EUR",
                dataType: "number",
                alignment: "right",
                format: {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                },
              },
              {
                dataField: "Desconto2perc",
                caption: "%",
                dataType: "number",
                format: {
                  type: "percent",
                  precision: 2,
                },
              },
            ],
          },
        ],
      },
      {
        dataField: "PMVLiquido",
        caption: "PMV LIQ.",
        dataType: "number",
      },
      {
        caption: "Comercialização",
        alignment: "center",
        columns: [
          {
            dataField: "Comissaoperc",
            caption: "Comissão %",
            dataType: "number",
            format: {
              type: "percent",
              precision: 2,
            },
          },
          {
            dataField: "TransportPerc",
            caption: "Transp %",
            dataType: "number",
            format: {
              type: "percent",
              precision: 2,
            },
          },
          {
            dataField: "DescontoPP",
            caption: "Desc PP %",
            dataType: "number",
            format: {
              type: "percent",
              precision: 2,
            },
          },
          {
            dataField: "DiasPagamento",
            caption: "Dias Pag",
            dataType: "number",
          },
          {
            caption: "Custos comercializacao (Eur/Par)",
            alignment: "center",
            columns: [
              {
                dataField: "CustosComercializacaoComissao",
                caption: "Comissão",
                dataType: "number",
              },
              {
                dataField: "CustosComercializacaoTransp",
                caption: "Transp",
                dataType: "number",
              },
              {
                dataField: "CustosComercializacaosDesc",
                caption: "Desc PP",
                dataType: "number",
              },
              {
                dataField: "CustosComercializacaoDiasPP",
                caption: "Juros",
                dataType: "number",
              },
              {
                dataField: "SomaCustosComercializacao",
                caption: "Soma",
                dataType: "number",
              },
            ],
          },
        ],
      },
      {
        caption: "Materias",
        alignment: "center",
        columns: [
          {
            caption: "Custo dos Materiais (Eur/Par)",
            alignment: "center",
            columns: [
              {
                dataField: "CustosMateriaisCort",
                caption: "Corte",
                dataType: "number",
              },
              {
                dataField: "CustosMateriaisCost",
                caption: "Costura",
                dataType: "number",
              },
              {
                dataField: "CustosMateriaisMont",
                caption: "Mont",
                dataType: "number",
              },
              {
                dataField: "CustosMateriaisAcab",
                caption: "Acab",
                dataType: "number",
              },
              {
                dataField: "SomaCustosMateriais",
                caption: "Soma",
                dataType: "number",
              },
            ],
          },
          {
            caption: "Custo dos Serviços (Eur/Par)",
            alignment: "center",
            columns: [
              {
                dataField: "CustosServicosCort",
                caption: "Corte",
                dataType: "number",
              },
              {
                dataField: "CustosServicosCost",
                caption: "Costura",
                dataType: "number",
              },
              {
                dataField: "CustosServicosMont",
                caption: "Mont",
                dataType: "number",
              },
              {
                dataField: "CustosServicossAcab",
                caption: "Acab",
                dataType: "number",
              },
              {
                dataField: "SomaCustosServicos",
                caption: "Soma",
                dataType: "number",
              },
            ],
          },
          {
            dataField: "SomaMateriaisServicos",
            caption: "SOMA",
            dataType: "number",
          },
        ],
      },
      {
        caption: "MRG Bruta",
        alignment: "center",
        columns: [
          {
            dataField: "MRGBrutaEur",
            caption: "Eur",
            dataType: "number",
          },
          {
            dataField: "MRGBrutaPerc",
            caption: "%",
            dataType: "number",
            format: {
              type: "percent",
              precision: 2,
            },
          },
        ],
      },
      {
        caption: "Transformação",
        alignment: "center",
        columns: [
          {
            caption: "Tempos Produção (min)",
            alignment: "center",
            columns: [
              {
                dataField: "TemposProducaoCort",
                caption: "Corte",
                dataType: "number",
              },
              {
                dataField: "TemposProducaoCost",
                caption: "Costura",
                dataType: "number",
              },
              {
                dataField: "TemposProducaoMont",
                caption: "Mont",
                dataType: "number",
              },
              {
                dataField: "TemposProducaoAcab",
                caption: "Acab",
                dataType: "number",
              },
              {
                dataField: "SomaTemposProducao",
                caption: "Soma",
                dataType: "number",
              },
            ],
          },
          {
            caption: "Custo Transformação (Eur/Par)",
            alignment: "center",
            columns: [
              {
                dataField: "CustoTransCort",
                caption: "Corte",
                dataType: "number",
              },
              {
                dataField: "CustoTransCost",
                caption: "Costura",
                dataType: "number",
              },
              {
                dataField: "CustoTransMont",
                caption: "Mont",
                dataType: "number",
              },
              {
                dataField: "CustoTransAcab",
                caption: "Acab",
                dataType: "number",
              },
              {
                dataField: "SomaCustosTransformacao",
                caption: "Soma",
                dataType: "number",
              },
            ],
          },
        ],
      },
      {
        dataField: "CustoEstrutura",
        caption: "Custo Estrutura (Eur/Par)",
        dataType: "number",
      },
      {
        caption: "MRG Líquida",
        alignment: "center",
        columns: [
          {
            dataField: "MRGLiquidaEur",
            caption: "Eur",
            dataType: "number",
            alignment: "right",
            format: {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            },
          },
          {
            dataField: "MRGLiquidaPerc",
            caption: "%",
            dataType: "number",
            format: {
              type: "percent",
              precision: 2,
            },
          },
        ],
      },
    ],
  }); // <-- fim dxDataGrid

  // ==== AQUI: cola as funções ====

  function initParametrosPopup() {
    popupParametros = $("#popupParametros")
      .dxPopup({
        title: "Parâmetros do Orçamento",
        width: 900, // mais largo
        minWidth: 800,
        maxWidth: 1100,
        height: "auto",
        maxHeight: 650, // altura máxima com scroll
        resizeEnabled: true,
        dragEnabled: true,
        showCloseButton: true,
        position: {
          my: "center",
          at: "center",
          of: window,
        },
      })
      .dxPopup("instance");
  }

  function openParametrosPopup(rowData) {
    if (!popupParametros) initParametrosPopup();

    selectedCodigo = rowData.codigo;

    $.get(`${base}/orcamento-linha/${selectedCodigo}`, function (params) {
      const formData = params;

      const formContainer = $("<div>");

      formContainer.dxForm({
        formData: formData,
        labelLocation: "top",
        colCount: 2, // grelha base

        items: [
          {
            itemType: "group",
            caption: "Descontos e Condições Comerciais",
            colSpan: 2,
            colCount: 2,
            items: [
              {
                dataField: "Desconto1perc",
                label: { text: "Desconto 1 (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "Desconto2perc",
                label: { text: "Desconto 2 (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "ComissaoPerc",
                label: { text: "Comissão (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "TransportPerc",
                label: { text: "Transporte (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "DescontoPP",
                label: { text: "Desconto PP (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "DiasPagamento",
                label: { text: "Dias Pagamento" },
                editorType: "dxNumberBox",
              },
            ],
          },

          {
            itemType: "group",
            caption: "Percentagens de Custeio",
            colSpan: 2,
            colCount: 3,
            items: [
              {
                dataField: "MateriasPerc",
                label: { text: "Materiais (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "ServicosPerc",
                label: { text: "Serviços (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "CustoEstrutura",
                label: { text: "Estrutura (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "Cc",
                label: { text: "CC (%)" },
                editorType: "dxNumberBox",
              },
              {
                dataField: "Ma",
                label: { text: "MA (%)" },
                editorType: "dxNumberBox",
              },
            ],
          },

          {
            // Tabs para não ficar tudo na mesma “manga”
            itemType: "tabbed",
            colSpan: 2,
            tabs: [
              {
                title: "Consumos Materiais (M)",
                items: [
                  {
                    itemType: "group",
                    colCount: 4,
                    items: [
                      {
                        dataField: "M3",
                        label: { text: "M3 Corte" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "M6",
                        label: { text: "M6 Costura" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "M8",
                        label: { text: "M8 Montagem" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "M10",
                        label: { text: "M10 Acab." },
                        editorType: "dxNumberBox",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Mão de Obra (O)",
                items: [
                  {
                    itemType: "group",
                    colCount: 4,
                    items: [
                      {
                        dataField: "O3",
                        label: { text: "O3 Corte" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "O6",
                        label: { text: "O6 Costura" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "O8",
                        label: { text: "O8 Montagem" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "O10",
                        label: { text: "O10 Acab." },
                        editorType: "dxNumberBox",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Tempos Produção (T)",
                items: [
                  {
                    itemType: "group",
                    colCount: 4,
                    items: [
                      {
                        dataField: "T3",
                        label: { text: "T3 Corte (min)" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "T6",
                        label: { text: "T6 Costura (min)" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "T8",
                        label: { text: "T8 Montagem (min)" },
                        editorType: "dxNumberBox",
                      },
                      {
                        dataField: "T10",
                        label: { text: "T10 Acab. (min)" },
                        editorType: "dxNumberBox",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      popupParametros.option("contentTemplate", () => formContainer);

      popupParametros.option("toolbarItems", [
        {
          widget: "dxButton",
          toolbar: "bottom",
          location: "before",
          options: {
            text: "Repor origem",
            type: "danger",
            hint: "Eliminar overrides e voltar aos valores de origem",
            onClick: () => resetParametros(),
          },
        },
        {
          widget: "dxButton",
          toolbar: "bottom",
          location: "after",
          options: {
            text: "Guardar",
            type: "success",
            onClick: () => saveParametros(formContainer.dxForm("instance")),
          },
        },
        {
          widget: "dxButton",
          toolbar: "bottom",
          location: "after",
          options: {
            text: "Fechar",
            onClick: () => popupParametros.hide(),
          },
        },
      ]);

      popupParametros.show();
    });
  }

  function saveParametros(form) {
    const data = form.option("formData");
    data.CodigoOrcamento = selectedCodigo;

    $.ajax({
      url: `${base}/orcamento-linha`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        DevExpress.ui.notify("Parâmetros guardados!", "success", 2000);
        popupParametros.hide();
        $("#dataGridContainer").dxDataGrid("instance").refresh();
      },
      error: function (err) {
        console.error(err);
        DevExpress.ui.notify("Erro ao guardar!", "error", 3000);
      },
    });
  }

  function resetParametros() {
    if (!selectedCodigo) return;

    Swal.fire({
        title: "Repor valores de origem?",
        text: "Isto vai eliminar todas as alterações deste orçamento e voltar aos valores originais.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, repor",
        cancelButtonText: "Cancelar",
        didOpen: () => {
            const container = document.querySelector('.swal2-container');
            if (container) container.style.zIndex = 30000;
        }
    }).then(result => {
        if (!result.isConfirmed) return;

        $.ajax({
            url: `${base}/orcamento-linha/${selectedCodigo}`,
            method: "DELETE",
            success: function () {
                DevExpress.ui.notify("Parâmetros repostos para os valores de origem.", "success", 2000);
                $("#dataGridContainer").dxDataGrid("instance").refresh();
                popupParametros.hide();
            },
            error: function (err) {
                console.error(err);
                DevExpress.ui.notify("Erro ao repor parâmetros.", "error", 3000);
            }
        });
    });
}

})(); // <-- fecha tudo
