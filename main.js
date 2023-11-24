// Variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicio = 30;
let tiempoRegrasivoId = null;

//Ids html
let mostrarMovs = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempor");
let body = document.querySelector("body");
let dificultad = document.querySelector("select");

// Numeros aleatorios

// Carpeta Aleatoria
let carpeta = [0,1]
carpeta = carpeta.sort(()=>{return Math.random()-0.5})
//console.log(carpeta);

// Imagen Aleatoria
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
//console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegrasivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegrasivoId);
            bloquearTarjetas();
            mostrarTiempo.innerHTML = `Tiempo finalizado 💀`
            document.body.classList.toggle("dark")
        }
    },1000)
    document.querySelector("select").disabled = true;
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        
        if(carpeta[0] == 0){
            tarjetaBloqueada.innerHTML = `<img src="images/0/${numeros[i]}.png">`
        }
        else{
            tarjetaBloqueada.innerHTML = `<img src="images/1/${numeros[i]}.png">`
        }
        tarjetaBloqueada.disabled = true;

    }
}



// Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasdestapadas++;
    //console.log(tarjetasdestapadas);

    if(tarjetasdestapadas == 1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        if(carpeta[0] == 0){
            tarjeta1.innerHTML = `<img src="images/0/${primerResultado}.png" alt="">`;
        }
        else{
            tarjeta1.innerHTML = `<img src="images/1/${primerResultado}.png" alt="">`;
        }
        
        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasdestapadas == 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        if(carpeta[0] == 0){
            tarjeta2.innerHTML = `<img src="images/0/${segundoResultado}.png" alt="">`;
        }
        else{
            tarjeta2.innerHTML = `<img src="images/1/${segundoResultado}.png" alt="">`;
        }
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovs.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjetasdestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}/8`

            if(aciertos == 8){
                clearInterval(tiempoRegrasivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}/8`
                mostrarTiempo.innerHTML = `Felicitaciones! Tardaste ${timerInicio - timer} segundos`
                mostrarMovs.innerHTML = `Movimientos: ${movimientos}`
            }

        }else{
            //Mostrar resultados y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasdestapadas = 0;
                if(timer==0){
                    clearInterval(tiempoRegrasivoId);
                    bloquearTarjetas();
                }
            },800);
        }
    }
}

dificultad.addEventListener("change",()=>{
    valorSelect = document.querySelector("select").value;

    //console.log(valorSelect)
    switch(valorSelect){

        case "0":
            timer = 30
            timerInicio = 30
        break;

        case "1":
            timer = 20
            timerInicio = 20
        break;

        case "2":
            timer = 10
            timerInicio = 10
        break;
    }
    //console.log(timer);
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
})