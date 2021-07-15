<script>
  import Wahlperiode from "./Wahlperiode.svelte";

  export let vorname;
  export let nachname;
  export let akad_titel;
  export let anrede_titel;
  export let beruf;
  export let familienstand;
  export let geburtsdatum;
  export let geburtsort;
  export let geschlecht;
  export let partei;
  export let partei_id;
  export let religion;
  export let sterbedatum;
  export let vita;
  export let wahlperioden = [];
  export let imageLink =
    "https://www.gruene-bundestag.de/fileadmin/media/gruenebundestag_de/MDB_Portraits/1600x900/Amtsberg-Luise.jpg";
</script>

<div style="display: flex;">
  <div class="profile">
    <h1>{nachname}, {vorname}</h1>
    <h2>Partei: {partei}</h2>
    <!-- <h3>Wahlkreis: {wahlkreis}; Bundesland: {bundesland}</h3> -->
    <!-- <p>Im Bundestag seit {historie_von}</p> -->
    <h3>Aufgabenbereiche & Expertisen</h3>
    <ul>
      <li><span><b>Beruf: </b></span><span>{beruf}</span></li>
      <li>
        <b>Aufgaben:</b>
        <ul>
        </ul>
      </li>
    </ul>

    <h3>Abstimmungsverhalten</h3>
    <p>19. Legislaturperiode</p>

    <h3>Wahlperioden</h3>
    <ul>
      <!-- {#each wahlperioden as wp}
        <li class="wp"><Wahlperiode /></li>
      {/each} -->
    </ul>
  </div>
  <div class="steckbrief">
    <img
      alt="{nachname}, {vorname}"
      src={imageLink}
      width="100%"
      height="auto"
    />
    <h3>Persönliche Daten</h3>
    <ul>
      <li><span><b>Geschlecht: </b></span><span>{geschlecht}</span></li>
      <li><span><b>Geburtstag: </b></span><span>{geburtsdatum}</span></li>
      <li><span><b>Geburtsort: </b></span><span>{geburtsort}</span></li>
      <li><span><b>Familienstand: </b></span><span>{familienstand}</span></li>
    </ul>
  </div>
</div>

<style>
  .profile {
    width: 70%;
  }
  .steckbrief {
    width: 30%;
    margin-top: 1em;
    margin-right: 2em;
  }
  .wp {
    list-style-type: none;
  }
</style>
