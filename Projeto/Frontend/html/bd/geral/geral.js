function carregarGraficoFaturacaoNoGeral({
  ano = 2025,
  tp = "F1",
  agrupamento = "mes",
  targetId = "#grafico1",
  valueField = "TotalPares",
  nomeSerie = "Total de Pares",
  isCurrency = false,
  barColor = "#2563EB",
} = {}) {
  if (!window.APP_CONFIG) {
    console.error("APP_CONFIG não está definido. Confirma o config.js.");
    return;
  }

  const baseUrl = (window.APP_CONFIG.API_BASE_URL || "").replace(/\/$/, "");
  const apiPath = (window.APP_CONFIG.API_PATH || "").replace(/^\/?/, "/");
  const base = baseUrl + apiPath;

  const token = localStorage.getItem("token");

  const argumentField =
    agrupamento === "cliente"
      ? "NomeCliente"
      : agrupamento === "mes"
      ? "MesNumero"
      : agrupamento === "quadrimestre"
      ? "NomeQuadrimestre"
      : agrupamento === "pais"
      ? "NomePais"
      : agrupamento === "estacaoano"
      ? "EstacaoAno"
      : agrupamento === "estacao"
      ? "Estacao"
      : agrupamento === "tipodoc"
      ? "TipoDocumento"
      : "NomeCliente";

  $(targetId).empty();

  const $lp = $("<div>").appendTo(targetId);
  const lpInstance = $lp
    .dxLoadPanel({
      visible: true,
      shading: false,
      message: "A carregar...",
    })
    .dxLoadPanel("instance");

  $.ajax({
    url: `${base}/FaturacaoResumo?ano=${ano}&tp=${tp}&groupBy=${agrupamento}`,
    method: "GET",
    headers: token ? { Authorization: "Bearer " + token } : {},
  })
    .done(function (data) {
      lpInstance.dispose();
      $lp.remove();

      if (!Array.isArray(data) || data.length === 0) {
        $(targetId).html(
          `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
             Sem dados
           </div>`
        );
        return;
      }

      // Criar gráfico
      $(targetId).dxChart({
        dataSource: data,
        series: {
          argumentField: argumentField,
          valueField: valueField,
          name: nomeSerie,
          type: "bar",
          color: barColor,},
        title:
          nomeSerie +
          " por " +
          (agrupamento === "mes"
            ? "Mês"
            : agrupamento.charAt(0).toUpperCase() + agrupamento.slice(1)),
        argumentAxis: {
          label: {
            rotationAngle: 45,
            overlappingBehavior: "rotate",
          },
        },
        valueAxis: {
          label: {
            format: isCurrency
              ? { type: "currency", currency: "EUR", precision: 0 }
              : { type: "fixedPoint", precision: 0 },
          },
        },
        tooltip: {
          enabled: true,
          format: isCurrency
            ? { type: "currency", currency: "EUR", precision: 2 }
            : { type: "fixedPoint", precision: 0 },
        },
        legend: {
          verticalAlignment: "bottom",
          horizontalAlignment: "center",
        },
      });
    })
    .fail(function (xhr) {
      lpInstance.dispose();
      $lp.remove();

      console.error("Erro no request:", xhr.status, xhr.responseText);

      $(targetId).html(
        `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
           Erro ao carregar gráfico
         </div>`
      );
    });
}

