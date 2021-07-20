<script>
  import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    Divider,
  } from "svelte-materialify";

  import { Route } from "svelte-navigator";
  export let votes;
  export let path;
</script>

{#each votes as vote}
  <Route path={vote.short.split(" ").join("")}>
    <div style="width: 50%; margin: 1em;">
      <Card flat={true}
        ><CardTitle>{vote.title}</CardTitle><CardSubtitle
          >{vote.date}</CardSubtitle
        ><CardText>{vote.desc}</CardText></Card
      >
      <Card flat={true}
        ><CardTitle>Stimmen</CardTitle><CardSubtitle>Abgeordnete</CardSubtitle
        ><CardText>
          <ul>
            {#each vote.votes as person}
              <li>{person.Name} {person.Vorname}</li>
            {/each}
          </ul></CardText
        ></Card
      >
    </div>
    <Divider vertical={true} />
    <Card style="width: 50%; margin: 1em;" flat={true}
      ><CardTitle>Statistik</CardTitle></Card
    >
  </Route>
{/each}
