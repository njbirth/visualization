<script>
  import { mdiChevronRight } from "@mdi/js";
  import { Icon, List, ListItem, ListItemGroup } from "svelte-materialify";
  import { navigate, useLocation } from "svelte-navigator";

  export let votes;
  export let path;
</script>

<List nav dense>
  <ListItemGroup>
    {#each votes as vote}
      <ListItem
        on:click={() => navigate(path + "/" + vote.short.split(" ").join(""))}
      >
        <span slot="prepend">
          <Icon path={mdiChevronRight} />
        </span>
        {vote.short}
      </ListItem>
    {/each}
  </ListItemGroup>
</List>
