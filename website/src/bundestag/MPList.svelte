<script>
  import { createEventDispatcher } from "svelte";

  export let data;
  export let selected;
  export let identifier = "partei_id";

  export let style = "height: 78vh; overflow: auto";

  const dispatcher = createEventDispatcher();

  function onSelectMP(mp) {
    dispatcher("select-mp", mp);
  }
  let selectedMPs = []
  $: selectedMPs = data.filter((element) =>
    selected.find((x) => x === element[identifier])
  );
</script>

<div class="container" {style}>
  <div class="item">
    <ul>
      {#each selectedMPs.slice(0, selectedMPs.length / 2) as mp}
        <li>
          <span class="link clickable" on:click={() => onSelectMP(mp)}
            >{mp.nachname}, {mp.vorname}, ({mp.partei})</span
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="item">
    <ul>
      {#each selectedMPs.slice(selectedMPs.length / 2 + 1, selectedMPs.length) as mp}
        <li>
          <span class="link clickable" on:click={() => onSelectMP(mp)}>
            {mp.nachname}, {mp.akad_titel ? mp.akad_titel : ""}
            {mp.vorname} ({mp.partei})</span
          >
        </li>
      {/each}
    </ul>
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
  .link {
    color: rgb(0, 100, 200);
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link:visited {
    color: rgb(0, 80, 160);
  }
</style>
