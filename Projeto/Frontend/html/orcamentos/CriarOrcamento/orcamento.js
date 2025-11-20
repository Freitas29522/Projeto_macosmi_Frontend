(() => {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  const api = `${base}/orcamento`;
  const apiClientes = `${base}/Clientes`;
  const apiAmostras = `${base}/amostras`;

  DevExpress.localization.locale("pt");

  // ano selecionado
  let anoSelecionado = new Date().getFullYear();

  // ---------- Stores remotos (com pesquisa) ----------
  const clientesStore = DevExpress.data.AspNet.createStore({
    key: "Cod",
    loadUrl: apiClientes,
  });

  const amostrasStore = DevExpress.data.AspNet.createStore({
    key: "CodigoReferencia",
    loadUrl: apiAmostras,
  });

  // ---------- Helpers de editores com grid dentro ----------
  function clienteEditorOptions(e) {
    return {
      valueExpr: "Cod",
      displayExpr: (item) => {
        if (!item) return "";
        if (item.Sigla && item.Sigla.trim() !== "") {
          return `${item.Cod} — ${item.Sigla}`;
        }
        return `${item.Cod} — ${item.Nome}`;
      },
      showClearButton: true,
      deferRendering: true,
      dropDownOptions: { width: 600 },
      dataSource: clientesStore,
      contentTemplate: (dd) => {
        const $grid = $("<div>").appendTo(dd.component.content());
        $grid.dxDataGrid({
          dataSource: {
            store: clientesStore,
            paginate: true,
            pageSize: 20,
          },
          remoteOperations: true,
          scrolling: { mode: "virtual" },
          paging: { pageSize: 20 },
          pager: { visible: false },
          height: 300,
          searchPanel: {
            visible: true,
            placeholder: "Procurar código, nome ou sigla…",
          },
          columns: [
            { dataField: "Cod", caption: "Código", width: 120 },
            { dataField: "Nome", caption: "Nome" },
            { dataField: "Sigla", caption: "Sigla", width: 100 },
            { dataField: "Pais", caption: "País", width: 100 },
          ],
          selection: { mode: "single" },
          onSelectionChanged: (ev) => {
            const row = ev.selectedRowsData[0];
            if (!row) return;
            dd.component.option("value", row.Cod);
            dd.component.close();
          },
        });
        return $grid;
      },
    };
  }

  function amostraEditorOptions(e) {
    return {
      valueExpr: "CodigoReferencia",
      displayExpr: (item) => (item ? `${item.CodigoReferencia}` : ""),
      showClearButton: true,
      deferRendering: true,
      dropDownOptions: { width: 760 },
      dataSource: amostrasStore,
      contentTemplate: (dd) => {
        const $grid = $("<div>").appendTo(dd.component.content());
        $grid.dxDataGrid({
          dataSource: {
            store: amostrasStore,
            paginate: true,
            pageSize: 20,
          },
          remoteOperations: true,
          scrolling: { mode: "virtual" },
          paging: { pageSize: 20 },
          pager: { visible: false },
          height: 340,
          searchPanel: {
            visible: true,
            placeholder: "Procurar ref. ou descritivo…",
          },
          columns: [
            {
              dataField: "CodigoReferencia",
              caption: "Referência",
              width: 160,
            },
            { dataField: "Descritivo", caption: "Artigo / Descritivo" },
            { dataField: "Estacao", caption: "Estação", width: 120 },
            {
              dataField: "Preco",
              caption: "PMV",
              dataType: "number",
              format: { type: "currency", currency: "EUR", precision: 2 },
              width: 120,
              alignment: "right",
            },
          ],
          selection: { mode: "single" },
          onSelectionChanged: (ev) => {
            const row = ev.selectedRowsData[0];
            if (!row) return;
            dd.component.option("value", row.CodigoReferencia);
            dd.component.close();

            const dg = $("#dataGridContainer").dxDataGrid("instance");
            const idx = e.row?.rowIndex ?? dg.getRowIndexByKey(e.row?.key);
            if (idx >= 0) {
              dg.cellValue(idx, "artigo", row.Descritivo);
              dg.cellValue(idx, "estacao", row.Estacao);
              dg.cellValue(idx, "pmv", Number(row.Preco));
            }
          },
        });
        return $grid;
      },
    };
  }

  // ---------- DataSource do grid ----------
  const store = new DevExpress.data.CustomStore({
    key: "codigo",

    // carrega só o ano selecionado
    load: () => {
      if (!anoSelecionado) return [];
      return fetch(`${api}/ano/${encodeURIComponent(anoSelecionado)}`).then(
        async (r) => {
          if (!r.ok) throw new Error(await r.text());
          return r.json();
        }
      );
    },

    byKey: (key) =>
      fetch(`${api}/${encodeURIComponent(key)}`).then((r) => r.json()),

    insert: (values) => {
      if (!anoSelecionado) {
        return Promise.reject(
          new Error("Seleciona primeiro um ano no topo da página.")
        );
      }

      // garante que o AnoReferente vai para o backend
      const payload = Object.assign({}, values, {
        AnoReferente: anoSelecionado,
      });

      return fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      });
    },

    update: (key, values) =>
      fetch(`${api}/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({ codigo: key }, values)),
      }).then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      }),

    remove: (key) =>
      fetch(`${api}/${encodeURIComponent(key)}`, { method: "DELETE" }).then(
        async (r) => {
          if (!r.ok) throw new Error(await r.text());
          return true;
        }
      ),
  });

  // ---------- Grid ----------
  const grid = $("#dataGridContainer")
    .dxDataGrid({
      dataSource: store,
      height: "100%",
      width: "100%",
      showBorders: true,
      rowAlternationEnabled: true,
      hoverStateEnabled: true,

      columnAutoWidth: false,
      allowColumnResizing: true,
      columnResizingMode: "widget",
      columnHidingEnabled: true,
      columnMinWidth: 110,
      wordWrapEnabled: true,

      scrolling: {
        mode: "virtual",
        rowRenderingMode: "virtual",
        columnRenderingMode: "virtual",
        showScrollbar: "always",
        useNative: "auto",
      },
      paging: { pageSize: 10 },
      pager: {
        showInfo: true,
        showPageSizeSelector: true,
        allowedPageSizes: [10, 20, 50],
      },
      filterRow: { visible: true },
      sorting: { mode: "multiple" },
      editing: {
        mode: "row",
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        useIcons: true,
      },
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items = e.toolbarOptions.items.filter(
          (it) => it.name !== "addRowButton"
        );
      },
      onInitialized: function (e) {
        const $card = $("#dataGridContainer").closest(".card");
        const $hdr = $card.find(".card-header");
        if (!$hdr.length) return;

        // já tens o botão de criar orçamento no header
        const $btn = $(`
          <button id="btnCriarOrc" class="btn btn-primary btn-sm ms-2">
            <i class="bi bi-plus-circle me-1"></i>Criar orçamento
          </button>
        `);

        $btn.on("click", () => e.component.addRow());
        $hdr.append($btn);
      },

      onRowUpdating: function (e) {
        e.newData = Object.assign({}, e.oldData, e.newData);
      },

      onSaving: (e) => {
        const norm = (o) => {
          if (!o) return;
          if (o.pmv != null) {
            o.pmv = Number(
              String(o.pmv)
                .replace(/[^\d.-]/g, "")
                .replace(",", ".")
            );
            if (!isFinite(o.pmv)) o.pmv = 0;
          }
        };
        norm(e.newData);
        if (e.changes && e.changes[0]) norm(e.changes[0].data);
      },

      columns: [
        {
          dataField: "cliente",
          caption: "Marca",
          width: "18%",
          minWidth: 160,
          hidingPriority: 6,
          editCellTemplate: (cellElement, cellInfo) => {
            $("<div>")
              .dxDropDownBox(
                Object.assign(clienteEditorOptions(cellInfo), {
                  value: cellInfo.value,
                  onValueChanged: (ev) => cellInfo.setValue(ev.value),
                })
              )
              .appendTo(cellElement);
          },
          calculateDisplayValue: (row) => {
            if (!row?.cliente) return "";

            // 1º tenta sigla
            if (row.ClienteSigla && row.ClienteSigla.trim() !== "") {
              return `${row.cliente} — ${row.ClienteSigla}`;
            }

            // se não tiver sigla, cai para o nome
            if (row.ClienteNome && row.ClienteNome.trim() !== "") {
              return `${row.cliente} — ${row.ClienteNome}`;
            }

            // fallback
            return row.cliente;
          },
        },
        {
          dataField: "referencia",
          caption: "Refª Repr",
          width: "15%",
          minWidth: 150,
          hidingPriority: 2,
          editCellTemplate: (cellElement, cellInfo) => {
            $("<div>")
              .dxDropDownBox(
                Object.assign(amostraEditorOptions(cellInfo), {
                  value: cellInfo.value,
                  onValueChanged: (ev) => cellInfo.setValue(ev.value),
                })
              )
              .appendTo(cellElement);
          },
          cellTemplate: (cell, info) => {
            const val = info.value || "";
            cell.append(
              val
                ? $("<span>").addClass("ref-link").text(val)
                : document.createTextNode("")
            );
          },
          setCellValue: async (newData, value) => {
            newData.referencia = value;
            if (!value) return;
            try {
              const arr = await amostrasStore.load({ searchValue: value });
              const m = arr.find((a) => a.CodigoReferencia === value);
              if (m) {
                newData.artigo = m.Descritivo;
                newData.estacao = m.Estacao;
                newData.pmv = m.Preco;
              }
            } catch {}
          },
        },
        {
          dataField: "artigo",
          caption: "Artigo",
          width: "20%",
          minWidth: 160,
          hidingPriority: 5,
          validationRules: [{ type: "required" }],
        },
        {
          dataField: "estacao",
          caption: "Estação",
          width: "8%",
          minWidth: 110,
          alignment: "center",
          hidingPriority: 4,
        },
        {
          caption: "Datas",
          alignment: "center",
          hidingPriority: 7,
          columns: [
            {
              dataField: "data_rececao",
              caption: "Receção",
              dataType: "date",
              width: "11%",
              minWidth: 120,
              editorOptions: { displayFormat: "dd/MM/yyyy" },
            },
            {
              dataField: "data_entrega",
              caption: "Entrega",
              dataType: "date",
              width: "11%",
              minWidth: 120,
              editorOptions: { displayFormat: "dd/MM/yyyy" },
            },
          ],
        },
        {
          dataField: "pares",
          caption: "Pares",
          width: "7%",
          minWidth: 100,
          alignment: "right",
          format: { type: "fixedPoint", precision: 0 },
          hidingPriority: 3,
        },
        {
          dataField: "Stock",
          caption: "Stock",
          width: "7%",
          minWidth: 90,
          alignment: "right",
          dataType: "number",
          format: { type: "fixedPoint", precision: 0 },
          hidingPriority: 3,
        },
        {
          dataField: "pmv",
          caption: "PMV",
          width: "10%",
          minWidth: 120,
          alignment: "right",
          dataType: "number",
          format: { type: "currency", precision: 2, currency: "EUR" },
          editorOptions: { format: "#,##0.00' €'" },
          hidingPriority: 1,
        },
      ],
    })
    .dxDataGrid("instance");

  // ---------- handlers do ano ----------
  $(function () {
    $("#anoInput").val(anoSelecionado);

    $("#btnCarregar").on("click", () => {
      const val = Number($("#anoInput").val());
      if (!val) return;
      anoSelecionado = val;
      grid.getDataSource().reload();
    });

    // carrega logo o ano atual ao entrar
    grid.getDataSource().reload();
  });
})();
