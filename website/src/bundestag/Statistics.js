import Color from "color";
import α from "color-alpha";

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
