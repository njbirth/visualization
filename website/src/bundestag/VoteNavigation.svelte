<script>
  import { mdiChevronRight } from "@mdi/js";
  import { Icon, List, ListItem, ListItemGroup } from "svelte-materialify";
  import { navigate, useLocation, useResolve } from "svelte-navigator";
  import { filterRoute } from "./Route";

  export let votes;
  const resolve = useResolve();
  const location = useLocation();
  const path = resolve($location.pathname);

  let value;
  $: value = resolve($location.pathname);
</script>

<List nav dense>
  <ListItemGroup {value}>
    {#each votes as vote}
      <ListItem
        value={path + "/" + filterRoute(vote.short.split(" ").join(""))}
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
