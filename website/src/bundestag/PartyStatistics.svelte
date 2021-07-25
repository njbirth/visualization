<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import {
    chartDataAgeDistribution,
    chartDataGender,
    chartDataGenderRelative,
    chartDataReligion,
    chartDataSeatAllocation,
    chartOptionsAgeDistribution,
    chartOptionsGender,
    chartOptionsReligion,
    chartOptionsSeatAllocation,
  } from "./Statistics";
  import ViolinPlot from "./plot-wrappers/ViolinPlot.svelte";
  import Switch from "svelte-materialify";

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
      case "gender-distribution": {
        charts["gender-distribution"] = {};
        charts["gender-distribution"]["data"] = chartDataGender(meta, data);
        charts["gender-distribution"]["options"] = chartOptionsGender();
        charts["gender-relative-distribution"] = {};
        charts["gender-relative-distribution"]["data"] =
          chartDataGenderRelative(meta, data);
        charts["gender-relative-distribution"]["options"] =
          chartOptionsGender("Anzahl in %");
      }
      case "religion-distribution": {
        charts["religion-distribution"] = {};
        charts["religion-distribution"]["data"] = chartDataReligion(meta, data);
        charts["religion-distribution"]["options"] = chartOptionsReligion();
      }
    }
  }

  let genderRelative = false;

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
{:else if type == "gender-distribution"}
  <Switch
    bind:value={genderRelative}
    on:change={() => (genderRelative = !genderRelative)}
    >Relative Häufigkeit</Switch
  >
  {#if genderRelative}
    <Bar
      data={charts["gender-relative-distribution"].data}
      options={charts["gender-relative-distribution"].options}
    />
  {:else}
    <Bar
      data={charts["gender-distribution"].data}
      options={charts["gender-distribution"].options}
    />
  {/if}
{:else if type == "religion-distribution"}
  <Bar
    data={charts["religion-distribution"].data}
    options={charts["religion-distribution"].options}
  />
{/if}
