(function () {
  // --- Calendário Laboral em Popup (DevExtreme) ------------------------------
  window.abrirtabelacalendario = function (anoInicial) {
    const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
    const ANO_DEFAULT = typeof anoInicial === "number" ? anoInicial : new Date().getFullYear();

    // garante que existe o container
    let $host = $("#popup-calendario");
    if ($host.length === 0) {
      $("body").append('<div id="popup-calendario" style="display:none"></div>');
      $host = $("#popup-calendario");
    }

    // cria (ou reusa) o popup
    let popup = $host.data("dxPopup");
    if (!popup) {
      $host.dxPopup({
        title: "Calendário",
        visible: false,
        showCloseButton: true,
        dragEnabled: true,
        width: () => Math.min(window.innerWidth * 0.95, 1100),
        height: () => Math.min(window.innerHeight * 0.85, 700),
        contentTemplate: (contentEl) => {
          const html = `
            <div class="p-2">
              <div class="d-flex align-items-center gap-2 mb-2" style="flex-wrap: wrap">
                <label for="cal-ano" class="form-label mb-0">Ano</label>
                <input id="cal-ano" type="number" class="form-control form-control-sm" style="width: 100px" min="2000" max="2100" />
                <button id="cal-btn" class="btn btn-primary btn-sm">Carregar</button>
              </div>
              <div id="cal-grid"></div>
            </div>`;
          contentEl.append(html);
        },
        toolbarItems: [
          { widget: "dxButton", toolbar: "bottom", location: "after",
            options: { text: "Fechar", onClick: () => $host.dxPopup("instance").hide() } }
        ],
        onShown: () => {
          $("#cal-ano").val(ANO_DEFAULT);
          carregarGridCalendario(ANO_DEFAULT);
          $("#cal-btn").off("click").on("click", () => {
            const ano = parseInt($("#cal-ano").val(), 10) || ANO_DEFAULT;
            carregarGridCalendario(ano);
          });
        }
      });
      popup = $host.data("dxPopup");
    }

    popup.show();

    function carregarGridCalendario(ano) {
      const url = `${base}/calendario/${ano}`;

      const store = new DevExpress.data.CustomStore({
        key: "rubrica",
        loadMode: "raw",
        load: () =>
          fetch(url)
            .then(r => {
              if (!r.ok) throw new Error("Falha ao obter calendário.");
              return r.json();
            })
            .then(data => {
              if (!Array.isArray(data)) data = [data];
              return data;
            })
      });

      const $grid = $("#cal-grid");
      if ($grid.data("dxDataGrid")) $grid.dxDataGrid("dispose");

      $grid.dxDataGrid({
        dataSource: store,
        showBorders: true,
        height: "calc(100% - 40px)",
        columnAutoWidth: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        sorting: { mode: "none" },
        paging: { enabled: false },
        selection: { mode: "single" },
        hoverStateEnabled: true,
        columns: [
          {
            dataField: "rubrica",
            caption: "Rubricas",
            width: 210,
            cellTemplate: (container, info) => {
              const map = {
                "DC": "Dias de Calendário",
                "DD": "Dias de Descanso",
                "FDu": "Feriados (dias úteis)",
                "FRu": "Férias (dias úteis)",
                "DT": "Dias de Trabalho"
              };
              $("<div>").text(map[info.value] || info.value).appendTo(container);
            },
            fixed: true
          },
          { dataField: "Jan", caption: "Jan", alignment: "center" },
          { dataField: "Fev", caption: "Fev", alignment: "center" },
          { dataField: "Mar", caption: "Mar", alignment: "center" },
          { dataField: "Abr", caption: "Abr", alignment: "center" },
          { dataField: "Mai", caption: "Mai", alignment: "center" },
          { dataField: "Jun", caption: "Jun", alignment: "center" },
          { dataField: "Jul", caption: "Jul", alignment: "center" },
          { dataField: "Ago", caption: "Ago", alignment: "center" },
          { dataField: "Set", caption: "Set", alignment: "center" },
          { dataField: "Out", caption: "Out", alignment: "center" },
          { dataField: "Nov", caption: "Nov", alignment: "center" },
          { dataField: "Dez", caption: "Dez", alignment: "center" },
          { dataField: "TOTAL", caption: "TOTAL", alignment: "center", cssClass: "col-total" }
        ],
        onRowPrepared: (e) => {
          if (e.rowType !== "data") return;
          const r = e.data?.rubrica;
          if (r === "DT") {
            e.rowElement.css({ background: "#eaf4e5", fontWeight: "600" });
          } else if (r === "DC") {
            e.rowElement.css({ background: "#f5f8ff" });
          } else {
            e.rowElement.css({ background: "#f6f9fc" });
          }
        },
        onCellPrepared: (e) => {
          if (e.rowType === "data" && typeof e.value === "number") {
            if (e.column.dataField !== "TOTAL") {
              e.cellElement.css({ color: "#1e66f5", fontWeight: 600 });
            } else {
              e.cellElement.css({ fontWeight: 700 });
            }
          }
          if (e.column && e.column.cssClass === "col-total") {
            e.cellElement.css({ background: "#eaeaea" });
          }
        }
      });
    }
  };
})();
