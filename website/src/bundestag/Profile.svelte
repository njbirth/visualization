<script>
  import {
    mdiArrowCollapseAll,
    mdiArrowExpandAll,
    mdiCardAccountDetails,
    mdiClipboardCheck,
    mdiClipboardOff,
    mdiClipboardRemove,
    mdiWindowClose,
  } from "@mdi/js";

  import {
    AppBar,
    Button,
    Col,
    Dialog,
    ExpansionPanel,
    ExpansionPanels,
    Icon,
    List,
    ListItem,
    Row,
    Tooltip,
  } from "svelte-materialify";
  import { navigate, useLocation } from "svelte-navigator";
  import { filterRoute } from "./Route";
  import { voteType } from "./Statistics";

  export let data;
  export let votes;

  let location;
  $: location = useLocation();
  let active;
  $: active = $location.search !== "";

  let person;
  $: if ($location.search.startsWith("?profileID=")) {
    person = data.find((x) => {
      let name = filterRoute(x.nachname + " " + x.vorname);
      return name === filterRoute($location.search.replace("?profileID=", ""));
    });
  }

  let wahlperioden;
  let value = [0, 1, 2];
  let valueWP = [0];
  $: if (person !== null && person !== undefined) {
    wahlperioden = person.wahlperioden.reverse();
  }

  function onClose() {
    value = [0, 1, 2];
    valueWP = [0];
    navigate(-1);
    fullscreen = false;
  }

  function handleWindowKeyDown(event) {
    if (event.key === "Escape") {
      if (active) onClose();
    }
  }

  let mappedVotes = votes.flatMap((vote) =>
    vote.votes.map((v) => {
      return {
        nachname: v.name,
        vorname: v.vorname,
        vote: v.vote,
        partei_id: v.partei_id,
        meta: {
          short: vote.short,
          title: vote.title,
          desc: vote.desc,
          documents: vote.documents,
          date: vote.date,
        },
      };
    })
  );
  let personalVotes = [];
  $: if (person !== null && person !== undefined) {
    personalVotes = mappedVotes.filter(
      (v) => v.nachname == person.nachname && v.vorname == person.vorname
    );
  }

  let fullscreen = false;
  function onToggleFullscreen() {
    fullscreen = !fullscreen;
  }
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

<Dialog
  {fullscreen}
  {active}
  width="1024px"
  on:outroend={() => {
    if (active) onClose();
  }}
