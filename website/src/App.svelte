<script>
  import { Router, Route, navigate } from "svelte-navigator";
  import {
    List,
    ListItemGroup,
    NavigationDrawer,
    ListItem,
    Icon,
    Divider,
    MaterialApp,
    AppBar,
  } from "svelte-materialify";
  import { mdiChartBar, mdiAccountBoxMultiple } from "@mdi/js";
  import metaJson from "../../data/___final/meta.json";
  import dataJson from "../../data/___final/stammdaten.json";
  import votes from "../../data/___final/votes.json";
  import PartyOverview from "./bundestag/PartyOverview.svelte";
  import VoteOverview from "./bundestag/VoteOverview.svelte";
  import PartyNavigation from "./bundestag/PartyNavigation.svelte";
  import VoteNavigation from "./bundestag/VoteNavigation.svelte";
  import Profile from "./bundestag/Profile.svelte";
  import { onMount } from "svelte";

  export let basepath = "";
  const items = [
    {
      text: "Parteien & Abgeordnete",
      icon: mdiAccountBoxMultiple,
      path: "/parties",
    },
    { text: "Abstimmungen", icon: mdiChartBar, path: "/votes" },
  ];

  let theme = "light";

  let data = dataJson;
  let meta = metaJson;
  meta.forEach((x) => (x["selected"] = true));

  function toggleParty(event) {
    let selected = meta.find(
      (element) => element.partei_id === event.detail
    ).selected;
    meta.find((element) => element.partei_id === event.detail).selected =
      !selected;
    meta = [...meta];
  }

  function selectAll() {
    meta.forEach((element) => {
      element.selected = true;
    });
    meta = [...meta];
  }
  function deselectAll() {
    meta.forEach((element) => {
      element.selected = false;
    });
    meta = [...meta];
  }

  function partySelected(party) {
    return meta.find((element) => element.partei_id === party).selected;
  }
  onMount(() => {
    navigate(basepath + "/parties");
  });
</script>

<MaterialApp {theme}>
  <AppBar>Bundestag</AppBar>
  <div style="display: flex;">
    <div>
      <NavigationDrawer>
        <List nav dense>
          <ListItemGroup value={0}>
            {#each items as item, i}
              <ListItem
                value={i}
                on:click={() => navigate(basepath + item.path)}
              >
                <span slot="prepend">
                  <Icon path={item.icon} />
                </span>
                {item.text}
              </ListItem>
            {/each}
          </ListItemGroup>
        </List>
        <Divider />
        <Router {basepath}>
          <Route path="/parties/*">
            <PartyNavigation
              {meta}
              {partySelected}
              on:on-toggle={toggleParty}
              on:select-all={selectAll}
              on:deselect-all={deselectAll}
            />
          </Route>
          <Route path="/votes/*">
            <svg width="256" height="200"
              ><g transform="translate(128, 125)"
                ><g transform="scale(1.1)" id="partyfraktionslos"
                  ><path
                    style="fill: gray; stroke: white;"
                    d="M-80.90169943749476,58.7785252292473A100,100,0,0,1,-84.39002903997107,53.65000464709057L-16.878005807994214,10.730000929418113A20,20,0,0,0,-16.180339887498953,11.75570504584946Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partylinke"
                  ><path
                    style="fill: rgb(255, 0, 102); stroke: white;"
                    d="M-84.39002903997107,53.65000464709057A100,100,0,0,1,-99.0458983335352,13.780784567759827L-19.809179666707042,2.7561569135519655A20,20,0,0,0,-16.878005807994214,10.730000929418113Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partyspd"
                  ><path
                    style="fill: rgb(227, 0, 19); stroke: white;"
                    d="M-99.0458983335352,13.780784567759827A100,100,0,0,1,-69.33468395616188,-72.06040244613645L-13.866936791232376,-14.41208048922729A20,20,0,0,0,-19.809179666707042,2.7561569135519655Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partygruene"
                  ><path
                    style="fill: rgb(62, 155, 57); stroke: white;"
                    d="M-69.33468395616188,-72.06040244613645A100,100,0,0,1,-34.336146189166364,-93.92033360713855L-6.867229237833273,-18.784066721427706A20,20,0,0,0,-13.866936791232376,-14.41208048922729Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partycdu-csu"
                  ><path
                    style="fill: black; stroke: white;"
                    d="M-34.336146189166364,-93.92033360713855A100,100,0,0,1,92.04952346337858,-39.07537882305066L18.409904692675717,-7.815075764610134A20,20,0,0,0,-6.867229237833273,-18.784066721427706Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partyfdp"
                  ><path
                    style="fill: rgb(255, 238, 0); stroke: white;"
                    d="M92.04952346337858,-39.07537882305066A100,100,0,0,1,99.55075899883408,9.468177372443726L19.910151799766815,1.8936354744887451A20,20,0,0,0,18.409904692675717,-7.815075764610134Z"
                    cursor="not-allowed"
                  /></g
                ><g transform="scale(1.1)" id="partyafd"
                  ><path
                    style="fill: rgb(0, 160, 226); stroke: white;"
                    d="M99.55075899883408,9.468177372443726A100,100,0,0,1,80.90169943749474,58.778525229247315L16.18033988749895,11.755705045849464A20,20,0,0,0,19.910151799766815,1.8936354744887451Z"
                    cursor="not-allowed"
                  /></g
                ></g
              ></svg
            >
            <VoteNavigation {votes} /></Route
          >
        </Router>
      </NavigationDrawer>
    </div>
    <div style="display: flex; width: 100%">
      <Router {basepath}>
        <Route path="/parties/*">
          <PartyOverview {meta} {data} />
        </Route>
        <Route path="/votes/*">
          <VoteOverview {votes} {meta} />
        </Route>
      </Router>
    </div>
  </div>
  <Router>
    <Route path="/*?profileID">
      <div>
        <Profile {data} {votes} />
      </div>
    </Route>
  </Router>
</MaterialApp>
