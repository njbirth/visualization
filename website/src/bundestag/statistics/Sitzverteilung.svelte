<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import α from "color-alpha";
  import { extractPartyIdentifiers, extractPartySeats } from "./Sitzverteilung";

  export let parties;
  export let mps;
  export let selected;

  function getColors(parties, labels, selected) {
    console.log(parties)
    parties.sort((a, b) => b.seats - a.seats);
    let partyColors = extractPartyIdentifiers(parties, "color");
    let partyColorsAlpha = partyColors.map((color) => α(color, 0.7));
    let partyColorsDeselect = extractPartyIdentifiers(parties, "colorDeselect");
    let partyColorsDeselectAlpha = partyColorsDeselect.map((color) =>
      α(color, 0.4)
    );

    let colors = labels.map((party, i) => {
      if (selected.includes(party)) {
        console.log(selected.includes(party));
        return partyColors[i];
      } else return partyColorsDeselect[i];
    });
    let colorsAlpha = labels.map((party, i) => {
      if (selected.includes(party)) return partyColorsAlpha[i];
      else return partyColorsDeselectAlpha[i];
    });

    return [colors, colorsAlpha];
  }

  $: parties.sort((a, b) => b.seats - a.seats);
  let partyIdentifiers;
  $: partyIdentifiers = extractPartyIdentifiers(parties);
  let partyLabels;
  $: partyLabels = extractPartyIdentifiers(parties, "name");

  let colors = [];

  $: colors = getColors(parties, partyIdentifiers, selected);

  let partySeats;
  $: partySeats = extractPartyIdentifiers(parties, "seats");
  // let partySeats = partyIdentifiers.map((element) => {
  //   extractPartySeats(mps, element);
  // });

  let data;
  $: data = {
    labels: partyLabels,
    datasets: [
      {
        label: "Sitzplätze",
        data: partySeats,
        backgroundColor: colors[1],
        borderWidth: 2,
        borderColor: colors[0],
      },
    ],
  };

  let options = {
    responsive: true,
    animation: {
        duration: 0
    },
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
</script>

<Bar {data} {options} />
