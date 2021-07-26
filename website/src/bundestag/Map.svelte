<script>
  import wahlkreise from "../../../data/map/wahlkreise.json";
  import wahlkreise_stimmen from "../../../data/map/wahlkreise_stimmen/wahlkreise_stimmen.json";
  import L from "leaflet";
  import { onMount } from "svelte";
  import { ButtonGroup, ButtonGroupItem } from "svelte-materialify";

  let stimmen = "erststimmen";
  let selected = null;

  let geojson = L.geoJSON(wahlkreise, {
    style: style,
    onEachFeature: onEachFeature,
  });

  let component;
  onMount(() => {
    let map = L.map(component, {
      center: [51.1642, 10.4541],
      zoom: 6,
      minZoom: 6,
      maxZoom: 9,
      doubleClickZoom: false,
      maxBounds: [
        [46.0, 5.0],
        [56.0, 22.0],
      ],
      attributionControl: false,
    });

    geojson.addTo(map);
    info.addTo(map);
  });

  // info panel to show vote data
  let info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };

  info.update = function (feature) {
    if (feature == null)
      this._div.innerHTML =
        "<b>Bundesgebiet</b><hr>Klicke auf einen Wahlkreis.";
    else {
      let data = wahlkreise_stimmen.find(function (elem) {
        return elem.nr == feature.properties.WKR_NR;
      });
      let votes = data[stimmen];
      let votes_list = [];
      for (let key in votes) votes_list.push([votes[key], key]);
      votes_list = votes_list.sort((a, b) => {
        return b[0] - a[0];
      });
      let all_votes = data[stimmen + "_gültig"];
      let content = "<b>" + feature.properties.WKR_NAME + "</b><hr>";
      content += "<table>";
      for (let vote in votes_list) {
        vote = votes_list[vote];
        content +=
          "<tr><td>" +
          vote[1] +
          "&nbsp;&nbsp;&nbsp;</td><td>" +
          ((vote[0] / all_votes) * 100).toFixed(2) +
          "%</td><td>(" +
          vote[0].toLocaleString() +
          ")</td></tr>";
      }
      content += "</table>";
      this._div.innerHTML = content;
    }
  };

  // Just reload everything (used when toggling between Erstimmen and Zweitstimmen)
  function updateView() {
    geojson.resetStyle();
    info.update(selected);
  }

  // style for Wahlkreise
  function style(feature) {
    let colors = {
      "CDU/CSU": "black",
      GRÜNE: "green",
      FDP: "yellow",
      AfD: "blue",
      SPD: "red",
      "DIE LINKE.": "magenta",
    };

    let wkr = feature.properties.WKR_NR;

    let data = wahlkreise_stimmen.find(function (elem) {
      return elem.nr == wkr;
    });

    let most = Object.keys(data[stimmen]).reduce(function (a, b) {
      return data[stimmen][a] > data[stimmen][b] ? a : b;
    });

    return {
      fillColor: colors[most],
      weight: selected != null && wkr == selected.properties.WKR_NR ? 2.0 : 1.0,
      opacity: 1,
      color: "white",
      fillOpacity:
        selected != null && wkr == selected.properties.WKR_NR ? 1.0 : 0.6,
    };
  }

  // Execute for each Wahlkreis
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: selectWkr,
    });

    layer.bindTooltip(feature.properties.WKR_NAME, {
      direction: "left",
      offset: [-20, 0],
      sticky: true,
    });
  }

  // Mouseover (in)
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      fillOpacity: 1.0,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  // Mouseover (out)
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  // Select Wahlkreis and update info
  function selectWkr(e) {
    let feature = e.target.feature;
    let wkr = feature.properties.WKR_NR;
    let selected_wkr = selected == null ? null : selected.properties.WKR_NR;

    selected = selected_wkr == wkr ? null : feature;

    info.update(selected);
    geojson.resetStyle();
  }
</script>

<div class="text-center" style="margin: 15px">
  <ButtonGroup
    mandatory
    activeClass="red white-text"
    bind:value={stimmen}
    on:change={updateView}
  >
    <ButtonGroupItem value="erststimmen">Erststimmen</ButtonGroupItem>
    <ButtonGroupItem value="zweitstimmen">Zweitstimmen</ButtonGroupItem>
  </ButtonGroup>
</div>

<div
  bind:this={component}
  style="width: 900px; height: 620px; background: #fff;"
/>
