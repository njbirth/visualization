<script>
  import Modal from "../ui/Modal.svelte";
  import PartyNavigation from "./PartyNavigation.svelte";
  import PartyOverview from "./PartyOverview.svelte";
  import Profile from "./Profile.svelte";

  export let parties;
  export let mps;

  // Array of MPs which are listed.
  let selectedMPs = [];

  parties.forEach((element) => (element["selected"] = true));
  update();

  function toggleParty(event) {
    let selected = parties.find(
      (element) => element.partei_id === event.detail
    ).selected;
    parties.find((element) => element.partei_id === event.detail)["selected"] =
      !selected;
    parties = [...parties];
    update();
  }

  function partySelected(party) {
    let selectedParty = parties.find((element) => element.partei_id === party);
    return selectedParty === undefined ? false : selectedParty.selected;
  }

  function update() {
    let filtered = parties
      .filter((element) => element.selected)
      .map((element) => element.partei_id);
    selectedMPs = mps.filter((element) =>
      filtered.find((x) => x === element.partei_id)
    );
    selectedMPs = [...selectedMPs];
  }

  // Selected MP for showing modal
  let mp = null;
</script>

<div style="display: flex;">
  <div class="navigation">
    <PartyNavigation
      data={parties}
      {partySelected}
      on:on-toggle={toggleParty}
      on:select-all={() => {
        parties.forEach((element) => {
          element["selected"] = true;
        });
        parties = [...parties];
        update();
      }}
      on:deselect-all={() => {
        parties.forEach((element) => {
          element["selected"] = false;
        });
        parties = [...parties];
        update();
      }}
    />
  </div>
  <div style="width: 100%">
    <PartyOverview
      mps={selectedMPs}
      on:select-mp={(event) => (mp = event.detail)}
    />
  </div>
</div>
{#if mp !== null}
  <Modal on:close={() => (mp = null)} on:cancel={() => (mp = null)}>
    <slot>
      <Profile
        vorname={mp.vorname}
        nachname={mp.nachname}
        akad_titel={mp.akad_titel}
        anrede_titel={mp.anrede_titel}
        beruf={mp.beruf}
        familienstand={mp.familienstand}
        geburtsdatum={mp.geburtsdatum}
        geburtsort={mp.geburtsort}
        geschlecht={mp.geschlecht}
        partei={mp.partei}
        partei_id={mp.partei_id}
        religion={mp.religion}
        sterbedatum={mp.sterbedatum}
        vita={mp.vita}
        wahlperioden={mp.wahlperioden}
      />
    </slot>
  </Modal>
{/if}

<style>
  .navigation {
    width: 300;
  }
</style>
