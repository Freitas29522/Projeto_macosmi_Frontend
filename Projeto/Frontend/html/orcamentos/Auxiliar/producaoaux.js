(() => {
  const api =
    window.APP_CONFIG.API_BASE_URL +
    window.APP_CONFIG.API_PATH +
    "/orcamento-producao";
  let dados = null; // entidade editável (jancc, fevcc, …; janma, …; mediacc, mediama, custo_cc, custo_ma)
  let detalhe = null; // DTO de /detalhe/{ano} -> inclui dias e totais
  let ano = new Date().getFullYear();
  let touched = false;

  const setSaveEnabled = (on) => $("#btnGuardar").prop("disabled", !on);
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const mKey = {
    Jan: "jan",
    Fev: "fev",
    Mar: "mar",
    Abr: "abr",
    Mai: "mai",
    Jun: "jun",
    Jul: "jul",
    Ago: "ago",
    Set: "sete",
    Out: "outu",
    Nov: "nov",
    Dez: "dez",
  };

  function markTouched() {
    touched = true;
    setSaveEnabled(true);
  }

  // ===== Helpers de mapeamento
  const getMesVal = (obj, base, mes) => obj[(mKey[mes] + base).toLowerCase()];
  const setMesVal = (obj, base, mes, v) =>
    (obj[(mKey[mes] + base).toLowerCase()] = Number(v) || 0);

  // ====== GRID 1: Capacidades Máximas (pares/dia)
  function buildCapData() {
    const rowCC = { Rubrica: "PRODUÇÃO INTERNA — (C&C)" };
    const rowMA = { Rubrica: "PRODUÇÃO INTERNA — (M&A)" };
    const rowIE = { Rubrica: "PRODUÇÃO INTERNA — (IE)" };
    /* const rowTOT = {
      Rubrica: "PRODUÇÃO TOTAL PRODUTOS ACABADOS",
      _total: true,
    }; */

    meses.forEach((m) => {
      rowCC[m] = getMesVal(dados, "cc", m);
      rowMA[m] = getMesVal(dados, "ma", m);
      rowIE[m] = getMesVal(dados, "ie", m);
      // No teu modelo total de acabados segue a M&A (acabamento = saída final)
      /* rowTOT[m] = rowIE[m] */
    });

    return [rowCC, rowMA, rowIE, /* rowTOT */];
  }

  function initGridCapacidade() {
    const ds = buildCapData();

    $("#gridCapacidade").dxDataGrid({
      dataSource: ds,
      keyExpr: "Rubrica",
      showBorders: true,
      columnAutoWidth: true,
      repaintChangesOnly: true,
      rowAlternationEnabled: true,
      editing: { mode: "cell", allowUpdating: true },
      columns: [
        {
          dataField: "Rubrica",
          caption: "Rubricas",
          allowEditing: false,
          width: 320,
          cellTemplate: (c, v) => {
            const el = $("<div>").text(v.value);
            if (v.data._total) el.addClass("total-row");
            c.append(el);
          },
        },
        ...meses.map((m) => ({
          dataField: m,
          caption: m,
          dataType: "number",
          format: "#0",
          alignment: "right",
          allowEditing: (r) => !r.row.data._total,
          cssClass: "text-end",
        })),
      ],
      onCellPrepared: (e) => {
        if (e.data && e.data._total) e.cellElement.addClass("total-row");
      },
      onRowUpdated: (e) => {
        const rubrica = e.data.Rubrica;
        // gravar nos campos do modelo
        meses.forEach((m) => {
          if (rubrica.includes("(C&C)")) {
            setMesVal(dados, "cc", m, e.data[m]);
          }
          if (rubrica.includes("(M&A)")) {
            setMesVal(dados, "ma", m, e.data[m]);
          }
          if (rubrica.includes("(IE)")) {
            setMesVal(dados, "ie", m, e.data[m]);
          }
        });
        // recalcula linha TOTAL = M&A
        const grid = e.component;
        const data = grid.option("dataSource");
        data[2] = buildCapData()[2];
        grid.option("dataSource", data);
        refreshProducao(); // atualiza a 2ª tabela
        markTouched();
      },
    });
  }

  // ====== GRID 2: Produção Máxima no Ano (pares)
  function buildProdData() {
    // linha dias (calendário)
    const dias = { Rubrica: "Dias de Trabalho (calendário)", _dias: true };
    meses.forEach((m) => (dias[m] = detalhe?.Calendario?.[0]?.[m] ?? 0));

    // produção = capacidade × dias
    const cc = { Rubrica: "PRODUÇÃO INTERNA — (C&C)" };
    const ma = { Rubrica: "PRODUÇÃO INTERNA — (M&A)" };
    const tot = { Rubrica: "PRODUÇÃO TOTAL PRODUTOS ACABADOS", _total: true };

    meses.forEach((m) => {
      const c = getMesVal(dados, "cc", m) || 0;
      const a = getMesVal(dados, "ma", m) || 0;
      const i = getMesVal(dados, "ie", m) || 0;
      const d = dias[m] || 0;

      cc[m] = c * d || 0;
      ma[m] = a * d || 0;
      tot[m] = i * d || 0;
    });

    // coluna ANO (somas)
    const acum = (obj) => meses.reduce((s, m) => s + (obj[m] || 0), 0);
    dias.ANO = meses.reduce((s, m) => s + (dias[m] || 0), 0);
    cc.ANO = acum(cc);
    ma.ANO = acum(ma);
    tot.ANO = acum(tot);

    return [dias, cc, ma, tot];
  }

  function refreshProducao() {
    const ds = buildProdData();
    const grid = $("#gridProducao").dxDataGrid("instance");
    if (grid) grid.option("dataSource", ds);
  }

  function initGridProducao() {
    const ds = buildProdData();

    $("#gridProducao").dxDataGrid({
      dataSource: ds,
      keyExpr: "Rubrica",
      showBorders: true,
      columnAutoWidth: true,
      rowAlternationEnabled: true,
      editing: { mode: "cell", allowUpdating: false },
      columns: [
        {
          dataField: "Rubrica",
          caption: "Rubricas",
          width: 320,
          cellTemplate: (c, v) => {
            const el = $("<div>").text(v.value);
            if (v.data._total) el.addClass("total-row");
            c.append(el);
          },
        },
        ...meses.map((m) => ({
          dataField: m,
          caption: m,
          dataType: "number",
          format: "#0",
          alignment: "right",
          cssClass: "text-end",
        })),
        {
          dataField: "ANO",
          caption: "ANO",
          dataType: "number",
          format: "#0",
          alignment: "right",
          cssClass: "text-end",
          width: 110,
        },
      ],
      onCellPrepared: (e) => {
        if (e.data && (e.data._total || e.data._dias))
          e.cellElement.addClass(e.data._total ? "total-row" : "");
      },
    });
  }

  // ====== Custos Subcontratação
  function initFormCustos() {
    $("#formCustos").dxForm({
      formData: dados,
      labelLocation: "top",
      colCountByScreen: { xs: 1, sm: 2 },
      minColWidth: 220,
      items: [
        {
          dataField: "mediacc",
          label: { text: "Corte & Costura (C&C)" },
          editorType: "dxNumberBox",
          editorOptions: { min: 0, format: "#0.00' €'", showSpinButtons: true },
        },
        {
          dataField: "mediama",
          label: { text: "Montagem & Acabamento (M&A)" },
          editorType: "dxNumberBox",
          editorOptions: { min: 0, format: "#0.00' €'", showSpinButtons: true },
        },
      ],
      onFieldDataChanged: markTouched,
    });
  }

  // ====== IO
  async function carregar(anoSel) {
    // entidade
    let r = await fetch(`${api}/${anoSel}`);
    if (r.status === 404) {
      dados = { Ano: anoSel };
      setSaveEnabled(false);
      DevExpress.ui.notify(
        "Sem registo para este ano. Cria um novo.",
        "warning",
        2500
      );
    } else if (!r.ok) {
      DevExpress.ui.notify("Erro ao carregar.", "error", 2500);
      return;
    } else {
      dados = await r.json();
    }

    // detalhe (dias + totais)
    let d = await fetch(`${api}/detalhe/${anoSel}`);
    detalhe = d.ok ? await d.json() : null;

    ano = anoSel;
    $("#anoInput").val(ano);
    touched = false;
    setSaveEnabled(false);

    initGridCapacidade();
    initGridProducao();
    initFormCustos();
  }

  async function guardar() {
    if (!dados) return;

    // garantir que a grid grava as edições pendentes
    const gridCap = $("#gridCapacidade").dxDataGrid("instance");
    if (gridCap) {
      await gridCap.saveEditData();
    }


    const isUpdate = !!dados.codigo;
    const resp = await fetch(`${api}${isUpdate ? "/" + dados.codigo : ""}`, {
      method: isUpdate ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    if (!resp.ok) {
      DevExpress.ui.notify(
        (await resp.text()) || "Erro a gravar.",
        "error",
        3000
      );
      return;
    }
    dados = await resp.json();
    touched = false;
    setSaveEnabled(false);
    DevExpress.ui.notify("Guardado com sucesso.", "success", 2000);

    // atualizar totals
    const d = await fetch(`${api}/detalhe/${dados.Ano}`);
    detalhe = d.ok ? await d.json() : null;
    refreshProducao();
  }

  async function criarAno() {
    const anoSel = Number($("#anoInput").val());
    if (!anoSel) return;
    const conf = await DevExpress.ui.dialog.confirm(
      `Criar produção de ${anoSel}? Se existir ${
        anoSel - 1
      }, os valores serão copiados.`,
      "Criar ano"
    );
    if (!conf) return;

    const resp = await fetch(`${api}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Ano: anoSel }),
    });
    if (!resp.ok) {
      DevExpress.ui.notify(
        (await resp.text()) || "Falha ao criar.",
        "error",
        3000
      );
      return;
    }
    DevExpress.ui.notify("Ano criado.", "success", 1500);
    await carregar(anoSel);
  }

  // boot
  $(function () {
    DevExpress.localization.locale("pt");
    $("#anoInput").val(ano);
    $("#btnCarregar").on("click", () => carregar(Number($("#anoInput").val())));
    $("#btnGuardar").on("click", guardar);
    $("#btnCriar").on("click", criarAno);
    carregar(ano);
  });
})();
