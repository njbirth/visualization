<script>
  import { mdiThumbDown, mdiThumbUp } from "@mdi/js";
  import { onMount } from "svelte";

  import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemGroup,
    Subheader,
  } from "svelte-materialify";

  import { navigate, Route, useLocation, useResolve } from "svelte-navigator";
  import { filterRoute } from "./Route";

  import VoteBar from "./VoteBar.svelte";
  export let votes;
  export let meta;
  export let value = 0;

  const resolve = useResolve();
  const location = useLocation();
  const path = resolve($location.pathname);

  onMount(() => {
    if (!(votes == undefined || votes.length == 0))
      navigate(
        path + "/" + filterRoute(votes[value].short.split(" ").join(""))
      );
  });
</script>

{#each votes as vote}
  <Route path={filterRoute(vote.short.split(" ").join(""))}>
    <div style="width: 50%; margin: 1em;">
      <Card flat={true}
        ><CardTitle>{vote.title}</CardTitle><CardSubtitle
          >{vote.date}</CardSubtitle
        ><CardText>{vote.desc}</CardText></Card
      >
      <Card flat={true}
        ><CardTitle>Stimmen</CardTitle><CardSubtitle>Abgeordnete</CardSubtitle
        ><CardText>
          <List dense class="elevation-2" style="width:300px">
            <Subheader>Ja</Subheader>
            <ListItemGroup class="blue-text">
              {#each vote.votes.filter((x) => x.vote == "0") as person}
                <ListItem
                  on:click={() =>
                    navigate(
                      filterRoute(
                        vote.short.split(" ").join("") +
                          "?profileID=" +
                          person.name +
                          " " +
                          person.vorname
                      )
                    )}
                >
                  <span slot="prepend">
                    <Icon style="color: green;" path={mdiThumbUp} />
                  </span>
                  {person.name},
                  {person.vorname}
                </ListItem>
              {/each}
            </ListItemGroup>
            <Subheader>Nein</Subheader>
            <ListItemGroup class="blue-text">
              {#each vote.votes.filter((x) => x.vote == "1") as person}
                <ListItem
                  on:click={() =>
                    navigate(
                      filterRoute(
                        vote.short.split(" ").join("") +
                          "?profileID=" +
                          person.name +
                          " " +
                          person.vorname
                      )
                    )}
                >
                  <span slot="prepend">
                    <Icon style="color: red;" path={mdiThumbDown} />
                  </span>
                  {person.name},
                  {person.vorname}
                </ListItem>
              {/each}
            </ListItemGroup>
          </List>
        </CardText></Card
      >
    </div>
    <Divider vertical={true} />
    <Card style="width: 50%; margin: 1em;" flat={true}
      ><CardTitle>Statistik</CardTitle>
      <VoteBar data={vote.votes} {meta} />
    </Card>
  </Route>
{/each}
