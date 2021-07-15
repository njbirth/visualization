<script>
  import { createEventDispatcher } from "svelte";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  export let mps;

  const dispatcher = createEventDispatcher();

  function onSelectMP(mp) {
    console.log(mp);
    dispatcher("select-mp", mp);
  }
</script>

<div class="container">
  <div class="item right-border margin">
    <h1>Abgeordnete</h1>

    <div class="container" style="height: 79vh; overflow: auto;">
      <div class="item">
        <ul>
          {#each mps.slice(0, mps.length / 2) as mp}
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
          {#each mps.slice(mps.length / 2 + 1, mps.length) as mp}
            <li>
              <span class="link clickable" on:click={() => onSelectMP(mp)}>
                {mp.nachname}, {mp.akad_titel ? mp.akad_titel : ""}
                {mp.vorname}, ({mp.partei})</span
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="item margin">
    <h1>Statistiken</h1>
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanel>
        <h3>Panel One</h3>
      </TabPanel>

      <TabPanel>
        <h3>Panel Two</h3>
      </TabPanel>

      <TabPanel>
        <h3>Panel Three</h3>
      </TabPanel>
    </Tabs>
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
  .right-border {
    border-right: 3px dotted #ccc;
  }
</style>
