(() => {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

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
  });
})();
