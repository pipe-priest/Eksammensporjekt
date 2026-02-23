
let korridorLokation = [[1,1,0],[2,1,0]];//(start(x,y,z), slut(x,y,z))
let korridorArray=[[1,korridorLokation," nord 0.sal"],[2,korridorLokation,"syd 0.sal"]];//(korridorId, korridorLokation, navn)


let dørLokation1 = [1,2,0];//(x,y,z)
let dørLokation2 = [2,2,0];//(x,y,z)
let dørArray = [[1,dørLokation1,1],[1,dørLokation2,2]];//(dørid,dørLokation, lokaleTilknyttet 
let userDøre = [1,2] //(dørId1, dørId2);

function afstandsberegner (startLokation,slutLokation){
let afstand = sqrt((startLokation[0]-slutLokation[0])**2+(startLokation[1]-slutLokation[1])**2+(startLokation[2]-slutLokation[2])**2, )
return afstand
}

function punktIndenforLinjeX (punkt,linje){ //det her fungere probs men kan være et problem hvis det ikke fungere sådan her
if (punkt[0]>=linje[0][0]){
    if (punkt[0]<=linje[1][0]){
    return true
}
} else {
return false
}
}

function SildebensAlgoritmeSammeSal (dørArray,korridorArray,userDøre){
if (userDøre[0][0]==userDøre[1][0]){
    return "gå over på den anden side af gangen"
} else {
    for (let i=0; i<korridorArray.lenght; i++){
        if (punktIndenforLinjeX(korridorArray[i],userDøre[0][0])){
            if (punktIndenforLinjeX(korridorArray[i],userDøre[1][0])){
                return "brug korridor"+korridorArray[i] 
}
} else {
return false
}
}

}


}
    
}



}