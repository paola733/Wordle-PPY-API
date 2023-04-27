window.addEventListener('load', init);
function init(){
    let intentos = 6;
    let palabra = 'AMIGO';
    const API = 'https://clientes.api.greenborn.com.ar/public-random-word?c=10&l=5'

    //FUCTION ASINCRONA
    fetch(API).then( response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase()
        console.log(palabra)
    })
    .catch( err => console.log(err) )

    const button = document.getElementById("guess-button");
    const input = document.getElementById("guess-input");
    button.addEventListener("click", intentar);


    function intentar(){
        const INTENTO = leerIntento();
        if (INTENTO === palabra ) {
            terminar("<h1>GANASTE!!!</h1>")
        return
    }
        for (let i in palabra){
            if (INTENTO[i]===palabra[i]){
                console.log(INTENTO[i], "VERDE")
            } else if( palabra.includes(INTENTO[i]) ) {
                console.log(INTENTO[i], "AMARILLO")
            } else {
                console.log(INTENTO[i], "GRIS")
            }
        }
            intentos--
            if (intentos==0){
                terminar("<h1>PERDISTE!!!</h1>")
            }
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            ROW.className = 'row';
            for (let i in palabra){
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i]===palabra[i]){ //VERDE
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'green';
                } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'yellow';
                } else {      //GRIS
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'grey';
                }
                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW)
            input.value = "";
    }
    function terminar(mensaje){
        const INPUT = document.getElementById("guess-input");
        INPUT.disabled = true;
        button.disabled = true;
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje;
    }
    function leerIntento(){
        let intento = document.getElementById("guess-input");
        intento = intento.value;
        intento = intento.toUpperCase();
        return intento;
    }

}