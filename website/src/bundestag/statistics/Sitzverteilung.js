export function extractPartyIdentifiers(data, identifier = "partei_id") {
  return data.map((element) => element[identifier]);
}

export function extractPartySeats(data, name, identifier = "partei_id") {
  return data.filter((element) => element[identifier] === name);
}
