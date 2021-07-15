<script>
  import PartyNavigation from "./PartyNavigation.svelte";
  import PartyOverview from "./PartyOverview.svelte";

  export let parties;
  export let mps;
  let selectedMPs = [];

  parties.forEach((element) => (element["selected"] = false));

  function toggleParty(event) {
    let selected = parties.find(
      (element) => element.partei_id === event.detail
    ).selected;
    parties.find((element) => element.partei_id === event.detail)["selected"] =
      !selected;
    parties = [...parties];
    let filtered = parties
      .filter((element) => element.selected)
      .map((element) => element.partei_id);
    console.log(filtered);
    selectedMPs = mps.filter((element) =>
      filtered.find((x) => x === element.partei_id)
    );
    selectedMPs = [...selectedMPs];
  }

  function partySelected(party) {
    let selectedParty = parties.find((element) => element.partei_id === party);
    return selectedParty === undefined ? false : selectedParty.selected;
  }
</script>

<div style="display: flex;">
  <div class="navigation">
    <PartyNavigation
      data={parties}
      {partySelected}
      on:on-toggle={toggleParty}
    />
  </div>
  <div style="width: 100%">
    {#if parties.find((element) => element.selected === true) !== undefined}
      <PartyOverview mps={selectedMPs} />
    {/if}
  </div>
</div>

<style>
  .navigation {
    width: 300;
  }
  
</style>
