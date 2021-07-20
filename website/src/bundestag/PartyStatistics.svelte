<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import {
    chartDataAgeDistribution,
    chartDataSeatAllocation,
    chartOptionsAgeDistribution,
    chartOptionsSeatAllocation,
  } from "./Statistics";
  import ViolinPlot from "./plot-wrappers/ViolinPlot.svelte";

  export let statisticData;
  let meta;
  $: meta = statisticData.data.meta;
  let data;
  $: data = statisticData.data.data;
  let type;
  $: type = statisticData.type;

  let charts = {};

  function calcChartData(data, meta, type) {
    switch (type) {
      case "seat-distribution": {
        charts["seat-distribution"] = {};
        charts["seat-distribution"]["data"] = chartDataSeatAllocation(
          meta,
          data
        );
        charts["seat-distribution"]["options"] = chartOptionsSeatAllocation();
      }
      case "age-distribution": {
        charts["age-distribution"] = {};
        charts["age-distribution"]["data"] = chartDataAgeDistribution(
          meta,
          data
        );
        charts["age-distribution"]["options"] = chartOptionsAgeDistribution();
      }
    }
  }
  $: calcChartData(data, meta, type);
</script>

{#if type == "seat-distribution"}
  <Bar
    data={charts["seat-distribution"].data}
    options={charts["seat-distribution"].options}
  />
{:else if type == "age-distribution"}
  <ViolinPlot
    data={charts["age-distribution"].data}
    layout={charts["age-distribution"].options}
  />
{/if}
