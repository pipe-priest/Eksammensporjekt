import dijkstraAlgoritmeSammeEtage from "./algoritme.js";

const lokaler = [
  { id: "gangareal_1", x: -38.29 , y: 18.83 },
  { id: "gangareal_2", x: -38.00 , y: 24.00 },
  { id: "gangareal_3", x: -28.45, y: 25.11 },
  { id: "gangareal_4", x: -29.82, y: 17.64 },
  { id: "gangareal_5", x: -21.90 , y: 21.05 },
  { id: "gangareal_6", x: -14.05, y: 16.87 },
  { id: "gangareal_7", x: -13.51, y: 25.3 },   
  { id: "aula", x: -5.4, y: 17.16 },
  { id: "gangareal_8", x: 0 , y: 25.50 },
  { id: "kantine", x: 0, y: 32.84 },
  { id: "gangareal_9", x: 13.75, y: 25.59 },
  { id: "gangareal_10", x: 28.03, y: 24.36 },
  { id: "gangareal_11", x: 41.20, y: 25.55 },
  { id: "gangareal_12", x: 41.65, y: 17.63 },
  { id: "gangareal_13", x: 47.43, y: 14.96 },
  { id: "gangareal_14", x: 49.77, y: 27.27 },
  { id: "gangareal_15", x: 51.06, y: 22.18 },
  { id: "stue_001", x: -48, y: 24 },
  { id: "stue_002", x: -22.85, y: 10.37 },
  { id: "stue_003", x: -30.1, y: 12.86 },
  { id: "stue_003b", x: -29.88, y: 8.69 },
  { id: "stue_004", x: -38.19, y: 12.33 },
  { id: "stue_005", x: -13.11, y: 10.08 },
  { id: "stue_006", x: -57.55, y: 35 },
  { id: "stue_007a", x: -40.55, y: 32.84 },
  { id: "stue_007b", x: -50.71, y: 34.7 },
  { id: "stue_009", x: -28, y: 32 },
  { id: "stue_010", x: -20, y: 32 },
  { id: "stue_010a", x: -20.39, y: 27.47 },
  { id: "stue_011a", x: -36.31, y: 27.10 },
  { id: "stue_011b", x: -33.85, y: 27.10 },
  { id: "stue_012", x: -18.12, y: 27.13 },
  { id: "stue_015", x: -25.01, y: 15.24 },
  { id: "stue_026", x: -27, y: 21.56 },
  { id: "stue_027a", x: -7.4, y: 32.89 },
  { id: "stue_027b", x: -11.85, y: 32.93 },
  { id: "stue_028", x: 8.13, y: 16.58 },
  { id: "stue_029", x: 14.09, y: 35.43 },
  { id: "stue_030", x: 18.88, y: 35.26 },
  { id: "stue_033", x: 12.58, y: 31.69 },
  { id: "stue_034", x: 10.23, y: 28.63 },
  { id: "stue_036", x: 14.13, y: 28.5 },
  { id: "stue_037", x: 31.91, y: 32.43 },
  { id: "stue_038", x: 47.59, y: 33.7 },
  { id: "stue_041", x: 22, y: 6 },
  { id: "stue_045", x: 27.87, y: 6.25 },
  { id: "stue_049", x: 22.61, y: 22.96 },
  { id: "stue_050", x: 22.7, y: 21.03 },
  { id: "stue_068", x: 26.64, y: 17.21 },
  { id: "stue_070", x: 36, y: 19.58 },
  { id: "stue_072", x: 54.38, y: 24.31 },
  { id: "stue_073", x: 53.18, y: 19.23 },
  { id: "stue_074", x: 47.89, y: 10.88 },
  { id: "stue_075", x: 55.1, y: 32.89 },
  { id: "stue_076", x: 55.6, y: 14.28 },
  { id: "stue_077", x: 41.01, y: 8.32 },
  { id: "stue_079", x: 46.58, y: 22.75 },
];


function bygLokalePar(lokaler) {
  return [lokaler.id, { x: lokaler.x, y: lokaler.y }];// Omdanner array af lokaler til et format der er nemmere at slå op i algoritmen, hvor id er nøglen og koordinaterne er værdien
}
const lokaleMap = Object.fromEntries(lokaler.map(bygLokalePar));// Opretter et map for hurtig opslag af lokaler baseret på id


