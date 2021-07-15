<script>
  import Header from "./ui/Header.svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import MpProfile from "./bundestag/Profile.svelte";
  import PartyNavigation from "./bundestag/PartyNavigation.svelte";
  import Party from "./bundestag/Party.svelte";

  import mps from "../../data/___final/stammdaten.json";
  mps.sort((a, b) => {
    let name1 = a.nachname + a.vorname;
    let name2 = b.nachname + b.vorname;
    return name1.localeCompare(name2)});
  
  let data = [
    {
      name: "fraktionslos",
      partei_id: "fraktionslos",
      link: "fraktionslos",
      seats: 10,
      color: "gray",
      order: 0,
    },
    {
      name: "DIE LINKE.",
      partei_id: "DIE LINKE.",
      link: "linke",
      seats: 69,
      color: "magenta",
      order: 1,
    },
    {
      name: "SPD",
      partei_id: "SPD",
      link: "spd",
      seats: 152,
      color: "red",
      order: 2,
    },
    {
      name: "Bündnis 90/Die Grünen",
      partei_id: "BÜNDNIS 90/DIE GRÜNEN",
      link: "gruene",
      seats: 67,
      color: "green",
      order: 3,
    },
    {
      name: "CDU/CSU",
      partei_id: "CDU/CSU",
      link: "cdu-csu",
      seats: 245,
      color: "black",
      order: 4,
    },
    {
      name: "FDP",
      partei_id: "FDP",
      link: "fdp",
      seats: 80,
      color: "#feed00",
      order: 5,
    },
    {
      name: "AfD",
      partei_id: "AfD",
      link: "afd",
      seats: 86,
      color: "#00a2e0",
      order: 6,
    },
  ];

</script>

<Router>
  <Header />
  <div style="display: flex;">
    <main>
      <Route path="/profile/:id" let:params>
        <MpProfile name={params.id} />
      </Route>
        <Route path="/" let:params>
          <Party parties={data} {mps} />
      </Route>
    </main>
  </div>
</Router>

<style>
  main {
    width: 100%;
  }
</style>
