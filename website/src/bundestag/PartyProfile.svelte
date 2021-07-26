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
        <b>Parteivorsitz: </b>{#each profile.parteivorsitzende as p, i}
          {p}{i == profile.parteivorsitzende.length - 1 ? "" : ", "}
        {/each}<br />
        {#if profile.generalsekretaer != null}
          <b>General­sekretär: </b>{profile.generalsekretaer}<br />
        {/if}
        <b>stellv. Parteivorsitz: </b>{#each profile.stellvvorsitzende as p, i}
          {p}{i == profile.stellvvorsitzende.length - 1 ? "" : ", "}
        {/each}<br />
        <b>Anzahl Abgeordnete: </b>{mpNum} (Stand: 12.03.2021)<br />
        <b
          >Gründung:
        </b>{#each profile.gruendung as gruendung}{gruendung}{/each}<br />
        <b>Gründungsort: </b>{#each profile.gruendungsort as ort}{ort}{/each}<br
        />
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
