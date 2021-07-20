<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist";

  export let data;
  export let layout;

  let plotDiv;

  onMount(() => {
    Plotly.newPlot(plotDiv, data, layout);
  });
  $: if (plotDiv !== null && plotDiv !== undefined)
    Plotly.react(plotDiv, data, layout);

</script>

<div style="width:100%;" bind:this={plotDiv} />
