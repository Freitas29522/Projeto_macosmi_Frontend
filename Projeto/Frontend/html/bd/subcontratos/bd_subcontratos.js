function initDataGrid(translations) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  
  $("#dataGridContainer")
    .dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID", // Chave primária dos dados
        loadUrl: `${base}/SubContratos`,
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
          caption: translations["subcontratador"] || "SubContratador Producao",
          alignment: "center",
          columns: [
            { dataField: "NrForn", caption: translations["numero"] || "Nº" },
            { dataField: "Sigla", caption: translations["designacao"] || "Designação" },
          ],
        },

        {
          caption: translations["plano"] || "Plano",
          alignment: "center",
          name: "GrupoPlano",
          headerCellTemplate: criarBotaoGrupo(
             translations["plano"],
            "toggleGrupoPlano",
            togglePlanoColumns
          ),
          columns: [
            { dataField: "Plano", caption: translations["numero"] || "Nº" },
            { dataField: "Ref", caption: translations["referencia"] || "Ref" },
            { dataField: "MinPar", visible: false, caption: translations["minpar"] || "MinPar" },
            { dataField: "Pares", visible: false, caption: translations["pares"] || "Pares" },
            { dataField: "Tam", visible: false, caption: translations["tamanho"] || "Tam" },
          ],
        },

        {
          caption: translations["subcontrato"] ||"SubContrato",
          alignment: "center",
          columns: [
            { dataField: "CodServico", caption: translations["codigo"] || "Cod" },
            { dataField: "Servico", caption: translations["servico"] || "Serviço" },
          ],
        },

        {
          caption: translations["requisicao"] || "Requisição",
          alignment: "center",
          name: "GrupoReq",
          headerCellTemplate: criarBotaoGrupo(
            translations["requisicao"],
            "toggleGrupoReq",
            toggleReqColumns
          ),
          columns: [
            { dataField: "NumReq", caption: translations["numero"] ||"Nº" },
            { dataField: "DataReq", caption: translations["data"] ||"Data", dataType: "date" },
            {
              dataField: "DataEntrega",
              caption: translations["servico"] || "Prev Entr.",
              dataType: "date",
            },
            {
              dataField: "RPrec",
              caption: translations["europar"] || "€/Par",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrBruto",
              caption: translations["valorBruto"] || "Vlr Bruto",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrLiqDescontos",
              caption: translations["valorliquidodesc"] || "Vlr Líq. Desc.",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
          ],
        },

        {
          caption: translations["entregas"] || "Entregas",
          alignment: "center",
          name: "GrupoEnt",
          headerCellTemplate: criarBotaoGrupo(
            translations["entregas"],
            "toggleGrupoEnt",
            toggleEntColumns
          ),
          columns: [
            { dataField: "DocEntr", caption: translations["numerodocumento"] || "Nº Doc." },
            { dataField: "DtDocEntr", caption: translations["data"] || "Data", dataType: "date" },
            { dataField: "DtVencEntr", caption: translations["vencimento"] || "Vencim", dataType: "date" },
            { dataField: "NrDiasEntr", caption: translations["pagdias"] ||  "Pag(dias)", visible: false },
            { dataField: "QtdEnt", caption: translations["numeropares"] ||  "Nº Pares" },
            { dataField: "QtdEnt2", caption: translations["numeroparesentregue"] ||  "Nº Pares Entregue" },
            {
              dataField: "EurPar",
              caption: translations["europar"] || "Eur/Par",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrBrtEntr",
              caption: translations["valorBruto"] || "Vlr Bruto",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrDescEntr",
              caption: translations["valordesc"] || "Vlr Desc.",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrLiqEntr",
              caption: translations["valorLiquido"] || "Vlr Líq.",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
            {
              dataField: "VlrCIvaEntr",
              caption: translations["valorCIva"] ||  "Vlr C/IVA",
              visible: false,
              dataType: "number",
              format: { style: "currency", currency: "EUR" },
            },
          ],
        },

        {
          dataField: "DifValorLiq",
          caption: translations["diferencavalorliq"] || "Dif. Vlr Líq.",
          dataType: "number",
          format: { style: "currency", currency: "EUR" },
        },
      ],
    })
    .dxDataGrid("instance");

  function togglePlanoColumns() {
    const grid = $("#dataGridContainer").dxDataGrid("instance");
    const columnsToToggle = ["MinPar", "Pares", "Tam"];

    grid.beginUpdate();

    columnsToToggle.forEach((column) => {
      const currentVisibility = grid.columnOption(column, "visible");
      grid.columnOption(column, "visible", !currentVisibility);
    });

    grid.endUpdate();
  }

  function toggleReqColumns() {
    const grid = $("#dataGridContainer").dxDataGrid("instance");
    const columnsToToggle = ["RPrec", "VlrBruto", "VlrLiqDescontos"];

    grid.beginUpdate();

    columnsToToggle.forEach((column) => {
      const currentVisibility = grid.columnOption(column, "visible");
      grid.columnOption(column, "visible", !currentVisibility);
    });
    grid.endUpdate();
  }

  function toggleEntColumns() {
    const grid = $("#dataGridContainer").dxDataGrid("instance");
    const columnsToToggle = [
      "NrDiasEntr",
      "EurPar",
      "VlrBrtEntr",
      "VlrDescEntr",
      "VlrLiqEntr",
      "VlrCIvaEntr",
    ];

    grid.beginUpdate();

    columnsToToggle.forEach((column) => {
      const currentVisibility = grid.columnOption(column, "visible");
      grid.columnOption(column, "visible", !currentVisibility);
    });

    grid.endUpdate();
  }

  function criarBotaoGrupo(titulo, idBotao, toggleCallback) {
    return function (header, info) {
      $("<div>")
        .addClass("grupo-toggle")
        .css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          cursor: "pointer",
          fontWeight: "bold",
          gap: "10px",
          paddingRight: "10px",
        })
        .html(
          `
          <span>${titulo}</span>
          <span class="icon bi bi-arrow-right-square-fill" data-id="${idBotao}" style="transition: transform 0.3s;"></span>
        `
        )
        .on("click", function () {
          toggleCallback();
        })
        .appendTo(header);
    };
  }
}
