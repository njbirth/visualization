<script>
  import { createEventDispatcher } from "svelte";
  import MpList from "./MPList.svelte";
  import PartyStatistics from "./PartyStatistics.svelte";

  export let mps;
  export let parties;
  export let selected;

  const dispatcher = createEventDispatcher();
</script>

<div class="container">
  <div class="item margin">
    <h1>Abgeordnete</h1>
    <MpList
      data={mps}
      {selected}
      on:select-mp={(event) => dispatcher("select-mp", event.detail)}
    />
  </div>
  <div class="border" />
  <div class="item margin">
    <h1>Statistiken</h1>
    <PartyStatistics {parties} {mps} {selected} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item {
    width: 50%;
  }
  .margin {
    margin: 1em;
  }
  .border {
    border-right: 3px dotted #ccc;
  }
</style>