// Nummer-til-lokale mapping
// Her bruger vi nøgler som tal fra input til at slå 'stue_XXX' nøgle op.
// Kaldes lokaleId i algoritme.js
const lokaleId = {
  1: "stue_001",
  2: "stue_002",
  3: "stue_003",
  3.1: "stue_003b",
  4: "stue_004",
  5: "stue_005",
  6: "stue_006",
  7: "stue_007a",
  8: "stue_007b",
  9: "stue_009",
  10: "stue_010",
  11: "stue_011a",
  12: "stue_012",
  15: "stue_015",
  26: "stue_026",
  27: "stue_027a",
  27.1: "stue_027b",
  28: "stue_028",
  29: "stue_029",
  30: "stue_030",
  33: "stue_033",
  34: "stue_034",
  36: "stue_036",
  37: "stue_037",
  38: "stue_038",
  41: "stue_041",
  45: "stue_045",
  49: "stue_049",
  50: "stue_050",
  68: "stue_068",
  70: "stue_070",
  72: "stue_072",
  73: "stue_073",
  74: "stue_074",
  75: "stue_075",
  76: "stue_076",
  77: "stue_077",
  79: "stue_079"
};



const døre = [
  ["dør_001", { x: -40.39, y: 21.6 }, "stue_001", "gangareal_2"],
  ["dør_002", { x: -38.86, y: 20.35 }, "gangareal_1", "gangareal_2"],
  ["dør_003", { x: -40.93, y: 17.45 }, "gangareal_1", "stue_004"],
  ["dør_004", { x: -35.28, y: 18.17 }, "gangareal_1", "gangareal_4"],
  ["dør_005", { x: -35.67, y: 25.19 }, "gangareal_2", "stue_011b"],
  ["dør_006", { x: -34.45, y: 25.19 }, "gangareal_2", "stue_011a"],
  ["dør_007", { x: -32.51, y: 24.61 }, "gangareal_2", "gangareal_3"],
  ["dør_008", { x: -31.51, y: 26.55 }, "gangareal_3", "stue_007a"],
  ["dør_009", { x: -28.1, y: 25.55 }, "gangareal_3", "stue_009"],
  ["dør_010", { x: -30.6, y: 29.5 }, "stue_007a", "stue_009"],
  ["dør_011", { x: -50.6, y: 32.2 }, "stue_007a", "stue_007b"],
  ["dør_012", { x: -57.2, y: 32.2 }, "stue_007a", "stue_006"],
  ["dør_013", { x: -23.84, y: 28.5 }, "stue_009", "stue_010"], 
  ["dør_014", { x: -24, y: 25 }, "gangareal_3", "gangareal_5"],
  ["dør_015", { x: -24, y: 18 }, "gangareal_4", "gangareal_5"],
  ["dør_016", { x: -24.77, y: 17.07 }, "gangareal_4", "stue_015"],
  ["dør_017", { x: -28.73, y: 16.07 }, "gangareal_4", "stue_003"],
  ["dør_018", { x: -28.59, y: 9.86 }, "stue_003", "stue_003b"],
  ["dør_019", { x: -27.27, y: 12 }, "stue_003", "stue_002"],
  ["dør_020", { x: -20.5, y: 13.5 }, "gangareal_5", "stue_002"],
  ["dør_021", { x: -22.64, y: 26.64 }, "gangareal_5", "stue_010"],
  ["dør_022", { x: -19.5, y: 17 }, "gangareal_5", "gangareal_6"],
  ["dør_023", { x: -19.9, y: 24.7 }, "gangareal_5", "gangareal_7"],
  ["dør_024", { x: -21.61, y: 27.65 }, "stue_010", "stue_010a"],
  ["dør_025", { x: -16.75, y: 27.10 }, "stue_012", "gangareal_7"],
  ["dør_026", { x: -30, y: 20 }, "stue_026", "gangareal_4"],
  ["dør_027", { x: -12.8, y: 26.9 }, "stue_027b", "gangareal_7"],
  ["dør_028", { x: -8, y: 25.5 }, "gangareal_8", "gangareal_7"],
  ["dør_029", { x: -11.79, y: 15 }, "gangareal_6", "stue_005"],
  ["dør_030", { x: -8.25, y: 17.1 }, "gangareal_6", "aula"],
  ["dør_031", { x: -3.7, y: 24.14 }, "aula", "gangareal_8"],
  ["dør_032", { x: -4.5, y: 27.5 }, "gangareal_8", "kantine"],
  ["dør_033", { x: 7.9, y: 25.5 }, "gangareal_8", "gangareal_9"],
  ["dør_034", { x: 5.5, y: 23.5 }, "gangareal_8", "stue_028"],
  ["dør_035", { x: 0, y: 16 }, "stue_028", "aula"],
  ["dør_036", { x: 20.55, y: 9.5 }, "stue_028", "stue_068"],
];

// Lav node-id til ALLE lokaler/gangarealer/aula/kantine
const nodeNavnTilId = Object.fromEntries(
  lokaler.map((lokale, index) => [lokale.id, index + 1])
);

