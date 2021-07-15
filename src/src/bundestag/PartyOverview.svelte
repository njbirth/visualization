<script>
  import { Link } from "svelte-navigator";

  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  export let mps;
</script>

<div class="container">
  <div class="item right-border margin">
    <h1>Abgeordnete</h1>

    <div class="container">
      <div class="item">
        <ul>
          {#each mps.slice(0, mps.length / 2) as mp}
            <Link to="profile/{mp.id}"
              ><li>{mp.nachname}, {mp.vorname}, ({mp.partei})</li></Link
            >
          {/each}
        </ul>
      </div>
      <div class="item">
        <ul>
          {#each mps.slice(mps.length / 2 + 1, mps.length) as mp}
            <Link to="profile/{mp.id}"
              ><li>{mp.nachname}, {mp.vorname}, ({mp.partei})</li></Link
            >
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
  .right-border {
    border-right: 3px dotted #ccc;
  }
</style>
