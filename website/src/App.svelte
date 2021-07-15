<script>
  import Header from "./ui/Header.svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import Party from "./bundestag/Party.svelte";

  import mps from "../../data/___final/stammdaten.json";
  mps.sort((a, b) => {
    let name1 = a.nachname + a.vorname;
    let name2 = b.nachname + b.vorname;
    return name1.localeCompare(name2);
  });

  let data = [
    {
      name: "fraktionslos",
      partei_id: "fraktionslos",
      link: "fraktionslos",
      seats: 10,
      color: "gray",
      colorDeselect: "lightgray",
      order: 0,
    },
    {
      name: "DIE LINKE.",
      partei_id: "DIE LINKE.",
      link: "linke",
      seats: 69,
      color: "#ff0066",
      colorDeselect: "#ff7db1",
      order: 1,
    },
    {
      name: "SPD",
      partei_id: "SPD",
      link: "spd",
      seats: 152,
      color: "#e30013",
      colorDeselect: "#e3717b",
      order: 2,
    },
    {
      name: "Bündnis 90/Die Grünen",
      partei_id: "GRÜNE",
      link: "gruene",
      seats: 67,
      color: "#3e9b39",
      colorDeselect: "#9ad197",
      order: 3,
    },
    {
      name: "CDU/CSU",
      partei_id: "CDU/CSU",
      link: "cdu-csu",
      seats: 245,
      color: "black",
      colorDeselect: "#707070",
      order: 4,
    },
    {
      name: "FDP",
      partei_id: "FDP",
      link: "fdp",
      seats: 80,
      color: "#ffee00",
      colorDeselect: "#ffee70",
      order: 5,
    },
    {
      name: "AfD",
      partei_id: "AfD",
      link: "afd",
      seats: 86,
      color: "#00a0e2",
      colorDeselect: "#70a0e2",
      order: 6,
    },
  ];
</script>

<Router>
  <Header />
  <main>
    <Route>
      <Party parties={data} {mps} />
    </Route>
    <Route path="statistics">Test</Route>
  </main>
</Router>

<style>
  main {
    width: 100%;
  }
</style>
