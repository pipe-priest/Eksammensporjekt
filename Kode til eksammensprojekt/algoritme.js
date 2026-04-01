
let korridorLokation = [[1, 1, 0], [2, 1, 0]];//(start(x,y,z), slut(x,y,z))


// Udvidet datastruktur for lokaler og døre
let lokaleArray = [
    [1, "Lokale 001", "undervisningslokale"],
    [2, "Lokale 002", "undervisningslokale"],
    [3, "Korridor Nord", "korridor"],
    [4, "Korridor Syd", "korridor"]
];

// Udvidet dørArray: [dørId, [dørLokation], fraLokale, tilLokale, dørType]
let dørArray = [
    [1, [1, 2, 0], 1, 3, "lokaleTilKorridor"], // Fra lokale 001 til korridor nord
    [2, [2, 2, 0], 2, 4, "lokaleTilKorridor"], // Fra lokale 002 til korridor syd
    [3, [1, 1, 0], 1, 2, "lokaleTilLokale"]   // Fra lokale 001 til lokale 002
];
let userDøre = [1, 2] //(dørId1, dørId2);

// OBS: afstands beregner ikke opdatere til at passe med nyt dataformat. ikke slettet da kan være brugbar på et andet tidspunkt
// function afstandsBeregnerFugl(startLokation, slutLokation) {
//     let afstand = Math.sqrt((startLokation[0] - slutLokation[0]) ** 2 + (startLokation[1] - slutLokation[1]) ** 2 + (startLokation[2] - slutLokation[2]) ** 2);
//     return afstand;
// }

export default function dijkstraAlgoritmeSammeEtage(lokaleArray, dørArray, startLokaleId, målLokaleId) {

    function findDør(dørId) {
        return dørArray.find(dør => dør[0] === dørId);
    }

    function findLokale(lokaleId) {
        return lokaleArray.find(lokale => lokale[0] === lokaleId);
    }

    function getDøreFraLokale(lokaleId) {
        return dørArray.filter(dør => dør[2] === lokaleId || dør[3] === lokaleId);
    }

    function erKorridor(lokaleId) {
        const lokale = findLokale(lokaleId);
        return lokale && lokale[2] === "korridor";
    }

    // Beregn afstand mellem to punkter
    function beregnAfstand(punkt1, punkt2) {
        return Math.sqrt(
            (punkt1[0] - punkt2[0]) ** 2 +
            (punkt1[1] - punkt2[1]) ** 2 +
            (punkt1[2] - punkt2[2]) ** 2
        );
    }

    // Dijkstra's algoritme til at finde korteste vej gennem lokaler
    function findVejGennemLokaler(startId, målId) {
        if (startId === målId) {
            return { sti: [startId], døre: [] };
        }

        const afstande = {};
        const tidligere = {};
        const tidligere_dør = {};
        const ubesøgt = new Set();

        // Initialiser afstande
        lokaleArray.forEach(lokale => {
            afstande[lokale[0]] = Infinity;
            tidligere[lokale[0]] = null;
            tidligere_dør[lokale[0]] = null;
            ubesøgt.add(lokale[0]);
        });

        afstande[startId] = 0;

        while (ubesøgt.size > 0) {
            let nuværendeLokaleId = null;
            let minAfstand = Infinity;

            ubesøgt.forEach(lokaleId => {
                if (afstande[lokaleId] < minAfstand) {
                    minAfstand = afstande[lokaleId];
                    nuværendeLokaleId = lokaleId;
                }
            });

            if (nuværendeLokaleId === null || minAfstand === Infinity) {
                break; // Ingen vej til resterende noder
            }

            ubesøgt.delete(nuværendeLokaleId);

            if (nuværendeLokaleId === målId) {
                let sti = [];
                let døre = [];
                let currentId = målId;

                while (currentId !== null) {
                    sti.unshift(currentId);
                    if (tidligere_dør[currentId] !== null) {
                        døre.unshift(tidligere_dør[currentId]);
                    }
                    currentId = tidligere[currentId];
                }

                return { sti, døre };
            }

            const døreFraLokale = getDøreFraLokale(nuværendeLokaleId);

            for (const dør of døreFraLokale) {
                const næsteLokaleId = dør[2] === nuværendeLokaleId ? dør[3] : dør[2];

                if (!ubesøgt.has(næsteLokaleId)) {
                    continue;
                }

                const fraLokale = findLokale(nuværendeLokaleId);
                const tilLokale = findLokale(næsteLokaleId);
                const fraLokation = fraLokale[3] || dør[1];
                const tilLokation = tilLokale[3] || dør[1];
                const dørAfstand = beregnAfstand(fraLokation, tilLokation);
                const nyAfstand = afstande[nuværendeLokaleId] + dørAfstand;

                if (nyAfstand < afstande[næsteLokaleId]) {
                    afstande[næsteLokaleId] = nyAfstand;
                    tidligere[næsteLokaleId] = nuværendeLokaleId;
                    tidligere_dør[næsteLokaleId] = dør[0];
                }
            }
        }

        return null; // Ingen vej fundet
    }

    function genererInstruktioner(sti, døre) {
        if (sti.length < 2) {
            return "Du er allerede i mållokalet";
        }

        let instruktioner = [];
        for (let i = 0; i < sti.length - 1; i++) {
            const fraLokale = findLokale(sti[i]);
            const tilLokale = findLokale(sti[i + 1]);
            const dør = findDør(døre[i]);

            instruktioner.push(`Gå gennem dør ${dør[0]} fra ${fraLokale[1]} til ${tilLokale[1]}`);
        }

        return instruktioner.join(". ") + ".";
    }

    if (startLokaleId == null || målLokaleId == null) {
        return "Fejl: start eller mål lokation er ikke angivet";
    }

    const vejResultat = findVejGennemLokaler(startLokaleId, målLokaleId);

    if (!vejResultat) {
        return "Fejl: Ingen vej fundet mellem lokalerne";
    }

    return genererInstruktioner(vejResultat.sti, vejResultat.døre);
}