<script>
  import wahlkreise from "../../../data/map/wahlkreise.json";
  import wahlkreise_stimmen from "../../../data/map/wahlkreise_stimmen/wahlkreise_stimmen.json";
  import L from "leaflet";
  import { onMount } from "svelte";
  import { ButtonGroup, ButtonGroupItem } from "svelte-materialify";

  export let meta;

  let stimmen = "erststimmen";
  let partei = "alle";
  let selected = null;

  
  // Calculate the best result for each party
  let max_frac = {
    "erststimmen": {
      "CDU/CSU": 0,
      "SPD": 0,
      "AfD": 0,
      "FDP": 0,
      "DIE LINKE.": 0,
      "GRÜNE": 0
    },
      "zweitstimmen": {
      "CDU/CSU": 0,
      "SPD": 0,
      "AfD": 0,
      "FDP": 0,
      "DIE LINKE.": 0,
      "GRÜNE": 0
    }
  }

  for(let i in wahlkreise_stimmen) {
    let kreis = wahlkreise_stimmen[i];
    let parteinamen = ["CDU/CSU", "SPD", "AfD", "FDP", "DIE LINKE.", "GRÜNE"];

    for(let j in parteinamen) {
      let parteiname = parteinamen[j];

      let frac_erststimmen = kreis["erststimmen"][parteiname] / kreis["erststimmen_gültig"];
      if(frac_erststimmen > max_frac["erststimmen"][parteiname])
        max_frac["erststimmen"][parteiname] = frac_erststimmen;

      let frac_zweitstimmen = kreis["zweitstimmen"][parteiname] / kreis["zweitstimmen_gültig"];
      if(frac_zweitstimmen > max_frac["zweitstimmen"][parteiname])
        max_frac["zweitstimmen"][parteiname] = frac_zweitstimmen;
    }
  }

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
    if (feature == null) {
      this._div.innerHTML = "<b>Bundesgebiet</b><hr style=\"margin-top: 7px;margin-bottom: 7px;\">";
      this._div.innerHTML += getVotesTable(1000);
      this._div.innerHTML += "<hr style=\"margin-top: 7px;margin-bottom: 7px;\">Wahlkreis auswählen, um weitere Informationen zu erhalten";
    }
    else {   
      this._div.innerHTML = "<b>" + feature.properties.WKR_NAME + "</b><hr style=\"margin-top: 7px;margin-bottom: 7px;\">";
      this._div.innerHTML += getVotesTable(feature.properties.WKR_NR);
    }
  };

  // Auxiliary function
  function getVotesTable(wkrNr) {
    let data = wahlkreise_stimmen.find(function (elem) {
      return elem.nr == wkrNr;
    });
    let votes = data[stimmen];
    let votes_list = [];
    for (let key in votes) votes_list.push([votes[key], key]);
    votes_list = votes_list.sort((a, b) => {
      return b[0] - a[0];
    });
    let all_votes = data[stimmen + "_gültig"];

    let content = "<table>";
    for (let vote in votes_list) {
      vote = votes_list[vote];
      content +=
        "<tr><td>" +
        (partei == vote[1] ? "<b>" : "") +
        vote[1] +
        (partei == vote[1] ? "</b>" : "") +
        "&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" +
        (partei == vote[1] ? "<b>" : "") +
        ((vote[0] / all_votes) * 100).toFixed(2) + "%" +
        (partei == vote[1] ? "<b>" : "") +
        "</td><td>" + 
        (partei == vote[1] ? "<b>" : "") +
        "&nbsp;&nbsp;&nbsp;&nbsp;(" +
        vote[0].toLocaleString() + ")" +
        (partei == vote[1] ? "</b>" : "") +
        "</td></tr>";
    }
    content += "</table>";

    return content;
  }

  // Just reload everything (used when toggling between Erstimmen and Zweitstimmen)
  function updateView() {
    geojson.resetStyle();
    info.update(selected);
  }

  // style for Wahlkreise
  function style(feature) {
    //convert
    let colors = {};
    for (let i = 0; i < meta.length; i++) {
      colors[meta[i].partei_id] = meta[i].color;
    }

    let wkr = feature.properties.WKR_NR;

    let data = wahlkreise_stimmen.find(function (elem) {
      return elem.nr == wkr;
    });

    let color, opacity;
    if(partei == "alle") {
      let most = Object.keys(data[stimmen]).reduce(function (a, b) {
        return data[stimmen][a] > data[stimmen][b] ? a : b;
      });

      color = colors[most];
      opacity = 0.8;
    }
    else {
      color = colors[partei];
      opacity = 0.8 * (data[stimmen][partei] / data[stimmen + "_gültig"] / max_frac[stimmen][partei]);
    }

    return {
      fillColor: color,
      weight: selected != null && wkr == selected.properties.WKR_NR ? 2.0 : 1.0,
      opacity: 1,
      color: "white",
      fillOpacity:
        selected != null && wkr == selected.properties.WKR_NR ? 1.0 : opacity,
    };
  }

  // Execute for each Wahlkreis
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: selectWkr,
    });

    layer.bindTooltip("<div style=\"font-size: 11pt\">" + feature.properties.WKR_NAME + "</div", {
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
    <ButtonGroupItem class="button-group-item-size-small" value="erststimmen">Erststimmen</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="zweitstimmen">Zweitstimmen</ButtonGroupItem>
  </ButtonGroup>

  <ButtonGroup
    mandatory
    activeClass="blue white-text"
    bind:value={partei}
    on:change={updateView}
    style="margin-top: 0px"
  >
    <ButtonGroupItem class="button-group-item-size-small" value="alle">alle</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="CDU/CSU">CDU/CSU</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="SPD">SPD</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="AfD">AfD</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="FDP">FDP</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="DIE LINKE.">DIE LINKE.</ButtonGroupItem>
    <ButtonGroupItem class="button-group-item-size-small" value="GRÜNE">GRÜNE</ButtonGroupItem>
  </ButtonGroup>
</div>

<div
  bind:this={component}
  style="width: 1000px; height: 620px; background: #fff;"
/>
