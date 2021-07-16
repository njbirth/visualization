<script>
  import { onMount, createEventDispatcher } from "svelte";
  import * as d3 from "d3";
  import CheckboxBlankOutline from "svelte-material-icons/CheckboxBlankOutline.svelte";
  import CheckboxMarked from "svelte-material-icons/CheckboxMarked.svelte";
  const dispatcher = createEventDispatcher();

  export let data;
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
    data.forEach((element) => {
      d3.select("#party" + element.link)
        .attr("transform", "scale(1.1)")
        .select("path")
        .style("fill", (d) => d.color);
    });
  }

  function onDeselectAll() {
    dispatcher("deselect-all");
    data.forEach((element) => {
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

    let seats = data.sort((a, b) => a.order - b.order).map((d) => d.seats);
    let arcData = pie(seats);
    arcData.forEach((element, i) => {
      element["name"] = data[i].name;
      element["partei_id"] = data[i].partei_id;
      element["color"] = data[i].color;
      element["colorDeselect"] = data[i].colorDeselect;
      element["link"] = data[i].link;
    });

    pieDiv = d3
      .select(pieDiv)
      .append("g")
      .attr("transform", "translate(150, 125)")
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
        console.log(d);
        d3.select(d.target.parentNode).attr("transform", "scale(1.1)");
      })
      .on("mouseout", (d) => {
        console.log(d);

        if (!partySelected(d.target.__data__.partei_id))
          d3.select(d.target.parentNode).attr("transform", "scale(1.0)");
      });
  });
</script>

<div>
  <svg bind:this={pieDiv} width="300" height="200" />
  <ul>
    {#each data.sort((a, b) => b.seats - a.seats) as party}
      {#if partySelected(party.partei_id)}
        <li
          class="link active"
          on:click={() => onToggle(party.partei_id, party.link)}
        >
          <div style="float: left; margin-right: 12px;">
            <CheckboxMarked height="32" width="32" />
          </div>
          <div style="padding-top: 6px;">{party.name}</div>
        </li>
      {:else}
        <li class="link" on:click={() => onToggle(party.partei_id, party.link)}>
          <div style="float: left; margin-right: 12px;">
            <CheckboxBlankOutline height="32" width="32" />
          </div>
          <div style="padding-top: 6px;">{party.name}</div>
        </li>
      {/if}
    {/each}
  </ul>
  <button on:click={onSelectAll}>Alle markieren</button>
  <button on:click={onDeselectAll}>Reset</button>
</div>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  .link {
    display: block;
    color: #000;
    padding: 8px 10px 12px 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    background-color: rgb(50, 50, 148);
    color: white;
  }

  .active {
    color: rgb(8, 8, 102);
    background-color: white;
    font-weight: bold;
  }

  button {
    margin-left: 10px;
  }
</style>
