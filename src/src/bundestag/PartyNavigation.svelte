<script>
  import { onMount, createEventDispatcher } from "svelte";
  import * as d3 from "d3";

  const dispatcher = createEventDispatcher();

  export let data;
  export let partySelected;

  function onToggle(party, link) {
    dispatcher("on-toggle", party);
    d3.select("#party" + link).style(
      "scale",
      partySelected(party) ? "1.1" : "1.0"
    );
  }

  let pieDiv;
  onMount(() => {
    let pie = d3
      .pie()
      .sort(null)
      .startAngle(-0.7 * Math.PI)
      .endAngle(0.7 * Math.PI);

    let arc = d3.arc().innerRadius(20).outerRadius(100);

    let seats = data.sort((a, b) => a.order > b.order).map((d) => d.seats);
    let arcData = pie(seats);
    arcData.forEach((element, i) => {
      element["name"] = data[i].name;
      element["partei_id"] = data[i].partei_id;
      element["color"] = data[i].color;
      element["link"] = data[i].link;
    });

    pieDiv = d3
      .select(pieDiv)
      .append("g")
      .attr("transform", "translate(150, 125)")
      .selectAll("path")
      .data(arcData)
      .enter()
      .append("path")
      .style("fill", (d) => d.color)
      .style("stroke", "white")
      .style("stroke-linecap", "round")
      .style("scale", (d) => (partySelected(d.partei_id) ? "1.1" : "1.0"))
      .attr("d", arc)
      .attr("cursor", "pointer")
      .attr("id", (d) => "party" + d.link)
      .on("click", (d) => {
        onToggle(d.target.__data__.partei_id, d.target.__data__.link);
      })
      .on("mouseover", (d) => {
        d3.select(d.target).style("scale", "1.1");
      })
      .on("mouseout", (d) => {
        if (!partySelected(d.target.__data__.partei_id))
          d3.select(d.target).style("scale", "1.0");
      });
  });
</script>

<div>
  <svg bind:this={pieDiv} width="300" height="200" />
  <ul>
    {#each data.sort((a, b) => a.seats < b.seats) as party}
      {#if partySelected(party.partei_id)}
        <li
          class="link active"
          on:click={() => onToggle(party.partei_id, party.link)}
        >
          {party.name}
        </li>
      {:else}
        <li class="link" on:click={() => onToggle(party.partei_id, party.link)}>
          {party.name}
        </li>
      {/if}
    {/each}
  </ul>
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
    padding: 10px 16px;
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    background-color: rgb(50, 50, 148);
    color: white;
  }

  .active {
    background-color: rgb(8, 8, 102);
    color: white;
    font-weight: bold;
  }
</style>
