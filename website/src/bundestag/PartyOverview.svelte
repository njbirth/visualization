<script>
  import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    Divider,
    Tab,
    TabContent,
    Tabs,
  } from "svelte-materialify";
  import { navigate } from "svelte-navigator";
  import PartyProfile from "./PartyProfile.svelte";
  import PartyStatistics from "./PartyStatistics.svelte";
  import { filterRoute } from "./Route";

  export let meta;
  export let data;
  let statistics;
  $: statistics = [
    {
      title: "Sitze",
      type: "seat-distribution",
      data: {
        meta: meta,
        data: data,
      },
    },
    {
      title: "Alter",
      type: "age-distribution",
      data: {
        meta: meta,
        data: data,
      },
    },
    {
      title: "Geschlechter",
      type: "gender-distribution",
      data: {
        meta: meta,
        data: data,
      },
    },
    {
      title: "Religion",
      type: "religion-distribution",
      data: {
        meta: meta,
        data: data,
      },
    },
  ];
  $: statistics = [...statistics];

  let letters = [
    ["A", "Ä"],
    ["B"],
    ["C"],
    ["D"],
    ["E"],
    ["F"],
    ["G"],
    ["H"],
    ["I"],
    ["J"],
    ["K"],
    ["L"],
    ["M"],
    ["N"],
    ["O", "Ö"],
    ["P"],
    ["Q"],
    ["R"],
    ["S"],
    ["T"],
    ["U", "Ü"],
    ["V"],
    ["W"],
    ["X"],
    ["Y"],
    ["Z"],
  ];
  let profiles = [];
  $: profiles = meta.filter((x) => x.selected).map((x) => x.profile);
  $: {
    if (profiles.length !== 1) profiles = [];
    else profiles = profiles[0];
  }
</script>

<Card style="width: 50%; margin: 1em;" flat={true}>
  <div style="overflow-y: auto; max-height: 86vh;">
    {#each profiles as profile}
      <PartyProfile {profile} {data} />
      <Divider />
    {/each}
    <CardTitle>Abgeordnete</CardTitle>
    {#each letters as letter}
      {#if data.find((x) => letter
          .flatMap((l) => meta.find((m) => m.partei_id === x.partei_id).selected && (x.nachname.startsWith(l.toLowerCase()) || x.nachname.startsWith(l.toUpperCase())))
          .includes(true))}
        <CardSubtitle><b># {letter[0]}</b></CardSubtitle>
        <CardText>
          <ul>
            {#each data
              .filter((x) => meta.find((m) => m.partei_id === x.partei_id).selected && letter
                    .flatMap((l) => x.nachname.startsWith(l.toLowerCase()) || x.nachname.startsWith(l.toUpperCase()))
                    .includes(true))
              .sort((a, b) => {
                a = (a.nachname + a.vorname).toLowerCase();
                b = (b.nachname + b.vorname).toLowerCase();
                return a.localeCompare(b);
              }) as person}
              <li
                on:click={() =>
                  navigate(
                    "?profileID=" +
                      filterRoute(person.nachname + " " + person.vorname)
                  )}
              >
                {person.nachname}, {person.vorname} ({person.partei})
              </li>
            {/each}
          </ul>
        </CardText>
      {/if}
    {/each}
  </div>
</Card>
<Divider vertical={true} />
<Card style="width: 50%; margin: 1em;" flat={true}>
  <CardTitle>Statistiken</CardTitle>
  <Tabs centerActive>
    <div slot="tabs">
      {#each statistics as statistic}
        <Tab>{statistic.title}</Tab>
      {/each}
    </div>
    <div style="margin-top: 1em;">
      {#each statistics as statistic}
        <TabContent>
          <PartyStatistics statisticData={statistic} />
        </TabContent>
      {/each}
    </div>
  </Tabs>
</Card>

<style>
  ul li {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    min-width: 170px;
    cursor: pointer;
  }
</style>
