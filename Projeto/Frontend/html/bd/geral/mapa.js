const base = window.APP_CONFIG.API_BASE_URL + window.APP_CONFIG.API_PATH;

const mapaFontes = {
  all: {
    source: DevExpress.viz.map.sources.world,
    //bounds: [-100, 80, 100, -60],
  },
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

let mapa;

function criarMapa(source, clientesPorPais) {
  if (mapa) {
    mapa.dispose();
  }

  mapa = $("#vector-map")
    .dxVectorMap({
      layers: {
        name: "areas",
        dataSource: source,
        colorGroups: [1, 5, 10, 50, 100, 200, 500],
        colorGroupingField: "clientes",
        label: {
          enabled: true,
          dataField: "name",
        },
        customize(elements) {
          $.each(elements, (_, element) => {
            const code = element.attribute("iso_a2");
            const total = clientesPorPais[code] || 0;
            element.attribute("clientes", total);
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
      title: {
        text: "Clientes por País",
        subtitle: { text: "Total de clientes registados por país" },
      },
      tooltip: {
        enabled: true,
        contentTemplate(info, container) {
          const name = info.attribute("name");
          const total = info.attribute("clientes");
          if (total > 0) {
            $("<div>")
              .append(`<h4>${name}</h4>`)
              .append(`<div><b>Total de clientes:</b> ${total}</div>`)
              .appendTo(container);
          } else {
            container.empty();
          }
        },
      },
    })
    .dxVectorMap("instance");
}

$(() => {
  $.getJSON(
    `${base}/ClientesPais`,
    function (clientesPorPais) {
      const defaultFonte = mapaFontes["all"];
      criarMapa(defaultFonte.source, clientesPorPais);

      $("#continente-select").on("change", function () {
        const key = $(this).val();
        const fonte = mapaFontes[key];

        criarMapa(fonte.source, clientesPorPais);

        // Se estiver a usar mapa mundial, aplicar zoom
        if (fonte.bounds) {
          mapa.viewport(fonte.bounds);
        }
      });
    }
  );
});
