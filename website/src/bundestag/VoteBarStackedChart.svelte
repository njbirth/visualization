<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let ctx;
  let chartCanvas;

  export let datasets;
  const data = {
    labels: [""],
    datasets: datasets,
  };
  const options = {
    animation: {
      duration: 0,
    },
    indexAxis: "y",
    scales: {
      y: {
        stacked: true,
        display: false,
      },
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Anzahl in %",
        },
        grid: {
          drawBorder: false,
        },
      },
    },
  };

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
  });
</script>

<canvas height="50px" bind:this={chartCanvas} />