// Brug samme id'er til lokaleArray
const lokaleArray = lokaler.map((lokale, index) => [
  index + 1,
  lokale.id,
  lokale.id.startsWith("gangareal") ? "korridor" : "lokale",
  [lokale.x, lokale.y, 0]
]);

// Nummer-fra-input -> node-id
const brugerLokaleTilNodeId = Object.fromEntries(
  Object.entries(lokaleId).map(([nr, navn]) => [Number(nr), nodeNavnTilId[navn]])
);

 
/*function invertLokaleId([nr, navn]) { // input: [nummer, lokale_navn]
  return [navn, Number(nr)]; // output: [lokale_navn, nummer_som_tal]
}

const localeNavnTilId = Object.fromEntries( // lav et objekt fra par-liste
  Object.entries(lokaleId).map(invertLokaleId) // omdanner lokaleId til omvendt mapping
);
*/

function lokaleEntryToArray([nr, navn]) { // input: [nummer, lokale_navn]
  const coords = lokaleMap[navn]; // slå koordinater op fra localeMap
  if (!coords) { // hvis lokalets koordinater ikke findes
    throw new Error(`Koordinater mangler for ${navn}`); // fejl stop
  }
  return [Number(nr), navn, "lokale", [coords.x, coords.y, 0]]; // bygg array-objekt til dijkstra
}


const dørArray = døre.map(([dørId, coords, fra_LokaleId, til_LokaleId]) => { // input: [id for døren, dørens placering, første forbinelse til lokale, anden forbinelse til lokale]
  const fraId = nodeNavnTilId[fra_LokaleId]; // slå lokaleId op for 1. lokale
  const tilId = nodeNavnTilId[til_LokaleId]; // slå lokaleId op for 2. lokale
  if (fraId == null || tilId == null)  { // hvis en af lokalernes id'er ikke findes i mapping
    throw new Error(`Dør ${dørId} forbinder ukendt lokale ${fra_LokaleId} eller ${til_LokaleId}`); // fejl stop med info om hvilken dør og hvilket lokale der er problemet
  }
  return [dørId, [coords.x, coords.y, 0], fraId, tilId, "lokaleTilLokale"];// bygg array-objekt til dijkstra
});



function findVej() {

  const startVerdi = document.getElementById("start").value.trim();// afæser værdi fra start inputfeltet i index.html filen
  const slutVerdi = document.getElementById("slut").value.trim();// afæser værdi fra slut inputfeltet i index.html filen

  const startNr = Number(startVerdi);// Konvertere til tal typen så nummeret kan bruges til finde navnet til lokalets placering i det øverste array
  const slutNr = Number(slutVerdi);// Konvertere til tal typen så nummeret kan bruges til finde navnet til lokalets placering i det øverste array

  // validering: sikre at tallene er gyldige og ikke tomme strenge, hvis ikke alt er i orden sendes en fejlmeddelelse i konsollen
  if (Number.isNaN(startNr) || Number.isNaN(slutNr) || startVerdi === "" || slutVerdi === "") {
    console.warn("Indtast gyldige start- og slutnumre, f.eks. 1 eller 10");
    return;
  }

  const startnøgle = lokaleId[startNr]; // bruger start input nummeret til at finde "nøglen" der passer til lokalet
  const slutnøgle = lokaleId[slutNr]; // bruger slut input nummeret til at finde "nøglen" der passer til lokalet

  // Find koordinater via det nye array-format
  const startLokale = lokaleMap[startnøgle];
  const slutLokale = lokaleMap[slutnøgle];

// sender fejmeddelelse, hvis koordinaterne ikke findes
  if (!startLokale || !slutLokale) { 
    console.warn("Kan ikke finde koordinater for start eller slut lokale."); 
    return;
  }

  // printer start og slut lokale, samt intastet numre i consollen
  console.log("Start:", startNr, "->", startnøgle, startLokale);
  console.log("Slut:", slutNr, "->", slutnøgle, slutLokale);

  // Hent lokaleId'er til Dijkstra fra nummer-til-navn mapping
 const startLokaleId = brugerLokaleTilNodeId[startNr];
const slutLokaleId = brugerLokaleTilNodeId[slutNr];

  // Kontrollere at numrene findes
if (startLokaleId == null || slutLokaleId == null) {
  console.warn("Start- eller slutlokale kunne ikke oversættes til graf-id.");
  return;
}

  const resultat = dijkstraAlgoritmeSammeEtage(lokaleArray, dørArray, startLokaleId, slutLokaleId); // kørre dijkstra algoritmen
  console.log("Resultat:", resultat); // printer dijkstra algoritmens resultat

  const outputElement = document.getElementById("vejResultat");
  if (outputElement) {
    outputElement.textContent = resultat;
  }
}

// Gør funktionen tilgængelig globalt for onclick i index.html
window.findVej = findVej;
