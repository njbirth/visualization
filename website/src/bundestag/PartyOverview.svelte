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
  import PartyStatistics from "./PartyStatistics.svelte";

  export let meta;
  export let data;
  let statistics;
  $: statistics = [
    {
      title: "Sitzverteilung",
      type: "seat-distribution",
      data: {
        meta: meta,
        data: data,
      },
    },
    {
      title: "Altersverteilung",
      type: "age-distribution",
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
</script>

<Card style="width: 50%; margin: 1em;" flat={true}>
  <CardTitle>Abgeordnete</CardTitle>
  {#each letters as letter}
    {#if data.find((x) => {
      return letter.flatMap((l) => x.nachname.startsWith(l.toLowerCase()) || x.nachname.startsWith(l.toUpperCase()));
    })}
      <CardSubtitle># {letter[0]}</CardSubtitle>
    {/if}
    <CardText>
      <ul>
        {#each data
          .filter((x) => letter
              .flatMap((l) => x.nachname.startsWith(l.toLowerCase()) || x.nachname.startsWith(l.toUpperCase()))
              .includes(true))
          .sort((a, b) => {
            a = (a.nachname + a.vorname).toLowerCase();
            b = (b.nachname + b.vorname).toLowerCase();
            return a.localeCompare(b);
          }) as person}
          <li>{person.nachname}, {person.vorname}</li>
        {/each}
      </ul>
    </CardText>
  {/each}
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
    width: 49%;
    min-width: 170px;
  }
</style>
