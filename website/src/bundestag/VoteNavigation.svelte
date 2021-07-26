<script>
  import { mdiChevronRight } from "@mdi/js";
  import { Icon, List, ListItem, ListItemGroup } from "svelte-materialify";
  import { navigate, useLocation } from "svelte-navigator";
  import { filterRoute } from "./Route";

  export let votes;
  const location = useLocation();

  let value;
  $: value = $location.pathname;
</script>

<List nav dense>
  <ListItemGroup {value}>
    {#each votes as vote}
      <ListItem
        value={"/votes/" + filterRoute(vote.short)}
        on:click={() => navigate(filterRoute(vote.short))}
      >
        <span slot="prepend">
          <Icon path={mdiChevronRight} />
        </span>
        {vote.short}
      </ListItem>
    {/each}
  </ListItemGroup>
</List>
