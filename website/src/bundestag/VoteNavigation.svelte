<script>
  import { mdiChevronRight } from "@mdi/js";
  import { Icon, List, ListItem, ListItemGroup } from "svelte-materialify";
  import { navigate } from "svelte-navigator";
  import { filterRoute } from "./Route";

  export let votes;
  export let path;
</script>

<List nav dense>
  <ListItemGroup>
    {#each votes as vote}
      <ListItem
        on:click={() =>
          navigate(path + "/" + filterRoute(vote.short.split(" ").join("")))}
      >
        <span slot="prepend">
          <Icon path={mdiChevronRight} />
        </span>
        {vote.short}
      </ListItem>
    {/each}
  </ListItemGroup>
</List>
