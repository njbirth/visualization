<script>
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

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
  </TabPanel>

  <TabPanel>
    <h3>Panel Two</h3>
  </TabPanel>

  <TabPanel>
    <h3>Panel Three</h3>
  </TabPanel>
</Tabs>
