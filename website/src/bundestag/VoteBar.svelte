<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import { CardTitle, Divider } from "svelte-materialify";
  import VoteBarStackedChart from "./VoteBarStackedChart.svelte";

  export let data;
  export let meta;
  let chartData;
  let chartOptions;

  meta.sort((a, b) => b.seats - a.seats);
  let identifiers = meta.map((x) => x.partei_id);
  chartData = {
    labels: identifiers,
    datasets: [
      {
        label: "ja",
        data: meta.map(
          (p) =>
            data.filter((x) => p.partei_id === x.partei_id && x.vote === 0)
              .length
        ),
        backgroundColor: "green",
      },
      {
        label: "nein",
        data: meta.map(
          (p) =>
            data.filter((x) => p.partei_id === x.partei_id && x.vote === 1)
              .length
        ),
        backgroundColor: "red",
      },
      {
        label: "andere",
        data: meta.map(
          (p) =>
            data.filter((x) => p.partei_id === x.partei_id && x.vote > 1).length
        ),
        backgroundColor: "gray",
      },
    ],
  };
  chartOptions = {
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

  let series = [
    {
      label: "ja",
      data: [
        ((data.filter((d) => d.vote == 0).length / data.length) * 100).toFixed(
          2
        ),
      ],
      backgroundColor: "green",
      stack: 0,
      barThickness: 30,
    },
    {
      label: "nein",
      data: [
        ((data.filter((d) => d.vote == 1).length / data.length) * 100).toFixed(
          2
        ),
      ],
      backgroundColor: "red",
      stack: 0,
      barThickness: 30,
    },
    {
      label: "enthalten",
      data: [
        ((data.filter((d) => d.vote == 2).length / data.length) * 100).toFixed(
          2
        ),
      ],
      backgroundColor: "#bbb",
      stack: 0,
      barThickness: 30,
    },
    {
      label: "ungültig",
      data: [
        ((data.filter((d) => d.vote == 3).length / data.length) * 100).toFixed(
          2
        ),
      ],
      backgroundColor: "#ccc",
      stack: 0,
      barThickness: 30,
    },
    {
      label: "nicht abgegeben",
      data: [
        ((data.filter((d) => d.vote == 4).length / data.length) * 100).toFixed(
          2
        ),
      ],
      backgroundColor: "#ddd",
      stack: 0,
      barThickness: 30,
    },
  ];
</script>

<Bar data={chartData} options={chartOptions} />
<Divider
  style="border: dotted; border-width: thin 0 0;border-color: var(--theme-dividers); margin-top: 1em;"
/>
<CardTitle>Gesamt</CardTitle>
<VoteBarStackedChart datasets={series} />
