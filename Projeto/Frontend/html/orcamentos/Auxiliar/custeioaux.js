(() => {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  let dados = null;
  let ano = new Date().getFullYear();
  let touched = false;

  const setSaveEnabled = (on) => $("#btnGuardar").prop("disabled", !on);
  const showEmpty = (on) => $("#emptyState").toggleClass("d-none", !on);

  const pct = (v) => (v == null ? 0 : Number(v));
  const totalPct = (d) =>
    pct(d.pessoal) + pct(d.gerais) + pct(d.amortizacoes) + pct(d.financeiros);

  DevExpress.config({
    editorOptions: {
      valueChangeEvent: "keyup input change",
    },
  });

  function renderChart() {
    const ds = [
      { name: "Pessoal", val: pct(dados?.pessoal) },
      { name: "Gerais", val: pct(dados?.gerais) },
      { name: "Amortizações", val: pct(dados?.amortizacoes) },
      { name: "Financeiros", val: pct(dados?.financeiros) },
    ];
    $("#pieChart").dxPieChart({
      dataSource: ds,
      palette: "Material",
      series: {
        argumentField: "name",
        valueField: "val",
        label: { visible: false },
      },
      legend: {
        visible: true,
        horizontalAlignment: "center",
        verticalAlignment: "bottom",
        itemsAlignment: "center",
      },
      tooltip: {
        enabled: true,
        customizeTooltip: (info) => ({
          text: `${info.argumentText} — ${info.percentText}`,
        }),
      },
      resolveLabelOverlapping: "hide",
      onPointHoverChanged: (e) => {
        e.target.isHovered() ? e.target.showTooltip() : e.target.hideTooltip();
      },
    });
  }

  function markTouched() {
    touched = true;
    setSaveEnabled(true);
  }

  function initForms() {
    // Atualização
    $("#formAtualizacao").dxForm({
      formData: dados,
      labelLocation: "top",
      colCountByScreen: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3 },
      minColWidth: 320,
      items: [
        {
          itemType: "group",
          caption: "MATÉRIAS Incremento",
          colSpan: 1,
          items: [
            {
              dataField: "materias",
              label: { text: "Matérias (%)" },
              editorType: "dxNumberBox",
              editorOptions: {
                min: 0,
                format: "#0.0' %'",
                showSpinButtons: true,
              },
            },
            {
              dataField: "servicos",
              label: { text: "Serviços (%)" },
              editorType: "dxNumberBox",
              editorOptions: {
                min: 0,
                format: "#0.0' %'",
                showSpinButtons: true,
              },
            },
          ],
        },
        {
          itemType: "group",
          caption: "TRANSFORMAÇÃO (€/min)",
          colSpan: 1,
          items: [
            {
              dataField: "cc",
              label: { text: "C&C" },
              editorType: "dxNumberBox",
              editorOptions: {
                min: 0,
                format: "#0.000",
                showSpinButtons: true,
              },
            },
            {
              dataField: "ma",
              label: { text: "M&A" },
              editorType: "dxNumberBox",
              editorOptions: {
                min: 0,
                format: "#0.000",
                showSpinButtons: true,
              },
            },
          ],
        },
        {
          itemType: "group",
          caption: "ESTRUTURA (€/par)",
          colSpan: 1,
          items: [
            {
              dataField: "estrutura",
              label: { text: "Estrutura" },
              editorType: "dxNumberBox",
              editorOptions: { min: 0, format: "#0.00", showSpinButtons: true },
            },
          ],
        },
      ],
      onFieldDataChanged: () => {
        markTouched();
      },
    });

    // Natureza
    $("#formNatureza").dxForm({
      formData: dados,
      labelLocation: "top",
      colCountByScreen: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
      minColWidth: 320,
      items: [
        {
          dataField: "pessoal",
          label: { text: "Pessoal" },
          editorType: "dxNumberBox",
          editorOptions: {
            min: 0,
            max: 100,
            format: "#0.0' %'",
            showSpinButtons: true,
          },
        },
        {
          dataField: "gerais",
          label: { text: "Gerais" },
          editorType: "dxNumberBox",
          editorOptions: {
            min: 0,
            max: 100,
            format: "#0.0' %'",
            showSpinButtons: true,
          },
        },
        {
          dataField: "amortizacoes",
          label: { text: "Amortizações" },
          editorType: "dxNumberBox",
          editorOptions: {
            min: 0,
            max: 100,
            format: "#0.0' %'",
            showSpinButtons: true,
          },
        },
        {
          dataField: "financeiros",
          label: { text: "Financeiros" },
          editorType: "dxNumberBox",
          editorOptions: {
            min: 0,
            max: 100,
            format: "#0.0' %'",
            showSpinButtons: true,
          },
        },
        {
          name: "total",
          colSpan: 1,
          label: { text: "TOTAL" },
          template: () => {
            const t = totalPct(dados).toFixed(1) + "%";
            const ok = totalPct(dados) === 100;
            return $(
              `<div class="fw-bold ${
                ok ? "text-success" : "text-danger"
              }" style="padding:8px">${t}</div>`
            );
          },
        },
      ],
      onFieldDataChanged: () => {
        $("#formNatureza").dxForm("instance").repaint();
        renderChart();
        markTouched();
      },
    });

    // Financeiros
    $("#formFinanceiros").dxForm({
      formData: dados,
      labelLocation: "top",
      colCountByScreen: { xs: 1, sm: 1, md: 2 },
      minColWidth: 320,
      items: [
        {
          dataField: "juro_despesa",
          label: { text: "Taxa (%)" },
          editorType: "dxNumberBox",
          editorOptions: {
            min: 0,
            max: 100,
            format: "#0.0' %'",
            showSpinButtons: true,
          },
        },
      ],
      onFieldDataChanged: markTouched,
    });

    renderChart();
  }

  async function carregar(anoSel) {
    const r = await fetch(`${base}/orcamento-custeio/${anoSel}`);
    if (r.status === 404) {
      dados = null;
      showEmpty(true);
      setSaveEnabled(false);
      DevExpress.ui.notify(
        "Sem registo para este ano. Cria um novo.",
        "warning",
        2500
      );
      return;
    }
    if (!r.ok) {
      DevExpress.ui.notify("Erro ao carregar.", "error", 2500);
      return;
    }
    dados = await r.json();
    ano = dados.Ano;
    $("#anoInput").val(ano);
    showEmpty(false);
    touched = false;
    setSaveEnabled(false);
    initForms();
  }

  async function guardar() {
    if (!dados) return;
    const tot = totalPct(dados);
    if (tot !== 100) {
      DevExpress.ui.notify(
        `TOTAL deve ser 100% (está ${tot.toFixed(1)}%).`,
        "error",
        2500
      );
      return;
    }

    const resp = await fetch(`${base}/orcamento-custeio/${dados.codigo}`, {
      method: "PUT",
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
  }

  async function criarAno() {
    const anoSel = Number($("#anoInput").val());
    if (!anoSel) return;
    const conf = await DevExpress.ui.dialog.confirm(
      `Criar orçamento de ${
        anoSel + 1
      }? Se existir ${anoSel}, os valores serão copiados.`,
      "Criar ano"
    );
    if (!conf) return;

    const resp = await fetch(`${base}/orcamento-custeio`, {
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

  $(function () {
    DevExpress.localization.locale("pt");
    $("#anoInput").val(ano);
    $("#btnCarregar").on("click", () => carregar(Number($("#anoInput").val())));
    $("#btnGuardar").on("click", guardar);
    $("#btnCriar").on("click", criarAno);
    carregar(ano);
  });
})();
