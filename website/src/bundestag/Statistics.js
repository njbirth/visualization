import Color from "color";
import α from "color-alpha";
import moment from "moment";

function calcSeatAllocation(identifiers, data) {
  return identifiers.map(
    (element) => data.filter((x) => x.partei_id === element).length
  );
}

export function chartDataSeatAllocation(meta, data) {
  meta.sort((a, b) => b.seats - a.seats);
  let identifiers = meta.map((x) => x.partei_id);
  let chartData = calcSeatAllocation(identifiers, data);
  let bgColors = meta.map((x) =>
    x.selected
      ? α(Color(x.color).hex(), 0.7)
      : α(Color(x.color).lighten(0.5).hex(), 0.2)
  );
  let borderColors = meta.map((x) => {
    return x.selected ? Color(x.color).hex() : α(Color(x.color).hex(), 0.0);
  });
  return {
    labels: identifiers,
    datasets: [
      {
        data: chartData,
        backgroundColor: bgColors,
        borderWidth: 3,
        borderColor: borderColors,
        barPercentage: 1,
      },
    ],
  };
}

export function chartOptionsSeatAllocation() {
  return {
    legend: {
      display: false,
    },
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Anzahl",
          },
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
}

function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}
export function chartDataAgeDistribution(meta, data) {
  let myMap = new Map();
  meta.forEach((p) => {
    myMap.set(p.partei_id, p.seats);
  });
  let selected = meta.filter((x) => x.selected).map((x) => x.partei_id);
  let selectedMPs = data
    .filter((p) => selected.includes(p.partei_id))
    .sort((a, b) => myMap.get(b.partei_id) - myMap.get(a.partei_id));

  return [
    {
      type: "violin",
      x: unpack(selectedMPs, "partei_id"),
      y: unpack(selectedMPs, "geburtsdatum").map((el) =>
        moment().diff(moment(el.split(".").reverse().join("-")), "years")
      ),
      box: {
        visible: true,
      },
      line: {
        color: "green",
      },
      meanline: {
        visible: true,
      },
      transforms: [
        {
          type: "groupby",
          groups: unpack(selectedMPs, "partei_id"),
          styles: data
            .map((p) =>
              Object({
                target: p.partei_id,
                value: {
                  line: {
                    color: meta.find((x) => x.partei_id == p.partei_id).color,
                  },
                },
              })
            )
            .filter((p) => selected.includes(p.target)),
        },
      ],
    },
  ];
}

export function chartOptionsAgeDistribution() {
  return {
    showlegend: false,
    yaxis: {
      zeroline: false,
      title: "Alter",
    },
  };
}

export function chartDataGender(meta, data) {
  meta.sort((a, b) => b.seats - a.seats);
  meta = meta.filter((x) => x.selected);
  let identifiers = meta.map((x) => x.partei_id);
  return {
    labels: identifiers,
    datasets: [
      {
        label: "weiblich",
        data: meta.map(
          (p) =>
            data.filter(
              (x) => p.partei_id === x.partei_id && x.geschlecht === "weiblich"
            ).length
        ),
        backgroundColor: "#ff5680",
      },
      {
        label: "männlich",
        data: meta.map(
          (p) =>
            data.filter(
              (x) => p.partei_id === x.partei_id && x.geschlecht === "männlich"
            ).length
        ),
        backgroundColor: "#5776ff",
      },
      {
        label: "andere",
        data: meta.map(
          (p) =>
            data.filter(
              (x) =>
                p.partei_id === x.partei_id &&
                x.geschlecht !== "weiblich" &&
                x.geschlecht !== "männlich"
            ).length
        ),
        hidden: true,
        backgroundColor: "gray",
      },
    ],
  };
}

export function chartOptionsGender(relative=false) {
  return {
    legend: {
      display: true,
    },
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: relative ? "Anzahl in %" : "Anzahl",
          },
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },

          ticks: {
            suggestedMax: relative ? 100 : 0,
            beginAtZero: true,
          },
        },
      ],
    },
  };
}

