
let korridorLokation = [[1, 1, 0], [2, 1, 0]];//(start(x,y,z), slut(x,y,z))
let korridorArray = [[1, korridorLokation, " nord 0.sal"], [2, korridorLokation, "syd 0.sal"]];//(korridorId, korridorLokation, navn)


let dørLokation1 = [1, 2, 0];//(x,y,z)
let dørLokation2 = [2, 2, 0];//(x,y,z)
let dørArray = [[1, dørLokation1, 1], [1, dørLokation2, 2]];//(dørid,dørLokation, lokaleTilknyttet 
let userDøre = [1, 2] //(dørId1, dørId2);

function afstandsBeregnerFugl(startLokation, slutLokation) {
    let afstand = sqrt((startLokation[0] - slutLokation[0]) ** 2 + (startLokation[1] - slutLokation[1]) ** 2 + (startLokation[2] - slutLokation[2]) ** 2,)
    return afstand
}
function kompasX(ændringX) {
    if (ændringX > 0) {
        return "nord"
    } else if (ændringX < 0) {
        return "syd"
    } else {
        return "ingen ændring"

    }

}

function punktIndenforLinjeX(punkt, linje) {
    if (punkt[0] >= linje[0][0]) {//Fortids William her: jeg tror det at sammenligne 2d og 1d arrays er ulovligt men idk, hvis det ikke fungere så er det nok derfor.
        if (punkt[0] <= linje[1][0]) {
            return true
        }
    } else {
        return false
    }
}

export default function SildebensAlgoritmeSammeSal(korridorArray, userDøre) {// husk at ændre når vi begynder at arbejde med flere sale
    if (userDøre[0][0] == userDøre[1][0]) { //tjekker om dørende er over for hinanden. Kan nok ændres til at tolere en store forskel alla 2-3m
        return "gå over på den anden side af gangen"
    } else {
        for (let i = 0; i < korridorArray.lenght; i++) {//tjekker om der er en korridor der dækker over forskellen i x
            if (punktIndenforLinjeX(korridorArray[i], userDøre[0][0])) {
                if (punktIndenforLinjeX(korridorArray[i], userDøre[1][0])) {
                    return "brug korridor" + korridorArray[i] + "mod" + kompasX(userDøre[0][0] - userDøre[1][0])
                }
            } else {

                return console.error("sildebens algoritme 2. if-else fuckup"); //kommer nok til at spamme meget grundet den er indnen i for-loopet
            }
        }
    }


}


