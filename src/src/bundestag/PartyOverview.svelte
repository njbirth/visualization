<script>
  import { Link } from "svelte-navigator";

  export let mps;
</script>

  <div>
    <h1>Abgeordnete</h1>

    <ul>
            <Link to="profile/{mp.id}"
          ><li>{mp.nachname}, {mp.vorname}, ({mp.partei})</li></Link
        >
      {/each}
    </ul>
  </div>
