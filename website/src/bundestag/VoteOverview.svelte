<script>
  import {
    mdiClipboardCheck,
    mdiClipboardOff,
    mdiClipboardRemove,
  } from "@mdi/js";
  import { onMount } from "svelte";

  import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Divider,
    ExpansionPanel,
    ExpansionPanels,
    Icon,
    ListItem,
    Row,
  } from "svelte-materialify";

  import { navigate, Route, useLocation, useResolve } from "svelte-navigator";
  import { filterRoute } from "./Route";
  import { voteType } from "./Statistics";

  import VoteBar from "./VoteBar.svelte";
  export let votes;
  export let meta;
  export let value = 0;

  $: meta = meta.sort((a, b) => b.seats - a.seats);

  let voteNums = [0, 1, 2, 3, 4];

  const resolve = useResolve();
  const location = useLocation();
  const path = resolve($location.pathname);

  onMount(() => {
    if (!(votes == undefined || votes.length == 0)) {
      if (!resolve($location.pathname).includes("/visualization/votes/"))
        navigate(path + "/" + filterRoute(votes[value].short));
    }
  });
</script>

{#each votes as vote}
  <Route path={filterRoute(vote.short)}>
    <div style="width: 50%; margin: 1em;">
      <div style="overflow-y: auto; max-height: 86vh;">
        <Card flat={true}
          ><CardTitle>{vote.title}</CardTitle><CardSubtitle
            >{vote.date}</CardSubtitle
          ><CardText
            >{vote.desc}
            <ul>
              {#each vote.documents as doc, i}
                <li>
                  <a target="_blank" rel="noopener noreferrer" href={doc}
                    >Dokument #{i + 1}</a
                  >
                </li>
              {/each}
            </ul></CardText
          ></Card
        >
        <Card flat={true}
          ><CardTitle>Stimmen</CardTitle><CardSubtitle>Abgeordnete</CardSubtitle
          >
          <Divider
            style="border: dotted; border-width: thin 0 0;border-color: var(--theme-dividers);"
          />
          {#each meta.map((x) => x.partei_id) as partei_id}
            <CardTitle style="font-size: medium; font-weight: bold;"
              >{partei_id}</CardTitle
            >
            <div style="width: 94%; margin: 0% 3%">
              {#each voteNums as voteID}
                {#if vote.votes.filter((x) => x.partei_id == partei_id && x.vote == voteID).length > 0}
                  <Row style="margin-top: 0em;"
                    ><ListItem><b># {voteType(voteID)}</b></ListItem></Row
                  >
                {/if}
                <Row noGutters>
                  {#each vote.votes.filter((x) => x.partei_id == partei_id && x.vote == voteID) as person}
                    <Col cols={12} sm={6} md={6}
                      ><div class="is-hovered" style="max-height: 2.5em;">
                        <ListItem
                          style="max-height: 2.5em; padding-bottom: 10px; cursor: pointer;"
                          on:click={() =>
                            navigate(
                              filterRoute(
                                vote.short +
                                  "?profileID=" +
                                  person.name +
                                  " " +
                                  person.vorname
                              )
                            )}
                        >
                          <span slot="prepend">
                            {#if person.vote == 0}
                              <Icon
                                path={mdiClipboardCheck}
                                style="color: green;"
                              />
                            {:else if person.vote == 1}
                              <Icon
                                path={mdiClipboardRemove}
                                style="color: red;"
                              />
                            {:else}
                              <Icon path={mdiClipboardOff} />
                            {/if}
                          </span>
                          {person.name},
                          {person.vorname}
                        </ListItem>
                      </div>
                    </Col>
                  {/each}
                </Row>
              {/each}
            </div>
            <Divider
              style="border: dotted; border-width: thin 0 0;border-color: var(--theme-dividers);"
            />
          {/each}</Card
        >
      </div>
    </div>
    <Divider vertical={true} />
    <Card style="width: 50%; margin: 1em;" flat={true}
      ><CardTitle>Statistik</CardTitle>
      <VoteBar data={vote.votes} {meta} />
    </Card>
  </Route>
{/each}

<style>
  .is-hovered:hover {
    background-color: #f5f5f5;
  }
</style>
