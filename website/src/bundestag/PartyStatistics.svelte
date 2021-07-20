<script>
  export let statisticData;

  import Bar from "svelte-chartjs/src/Bar.svelte";
  import { chartDataSeatAllocation } from "./Statistics";

  let meta;
  $: meta = statisticData.data.meta;
  let data;
  $: data = statisticData.data.data;
  let type;
  $: type = statisticData.type;

  let chartData;
  let chartOptions;

  function calcChartData(data, meta, type) {
    let chartData;
    let chartOptions;
    if (type == "seat-distribution") {
      chartData = chartDataSeatAllocation(meta, data);
      chartOptions = {
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
    return [chartData, chartOptions];
  }
  let chart;
  $: chart = calcChartData(data, meta, type);
  $: chartData = chart[0];
  $: chartOptions = chart[1];
</script>

{#if type == "seat-distribution"}
  <Bar data={chartData} options={chartOptions} />
{/if}
