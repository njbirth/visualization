<script>
  import { CardText, CardTitle, Col, Row } from "svelte-materialify";

  export let profile;
  export let data;

  let mpNum;
  $: mpNum = data.filter((x) => x.partei == profile.id).length;
</script>

<CardTitle>{profile.name}</CardTitle>
{#if profile.id != "fraktionslos"}
  <Row noGutters>
    <Col cols={12} sm={6} md={8}>
      <CardText>
        <b>Parteivorsitz: </b>
        <ul>
          {#each profile.parteivorsitzende as p, i}
            <li>{p}{i == profile.parteivorsitzende.length - 1 ? "" : ", "}</li>
          {/each}
        </ul>
        {#if profile.generalsekretaer != null}
          <b>General­sekretär: </b>{profile.generalsekretaer}<br />
        {/if}
        <b>stellv. Parteivorsitz: </b>
        <ul>
          {#each profile.stellvvorsitzende as p}
            <li>{p}</li>
          {/each}
        </ul>
        <b>Anzahl Abgeordnete: </b>{mpNum} (Stand: 12.03.2021)<br />
        <b>Gründung: </b>
        <ul>
          {#each profile.gruendung as gruendung}<li>{gruendung}</li>{/each}
        </ul>
        <b>Gründungsort: </b>
        <ul>
          {#each profile.gruendungsort as ort}<li>{ort}</li>{/each}
        </ul>
        <b>Mitgliederzahl: </b>{profile.mitgliederzahl}<br />
      </CardText>
    </Col>
    <Col cols={12} sm={6} md={4}>
      <center>
        <img
          width="80%"
          max-height="100px"
          alt={profile.logo}
          src={profile.logo}
        /></center
      >
    </Col>
    <Col cols={12} sm={12} md={12}>
      <p style="color: #999;font-size: 10pt; float: right">
        <a target="_blank" rel="noopener noreferrer" href={profile.src}
          >Quelle</a
        >
      </p>
    </Col>
  </Row>
{:else}
  <CardText>
    <b>Anzahl Abgeordnete: </b>{mpNum} (Stand: 12.03.2021)<br />
  </CardText>
{/if}