function carregarGraficoParesPorMesTotal({
  ano = 2025,
  targetId = "#grafico3",
} = {}) {
  const baseUrl = (window.APP_CONFIG.API_BASE_URL || "").replace(/\/$/, "");
  const apiPath = (window.APP_CONFIG.API_PATH || "").replace(/^\/?/, "/");
  const base = baseUrl + apiPath;

  const token = localStorage.getItem("token");

  $(targetId).empty();

  $.ajax({
    url: `${base}/ProducaoTotalResumo?ano=${ano}&groupBy=mes`,
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
    .done(function (data) {
      if (!Array.isArray(data) || data.length === 0) {
        $(targetId).html(
          `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
            Sem dados
          </div>`
        );
        return;
      }

      const nomesMeses = [
        "",
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

      const chartData = data
        .map((r) => ({
          MesNumero: r.MesNumero,
          MesNome: nomesMeses[r.MesNumero] ?? String(r.MesNumero),
          TotalPares:
            (r.PrtCort || 0) +
            (r.PrtCost || 0) +
            (r.PrtMont || 0) +
            (r.PrtAcab || 0),
        }))
        .sort((a, b) => a.MesNumero - b.MesNumero);

      $(targetId).dxChart({
        dataSource: chartData,
        title: "Pares por Mês",
        series: {
          argumentField: "MesNome",
          valueField: "TotalPares",
          type: "bar",
          color: "#0d6efd",
        },
        valueAxis: {
          label: { format: { type: "fixedPoint", precision: 0 } },
        },
        tooltip: {
          enabled: true,
          format: { type: "fixedPoint", precision: 0 },
        },
        legend: { visible: false },
      });
    })
    .fail(function (xhr) {
      console.error("Erro ao carregar gráfico:", xhr.status, xhr.responseText);
      $(targetId).html(
        `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
          Erro ao carregar gráfico
        </div>`
      );
    });
}

// Renderizar mapa por cliente
function initMapaClientesPorPais({
  targetId = "#grafico4",
} = {}) {
  if (!window.APP_CONFIG) {
    console.error("APP_CONFIG não está definido.");
    return;
  }

  const baseUrl = (window.APP_CONFIG.API_BASE_URL || "").replace(/\/$/, "");
  const apiPath = (window.APP_CONFIG.API_PATH || "").replace(/^\/?/, "/");
  const base = baseUrl + apiPath;

  const token = localStorage.getItem("token");

  const mapaFontes = {
    all: { source: DevExpress.viz.map.sources.world },
    Europe: {
      source: DevExpress.viz.map.sources.europe,
      bounds: [-10, 75, 40, 30],
    },
    Africa: {
      source: DevExpress.viz.map.sources.africa,
      bounds: [-20, 40, 55, -35],
    },
    Asia: {
      source: DevExpress.viz.map.sources.world,
      bounds: [25, 85, 180, -10],
    },
    "North America": {
      source: DevExpress.viz.map.sources.world,
      bounds: [-170, 85, -30, 10],
    },
    "South America": {
      source: DevExpress.viz.map.sources.world,
      bounds: [-85, 15, -30, -60],
    },
    Oceania: {
      source: DevExpress.viz.map.sources.world,
      bounds: [110, 0, 180, -50],
    },
  };

  $(targetId).empty();

  const $lp = $("<div>").appendTo(targetId);
  const lp = $lp
    .dxLoadPanel({ visible: true, shading: false, message: "A carregar..." })
    .dxLoadPanel("instance");

  $.ajax({
    url: `${base}/ClientesPais`,
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
    .done(function (clientesPorPais) {
      lp.dispose();
      $lp.remove();

      const instance = $(targetId)
        .dxVectorMap({
          layers: {
            name: "areas",
            dataSource: mapaFontes.all.source,
            colorGroups: [1, 5, 10, 50, 100, 200, 500],
            palette: [
              "#FEF3C7",
              "#FDE68A",
              "#FCD34D",
              "#F59E0B",
              "#D97706",
              "#B45309",
              "#92400E",
            ],

            colorGroupingField: "clientes",
            label: { enabled: true, dataField: "name" },
            customize(elements) {
              $.each(elements, (_, el) => {
                const code = el.attribute("iso_a2");
                const total =
                  clientesPorPais && clientesPorPais[code]
                    ? clientesPorPais[code]
                    : 0;
                el.attribute("clientes", total);
              });
            },
          },
          legends: [
            {
              source: { layer: "areas", grouping: "color" },
              customizeText(arg) {
                return `${arg.start} a ${arg.end} clientes`;
              },
            },
          ],
          tooltip: {
            enabled: true,
            contentTemplate(info, container) {
              const name = info.attribute("name");
              const total = info.attribute("clientes");
              if (total > 0) {
                $("<div>")
                  .append(`<h4 style="margin:0 0 6px 0;">${name}</h4>`)
                  .append(`<div><b>Total de clientes:</b> ${total}</div>`)
                  .appendTo(container);
              } else {
                container.empty();
              }
            },
          },
        })
        .dxVectorMap("instance");

      $("#continente-select")
        .off("change.mapaClientes")
        .on("change.mapaClientes", function () {
          const key = $(this).val();
          const fonte = mapaFontes[key] || mapaFontes.all;

          instance.option("layers.dataSource", fonte.source);
          if (fonte.bounds) instance.viewport(fonte.bounds);
        });
    })
    .fail(function (xhr) {
      lp.dispose();
      $lp.remove();
      console.error("Erro ao carregar mapa:", xhr.status, xhr.responseText);

      $(targetId).html(
        `<div class="h-100 d-grid" style="place-items:center;opacity:.7;font-weight:600;">
          Erro ao carregar mapa
        </div>`
      );
    });
}

function initTop10PaisesClientes({ targetId = "#grafico5" } = {}) {
  const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;
  const token = localStorage.getItem("token");

  $(targetId).empty();

  $.ajax({
    url: `${base}/ClientesPais`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).done(function (dados) {

    const countryNames = DevExpress.viz.map.sources.world.features.reduce((acc, f) => {
      acc[f.properties.iso_a2] = f.properties.name;
      return acc;
    }, {});

    const top10 = Object.entries(dados)
      .map(([code, total]) => ({
        Pais: countryNames[code] || code,
        Total: total
      }))
      .sort((a, b) => b.Total - a.Total)
      .slice(0, 10)
      .reverse(); // para ficar bonito no gráfico horizontal

    $(targetId).dxChart({
      dataSource: top10,
      rotated: true,
      title: "Top 10 Países por Clientes",
      series: {
        argumentField: "Pais",
        valueField: "Total",
        type: "bar",
        color: "#F59E0B"
      },
      tooltip: {
        enabled: true,
        format: { type: "fixedPoint", precision: 0 }
      },
      valueAxis: {
        label: { format: { type: "fixedPoint", precision: 0 } }
      },
      legend: { visible: false }
    });
  });
}

function carregarKPIsGerais() {
  const base = getBaseApi();

  // Quando ligares endpoints, trocas estas URLs 👇
  const endpoints = {
    faturacao: `${base}/KPI/FaturacaoMes`,
    pares: `${base}/KPI/ParesMes`,
    clientes: `${base}/KPI/NovosClientesMes`,
    encomendas: `${base}/KPI/EncomendasMes`
  };

  $("#kpi-faturacao").text("—");
  $("#kpi-pares").text("—");
  $("#kpi-clientes").text("—");
  $("#kpi-encomendas").text("—");

  // PRONTO para ligar APIs mais tarde 👇
  /*
  $.getJSON(endpoints.faturacao, r => $("#kpi-faturacao").text(r.valor + " €"));
  $.getJSON(endpoints.pares, r => $("#kpi-pares").text(r.valor));
  $.getJSON(endpoints.clientes, r => $("#kpi-clientes").text(r.valor));
  $.getJSON(endpoints.encomendas, r => $("#kpi-encomendas").text(r.valor));
  */
}


$(function () {
  const esperarPorTokenEConfig = () => {
    if (!window.APP_CONFIG) return setTimeout(esperarPorTokenEConfig, 200);
    if (!localStorage.getItem("token"))
      return setTimeout(esperarPorTokenEConfig, 200);

    // Gráfico 1: Pares por mês
    carregarGraficoFaturacaoNoGeral({
      ano: 2025,
      tp: "F1",
      agrupamento: "mes",
      targetId: "#grafico1",
      valueField: "TotalPares",
      nomeSerie: "Pares",
      isCurrency: false,
      barColor: "#2563EB",
    });

    // Gráfico 2: Total faturado por mês (líquido)
    carregarGraficoFaturacaoNoGeral({
      ano: 2025,
      tp: "F1",
      agrupamento: "mes",
      targetId: "#grafico2",
      valueField: "TotalComDescontos",
      nomeSerie: "Total faturado (€)",
      isCurrency: true,
      barColor: "#16A34A",
    });

    // Gráfico 3: Pares por mês
    carregarGraficoParesPorMesTotal({
      ano: 2025,
      targetId: "#grafico3",
    });

    initTop10PaisesClientes({ targetId: "#grafico5" });

    // Mapa: Clientes por país
    initMapaClientesPorPais({ targetId: "#grafico4" });

    carregarKPIsGerais();
  };

  esperarPorTokenEConfig();
});
