<script>
  import Header from "./ui/Header.svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import MpProfile from "./bundestag/Profile.svelte";
  import PartyNavigation from "./bundestag/PartyNavigation.svelte";
  import Party from "./bundestag/Party.svelte";

  let data = [
    {
      name: "fraktionslos",
      link: "fraktionslos",
      seats: 10,
      color: "gray",
      order: 0,
    },
    {
      name: "DIE LINKE.",
      link: "linke",
      seats: 69,
      color: "magenta",
      order: 1,
    },
    {
      name: "SPD",
      link: "spd",
      seats: 152,
      color: "red",
      order: 2,
    },
    {
      name: "Bündnis 90/Die Grünen",
      link: "gruene",
      seats: 67,
      color: "green",
      order: 3,
    },
    {
      name: "CDU/CSU",
      link: "cdu-csu",
      seats: 245,
      color: "black",
      order: 4,
    },
    {
      name: "FDP",
      link: "fdp",
      seats: 80,
      color: "#feed00",
      order: 5,
    },
    {
      name: "AfD",
      link: "afd",
      seats: 86,
      color: "#00a2e0",
      order: 6,
    },
  ];

  let mps = [];
</script>

<Router>
  <Header />
  <div style="display: flex;">
    <!-- <Navigation /> -->
    <PartyNavigation {data} />
    <main>
      <Route path="/" />
      <Route path="/profile/:id" let:params>
        <MpProfile name={params.id} />
      </Route>
      <Route path="/party/:link" let:params>
        <Party {data} {mps} link={params.link} />
      </Route>
    </main>
  </div>
</Router>

<style>
  main {
    margin: 1em;
  }
</style>
