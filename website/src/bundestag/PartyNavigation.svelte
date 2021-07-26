<script>
  import { onMount, createEventDispatcher } from "svelte";
  import * as d3 from "d3";
  import {
    Button,
    Checkbox,
    Icon,
    ListItem,
    ListItemGroup,
  } from "svelte-materialify";
  import { mdiCheckboxMultipleBlank, mdiCheckboxMultipleBlankOutline, mdiCheckboxMultipleMarked, mdiPen } from "@mdi/js";
  const dispatcher = createEventDispatcher();

  export let meta;
  export let partySelected;

  function onToggle(party, link) {
    dispatcher("on-toggle", party);
    d3.select("#party" + link)
      .attr("transform", partySelected(party) ? "scale(1.1)" : "scale(1.0)")
      .select("path")
      .style("fill", (d) =>
        partySelected(d.partei_id) ? d.color : d.colorDeselect
      );
  }

  function onSelectAll() {
    dispatcher("select-all");
    meta.forEach((element) => {
      d3.select("#party" + element.link)
        .attr("transform", "scale(1.1)")
        .select("path")
        .style("fill", (d) => d.color);
    });
  }

  function onDeselectAll() {
    dispatcher("deselect-all");
    meta.forEach((element) => {
      d3.select("#party" + element.link)
        .attr("transform", "scale(1.0)")
        .select("path")
        .style("fill", (d) => d.colorDeselect);
    });
  }

  let pieDiv;
  onMount(() => {
    let pie = d3
      .pie()
      .sort(null)
      .startAngle(-0.7 * Math.PI)
      .endAngle(0.7 * Math.PI);

    let arc = d3.arc().innerRadius(20).outerRadius(100);

    let seats = meta.sort((a, b) => a.order - b.order).map((d) => d.seats);
    let arcData = pie(seats);
    arcData.forEach((element, i) => {
      element["name"] = meta[i].name;
      element["partei_id"] = meta[i].partei_id;
      element["color"] = meta[i].color;
      element["colorDeselect"] = meta[i].colorDeselect;
      element["link"] = meta[i].link;
    });

    pieDiv = d3
      .select(pieDiv)
      .append("g")
      .attr("transform", "translate(128, 125)")
      .selectAll("g")
      .data(arcData)
      .enter()
      .append("g")
      .attr("transform", (d) =>
        partySelected(d.partei_id) ? "scale(1.1)" : "scale(1.0)"
      )
      .attr("id", (d) => "party" + d.link)
      .append("path")
      .style("fill", (d) =>
        partySelected(d.partei_id) ? d.color : d.colorDeselect
      )
      .style("stroke", "white")
      .attr("d", arc)
      .attr("cursor", "pointer")
      .on("click", (d) => {
        onToggle(d.target.__data__.partei_id, d.target.__data__.link);
      })
      .on("mouseover", (d) => {
        d3.select(d.target.parentNode).attr("transform", "scale(1.1)");
      })
      .on("mouseout", (d) => {
        if (!partySelected(d.target.__data__.partei_id))
          d3.select(d.target.parentNode).attr("transform", "scale(1.0)");
      });
  });
</script>

<div>
  <svg bind:this={pieDiv} width="256" height="200" />
  <div class="margin">
    <ListItemGroup activeClass="inactive">
      {#each meta.sort((a, b) => b.seats - a.seats) as party}
        <ListItem
          value={party.partei_id}
          on:click={() => onToggle(party.partei_id, party.link)}
          on:dblclick={() => {
            onDeselectAll();
            onToggle(party.partei_id, party.link);
          }}
        >
          <span slot="prepend">
            <Checkbox
              style="margin-right: 0px;"
              checked={partySelected(party.partei_id)}
              value={party.partei_id}
            />
          </span>
          {party.partei_id}</ListItem
        >
      {/each}
    </ListItemGroup>
    <div class="text-center" style="margin-top: 1em;">
      <span>
        <Button
          outlined
          size="small"
          style="width: 45%;"
          margin="5px;"
          on:click={onSelectAll}
        >
          <Icon path={mdiCheckboxMultipleMarked} class="mr-3" />
          Alle
        </Button>
      </span>
      <span>
        <Button
          outlined
          size="small"
          style="width: 45%;"
          on:click={onDeselectAll}
        >
          <Icon path={mdiCheckboxMultipleBlankOutline} class="mr-3" />
          Keine</Button
        ></span
      >
    </div>
  </div>
</div>

<style>
  .margin {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
