<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";

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
</script>

<Bar data={chartData} options={chartOptions} />
