<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { Link, navigate } from "svelte-navigator";

  let pieDiv;
  let selected; // selected party link
  export let data;

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
      .attr("d", arc)
      .attr("cursor", "pointer")
      .attr("id", (d) => "party" + d.link)
      .on("click", (d) => {
        if (selected !== d.target.__data__.link) {
          if (selected !== undefined)
            d3.select("#party" + selected).style("scale", "1.0");
          selected = d.target.__data__.link;
        }
        let link = d.target.__data__.link;
        navigate("/party/" + link, { replace: true });
      })
      .on("mouseover", (d) => {
        d3.select(d.target).style("scale", "1.1");
      })
      .on("mouseout", (d) => {
        if (selected === undefined || selected !== d.target.__data__.link)
          d3.select(d.target).style("scale", "1.0");
      });
  });
  function selectParty(party) {
    if (selected !== undefined)
      d3.select("#party" + selected).style("scale", "1.0");
    selected = party;
    d3.select("#party" + selected).style("scale", "1.1");
  }
</script>

<div>
  <svg bind:this={pieDiv} width="300" height="200" />
  <ul>
    {#each data.sort((a, b) => a.seats < b.seats) as party}
      <Link
        to="/party/{party.link}"
        on:click={() => {
          selectParty(party.link);
          console.log(selected);
        }}
      >
        {#if selected === party.link}
          <li class="link active">{party.name}</li>
        {:else}
          <li class="link">{party.name}</li>
        {/if}
      </Link>
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