export function chartDataGenderRelative(meta, data) {
  meta.sort((a, b) => b.seats - a.seats);
  meta = meta.filter((x) => x.selected);
  let number = meta
    .map((x) => x.partei_id)
    .map((x) => data.filter((d) => d.partei_id === x).length);

  let chartData = chartDataGender(meta, data);
  chartData.datasets.forEach((dataset, indexA) => {
    chartData.datasets[indexA].data = dataset.data.map(
      (d, indexB) => (d / number[indexB]) * 100
    );
  });
  return chartData;
}

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function chartOptionsReligion() {
  return {
    legend: {
      display: false,
    },
    animation: {
      duration: 0,
    },
    tooltips: {
      mode: "index",
      intersect: false,
      filter: function (item, data) {
        var value = data.datasets[item.datasetIndex].data[item.index];
        return value !== 0;
      },
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Anzahl",
          },
        },
      ],
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
}

export function chartDataReligion(meta, data) {
  let selectedData = data.filter(
    (x) => meta.find((d) => d.partei_id === x.partei_id).selected
  );
  let religions = groupBy(selectedData, "religion");
  let katholisch = [
    { name: "alt-katholisch", color: "#ff6600" },
    { name: "katholisch", color: "#ff8533" },
    { name: "römisch-katholisch", color: "#ffa366" },
  ];
  let evangelisch = [
    { name: "evangelisch", color: "#29a329" },
    { name: "evangelisch-freikirchlich", color: "#33cc33" },
    { name: "evangelisch-lutherisch", color: "#5cd65c" },
    { name: "evangelisch-reformiert", color: "#85e085" },
  ];
  let muslimisch = [
    { name: "Islam", color: "#0040ff" },
    { name: "muslimisch", color: "#3366ff" },
  ];
  let konfessionslos = [
    { name: "Atheist", color: "#ff00ff" },
    { name: "konfessionslos", color: "#ff33ff" },
    { name: "religionslos", color: "#ff66ff" },
  ];
  let keineAngabe = [
    { name: "null", color: "gray" },
    { name: "ohne Angaben", color: "lightgray" },
  ];
  let andere = [
    { name: "alevitisch", color: "#009973" },
    { name: "griechisch-orthodox", color: "#00cc99" },
    { name: "orthodox", color: "#00ffbf" },
    { name: "russisch-orthodox", color: "#33ffcc" },
  ];

  let katholischNum = katholisch
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[1, 38, 159];
  let evangelischNum = evangelisch
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[134, 1, 48, 4];
  let muslimischNum = muslimisch
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[1, 3];
  let konfessionslosNum = konfessionslos
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[1, 52, 3];
  let keineAngabeNum = keineAngabe
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[183, 76];
  let andereNum = andere
    .map((x) => {
      return {
        name: x.name,
        value: religions[x.name] ? religions[x.name].length : 0,
        color: x.color,
      };
    })
    .filter((x) => x.value > 0); //[1, 1, 1, 1];

  let myData = [
    { name: "katholisch", data: katholischNum },
    { name: "evangelisch", data: evangelischNum },
    { name: "muslimisch", data: muslimischNum },
    { name: "konfessionslos", data: konfessionslosNum },
    { name: "keine Angabe", data: keineAngabeNum },
    { name: "andere", data: andereNum },
  ];

  let datasets = [];
  myData.forEach((religion, index) => {
    religion.data.forEach((type) => {
      datasets.push({
        label: type.name,
        data: new Array(index).fill(0),
        stack: "0",
        backgroundColor: type.color,
      });
      datasets[datasets.length - 1].data.push(type.value);
    });
  });

  const labels = [
    "katholisch",
    "evangelisch",
    "muslimisch",
    "konfessionslos",
    "keine Angabe",
    "andere",
  ];

  return {
    labels: labels,
    datasets: datasets,
  };
}

export function voteType(vote) {
  switch (vote) {
    case 0:
      return "ja";
    case 1:
      return "nein";
    case 2:
      return "enthalten";
    case 3:
      return "ungültig";
    case 4:
      return "nicht abgegeben";
    default:
      return "nicht definiert";
  }
}
