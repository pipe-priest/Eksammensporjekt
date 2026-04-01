const Lokationer = {
  gang: { x: 0, y: 0 },
  aula: { x: 0.11, y: 17.47 },
  kantine: { x: 0.34, y: 32.84 },
  stue_001: { x: -48, y: 24 },
  stue_002: { x: -22.85, y: 10.37 },
  stue_003: { x: -30.1, y: 12.86 },
  stue_004: { x: -38.19, y: 12.33 },
  stue_005: { x: -13.11, y: 10.08 },
  stue_006: { x: -57.55, y: 35 },
  stue_009: { x: -28, y: 32 },
  stue_010: { x: -20, y: 32 },
  stue_012: { x: -18.12, y: 27.13 },
  stue_026: { x: -27, y: 21.56 },
  stue_028: { x: 8.13, y: 16.58 },
  stue_029: { x: 14.09, y: 35.43 },
  stue_030: { x: 18.88, y: 35.26 },
  stue_033: { x: 9.81, y: 32.79 },
  stue_034: { x: 10.23, y: 28.63 },
  stue_036: { x: 14.13, y: 28.5 },
  stue_037: { x: 31.91, y: 32.43 },
  stue_038: { x: 47.59, y: 33.7 },
  stue_041: { x: 22, y: 6 },
  stue_045: { x: 27.87, y: 6.25 },
  stue_049: { x: 22.61, y: 22.96 },
  stue_050: { x: 22.7, y: 21.03 },
  stue_068: { x: 26.64, y: 17.21 },
  stue_070: { x: 36, y: 19.58 },
  stue_072: { x: 54.38, y: 24.31 },
  stue_073: { x: 53.18, y: 19.23 },
  stue_074: { x: 47.89, y: 10.88 },
  stue_076: { x: 55.6, y: 14.28 },
  stue_077: { x: 41.01, y: 8.32 },
  stue_079: { x: 46.58, y: 22.75 },
  stue_003b: { x: -29.88, y: 8.69 },
  stue_007a: { x: -40.03, y: 32.81 },
  stue_007b: { x: -50.71, y: 34.7 },
  stue_010a: { x: -20.35, y: 27.47 },
  stue_027a: { x: -7.4, y: 32.89 },
  stue_027b: { x: -11.85, y: 32.93 }
};

// Nummer-til-lokale mapping (nem at udvide)
// Her bruger vi nøgler som tal fra input til at slå den 'stue_XXX' nøgle op.
const numberTilLokation = {
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

function findVej() {

  const startVerdi = document.getElementById("start").value.trim();// afæser værdi fra start inputfeltet i index.html filen
  const slutVerdi = document.getElementById("slut").value.trim();// afæser værdi fra slut inputfeltet i index.html filen

  const startNr = Number(startVerdi);// Konvertere til tal typen så nummeret kan bruges til finde navnet til lokalets placering i det øverste array
  const slutNr = Number(slutVerdi);// Konvertere til tal typen så nummeret kan bruges til finde navnet til lokalets placering i det øverste array

  // Simpel validering: sikre at tallene er gyldige og ikke tomme strenge, hvis ikke alt er i orden sendes en fejlmeddelelse i konsollen
  if (Number.isNaN(startNr) || Number.isNaN(slutNr) || startVerdi === "" || slutVerdi === "") {
    console.warn("Indtast gyldige start- og slutnumre, f.eks. 1 eller 10");
    return;
  }

  const startnøgle = numberTilLokation[startNr]; // bruger start input nummeret til at finde "nøglen" der passer til lokalet
  const slutnøgle = numberTilLokation[slutNr]; // bruger slut input nummeret til at finde "nøglen" der passer til lokalet

  // Kontrollere at numrene findes
  if (!startnøgle || !slutnøgle) {
    console.warn("Start- eller slutnummer findes ikke.");
    return;
  }

  // Find 
  const startLokale = Lokationer[startnøgle]; //de faktiske koordinater til startlokationen findes ved at bruge "startnøglen"
  const slutLokale = Lokationer[slutnøgle]; //de faktiske koordinater til slutlokationen findes ved at bruge "slutnøglen"

  // der skrives ud i console.log:hvad vi har fundet frem til, så det kan ses i konsollen
  console.log("Start:", startNr, "->", startnøgle, startLokale);
  console.log("Slut:", slutNr, "->", slutnøgle, slutLokale);
}
