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
  let selected = meta.filter((x) => x.selected).map(x => x.partei_id);
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
    },
  };
}
