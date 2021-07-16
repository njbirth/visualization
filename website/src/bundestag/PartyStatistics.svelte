<script>
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import Sitzverteilung from "./statistics/Sitzverteilung.svelte";

  export let mps;
  export let parties;
  export let selected;
</script>

<Tabs>
  <TabList>
    <Tab>Sitzanteile</Tab>
    <Tab>Altersverteilung</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanel>
    <Sitzverteilung {parties} {mps} {selected} />
  </TabPanel>

  <TabPanel>
    <h3>Panel Two</h3>
  </TabPanel>

  <TabPanel>
    <h3>Panel Three</h3>
  </TabPanel>
</Tabs>
