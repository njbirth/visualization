<script>
  import { Link } from "svelte-navigator";

  export let data;
  export let mps;
  export let link;

  let party_data;
  $: party_data = [...data.filter((d) => d.link === link)][0];
  let party_mps;
  $: party_mps = [...mps.filter(d => d.party === link)] // TODO: party !== party link
</script>

<h1>
  {party_data.name}
</h1>

<h2>Abgeordnete</h2>
<ul>
  {#each party_mps as mp}
    <Link to="/profile/{mp.id}"><li>{mp.nachname}, {mp.vorname}</li></Link>
  {/each}
</ul>