>
  {#if person !== null}
    <AppBar flat>
      <span slot="title"
        >{person.nachname},{person.anrede_titel !== null
          ? " " + person.anrede_titel
          : ""}
        {person.vorname} ({person.partei})</span
      >
      <div style="flex-grow:1" />
      <div>
        <Button icon on:click={() => onToggleFullscreen()}>
          {#if !fullscreen}
            <Icon path={mdiArrowExpandAll} />
          {:else}
            <Icon path={mdiArrowCollapseAll} />
          {/if}
        </Button>
        <Button icon on:click={() => onClose()}>
          <Icon path={mdiWindowClose} />
        </Button>
      </div>
    </AppBar>
    <div
      style="display: inline-flex; width: 100%; {fullscreen
        ? 'max-height: 92vh;'
        : 'max-height: 800px;'}"
    >
      <div style="width:70%; margin: 1rem;overflow-y: auto;">
        <ExpansionPanels multiple flat bind:value>
          <ExpansionPanel>
            <span slot="header">
              <p style="font-size: 12pt; font-weight: bold;">
                <Icon path={mdiCardAccountDetails} />
                Lebenslauf
              </p></span
            >
            {person.vita}
          </ExpansionPanel>

          <ExpansionPanel>
            <span slot="header"
              ><p style="font-size: 12pt; font-weight: bold;">
                Wahlperioden
              </p></span
            >
            <ExpansionPanels bind:value={valueWP} popout flat>
              {#each wahlperioden as wp}
                <ExpansionPanel>
                  <span slot="header">{wp.wp}. Wahlperiode</span>
                  <div>
                    <p style="font-style: italic;">
                      Mandat über <b
                        >{wp.mandatsart}{wp.liste
                          ? " (" + wp.liste + ") "
                          : ""}</b
                      >
                      vom <b>{wp.md_von}</b> bis
                      <b>{wp.md_bis ? wp.md_bis : "heute"}.</b><br />
                      {#if wp.wkr_land != null && wp.wkr_name != null && wp.wkr_nummer != null}
                        Wahlkreis {wp.wkr_nummer}: {wp.wkr_name} ({wp.wkr_land})
                      {/if}
                    </p>
                    <p>Vertreten in folgenden <b>Institutionen</b>:</p>
                    <ul>
                      {#each wp.institutionen as ins}
                        <li>
                          Vertreten in: <b>{ins.INS_LANG}</b>
                          {#if ins.FKT_LANG}
                            in der Funktion <b>{ins.FKT_LANG}</b>
                            {ins.FKTINS_VON ? "von " + ins.FKTINS_VON : ""}
                            {ins.FKTINS_BIS ? "bis " + ins.FKTINS_BIS : ""}
                          {/if}
                        </li>
                      {/each}
                    </ul>
                  </div>
                </ExpansionPanel>
              {/each}
            </ExpansionPanels>
          </ExpansionPanel>
          <ExpansionPanel>
            <span slot="header"
              ><p style="font-size: 12pt; font-weight: bold;">
                Abstimmungen 19. Legislaturperiode
              </p></span
            >
            <Row noGutters>
              {#each personalVotes as vote}
                <Col cols={12} sm={6} md={6}>
                  <div class="tooltip">
                    <ListItem
                      on:click={() =>
                        navigate(
                          "/visualization/votes/" + filterRoute(vote.meta.short)
                        )}
                    >
                      <span class="tooltiptext">{voteType(vote.vote)}</span>
                      <span slot="prepend">
                        {#if vote.vote == 0}
                          <Icon
                            path={mdiClipboardCheck}
                            style="color: green;"
                          />
                        {:else if vote.vote == 1}
                          <Icon path={mdiClipboardRemove} style="color: red;" />
                        {:else}
                          <Icon path={mdiClipboardOff} />
                        {/if}
                      </span>{vote.meta.short}<span slot="subtitle"
                        >{vote.meta.date}</span
                      ></ListItem
                    >
                  </div>
                </Col>
              {/each}
            </Row>
          </ExpansionPanel>
        </ExpansionPanels>
      </div>
      <div style="width: 30%; margin: 1rem; height:100%">
        <div>
          <img alt="{person.nachname}, {person.vorname}" src={person.img} />
        </div>
        <div style="overflow-y: auto; max-height: 390px">
          <List>
            {#if person.geburtsdatum !== null}
              <ListItem disabled
                >{person.geburtsdatum}<span slot="subtitle">Geburtsdatum</span
                ></ListItem
              >
            {/if}
            {#if person.geburtsort !== null}
              <ListItem disabled>
                {person.geburtsort}
                <span slot="subtitle">Geburtsort</span>
              </ListItem>
            {/if}
            {#if person.sterbedatum !== null}
              <ListItem disabled
                >{person.sterbedatum}<span slot="subtitle">Sterbedatum</span
                ></ListItem
              >
            {/if}
            {#if person.geschlecht !== null}
              <ListItem disabled
                >{person.geschlecht}<span slot="subtitle">Geschlecht</span
                ></ListItem
              >
            {/if}
            {#if person.beruf !== null}
              <ListItem disabled multiline
                >{person.beruf}<span slot="subtitle">Beruf</span></ListItem
              >
            {/if}
            {#if person.religion !== null}
              <ListItem disabled>
                {person.religion}<span slot="subtitle">Religion</span></ListItem
              >
            {/if}
            {#if person.familienstand !== null}
              <ListItem disabled>
                {person.familienstand}<span slot="subtitle">Familienstand</span>
              </ListItem>
            {/if}
          </List>
        </div>
      </div>
    </div>
  {/if}</Dialog
>

<style>
  /* Source: of CSS code: https://www.w3schools.com/howto/howto_css_tooltip.asp */
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
