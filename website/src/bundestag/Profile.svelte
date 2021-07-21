<script>
  import { mdiCloseCircle } from "@mdi/js";

  import {
    AppBar,
    Button,
    Dialog,
    ExpansionPanel,
    ExpansionPanels,
    Icon,
    List,
    ListItem,
  } from "svelte-materialify";
  import { navigate, useLocation } from "svelte-navigator";
  import { filterRoute } from "./Route";

  export let data;
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
  let value = [0, 1];
  let valueWP = [0];
  $: if (person !== null && person !== undefined) {
    wahlperioden = person.wahlperioden.reverse();
  }

  function onClose() {
    value = [0, 1];
    valueWP = [0];
    navigate(-1);
  }
</script>

<Dialog
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
        <Button icon on:click={() => onClose()}>
          <Icon path={mdiCloseCircle} />
        </Button>
      </div>
    </AppBar>
    <div style="display: inline-flex; width: 100%; max-height: 800px">
      <div style="width:70%; margin: 1rem;overflow-y: auto;">
        <ExpansionPanels multiple flat bind:value>
          <ExpansionPanel>
            <span slot="header"
              ><p style="font-size: 12pt; font-weight: bold;">
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
