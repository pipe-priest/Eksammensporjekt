import dijkstraAlgoritmeSammeEtage from "./algoritme.js";

const lokaler = [
  { id: "aula", x: 0.11, y: 17.47 },
  { id: "kantine", x: 0.34, y: 32.84 },
  { id: "stue_001", x: -48, y: 24 },
  { id: "stue_002", x: -22.85, y: 10.37 },
  { id: "stue_003", x: -30.1, y: 12.86 },
  { id: "stue_004", x: -38.19, y: 12.33 },
  { id: "stue_005", x: -13.11, y: 10.08 },
  { id: "stue_006", x: -57.55, y: 35 },
  { id: "stue_009", x: -28, y: 32 },
  { id: "stue_010", x: -20, y: 32 },
  { id: "stue_012", x: -18.12, y: 27.13 },
  { id: "stue_026", x: -27, y: 21.56 },
  { id: "stue_028", x: 8.13, y: 16.58 },
  { id: "stue_029", x: 14.09, y: 35.43 },
  { id: "stue_030", x: 18.88, y: 35.26 },
  { id: "stue_033", x: 9.81, y: 32.79 },
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
  { id: "stue_076", x: 55.6, y: 14.28 },
  { id: "stue_077", x: 41.01, y: 8.32 },
  { id: "stue_079", x: 46.58, y: 22.75 },
  { id: "stue_003b", x: -29.88, y: 8.69 },
  { id: "stue_007a", x: -40.03, y: 32.81 },
  { id: "stue_007b", x: -50.71, y: 34.7 },
  { id: "stue_010a", x: -20.35, y: 27.47 },
  { id: "stue_027a", x: -7.4, y: 32.89 },
  { id: "stue_027b", x: -11.85, y: 32.93 }
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
  4: "stue_004",
  5: "stue_005",
  6: "stue_006",
  9: "stue_009",
  10: "stue_010",
  12: "stue_012",
  26: "stue_026",
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
  76: "stue_076",
  77: "stue_077",
  79: "stue_079"
};



const døre = [
  ["dør_001", { x: -40, y: 24 }, "stue_001", "stue_002"],
  ["dør_002", { x: -30, y: 12 }, "stue_002", "stue_003"],
  ["dør_003", { x: -38, y: 12 }, "stue_002", "stue_004"],
  ["dør_004", { x: -13, y: 10 }, "stue_002", "stue_005"],
  ["dør_005", { x: -57, y: 35 }, "stue_001", "stue_006"],
  ["dør_006", { x: -28, y: 32 }, "stue_001", "stue_009"],
  ["dør_007", { x: -20, y: 32 }, "stue_001", "stue_010"],
  ["dør_008", { x: -18, y: 27 }, "stue_002", "stue_012"],
];

function invertLokaleId([nr, navn]) { // input: [nummer, lokale_navn]
  return [navn, Number(nr)]; // output: [lokale_navn, nummer_som_tal]
}

const localeNavnTilId = Object.fromEntries( // lav et objekt fra par-liste
  Object.entries(lokaleId).map(invertLokaleId) // omdanner lokaleId til omvendt mapping
);

function lokaleEntryToArray([nr, navn]) { // input: [nummer, lokale_navn]
  const coords = lokaleMap[navn]; // slå koordinater op fra localeMap
  if (!coords) { // hvis lokalets koordinater ikke findes
    throw new Error(`Koordinater mangler for ${navn}`); // fejl stop
  }
  return [Number(nr), navn, "lokale", [coords.x, coords.y, 0]]; // bygg array-objekt til dijkstra
}

const lokaleArray = Object.entries(lokaleId).map(lokaleEntryToArray); // konverter lokaleId til array-format


const dørArray = døre.map(([dørId, coords, fra_LokaleId, til_LokaleId]) => { // input: [id for døren, dørens placering, første forbinelse til lokale, anden forbinelse til lokale]
  const fraId = localeNavnTilId[fra_LokaleId]; // slå lokaleId op for 1. lokale
  const tilId = localeNavnTilId[til_LokaleId]; // slå lokaleId op for 2. lokale
  if (!fraId || !tilId) { // hvis en af lokalernes id'er ikke findes i mapping
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

  // Kontrollere at numrene findes
  if (!startnøgle || !slutnøgle) {
    console.warn("Start- eller slutnummer findes ikke.");
    return;
  }

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
  const startLokaleId = Number(startNr);
  const slutLokaleId = Number(slutNr);

  const resultat = dijkstraAlgoritmeSammeEtage(lokaleArray, dørArray, startLokaleId, slutLokaleId); // kørre dijkstra algoritmen
  console.log("Resultat:", resultat); // printer dijkstra algoritmens resultat

  const outputElement = document.getElementById("vejResultat");
  if (outputElement) {
    outputElement.textContent = resultat;
  }
}

// Gør funktionen tilgængelig globalt for onclick i index.html
window.findVej = findVej;
