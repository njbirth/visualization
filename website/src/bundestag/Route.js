export function filterRoute(route) {
  let x = route
    .replaceAll(" ", "-")
    .replaceAll("%20", "-")
    .replaceAll("ß", "ss")
    .replaceAll("ğ", "g")
    .replaceAll("ö", "oe")
    .replaceAll("ä", "ae")
    .replaceAll("ü", "ue")
    .replaceAll("Ö", "Oe")
    .replaceAll("Ä", "Ae")
    .replaceAll("Ü", "Ue")
    .replaceAll("é", "e")
    .replaceAll("è", "e")
    .replaceAll("ê", "e")
    .replaceAll("É", "E")
    .replaceAll("È", "E")
    .replaceAll("Ê", "E")
    .replaceAll("ô", "o")
    .replaceAll("ò", "o")
    .replaceAll("ó", "o");
  return x;
}
