const canvas = document.querySelector("#geolocalizacion");
const divisor = document.querySelector("#principal");
//El canvas tiene las mismas dimensiones que el div
//MUY IMPORTANTE NO CAMBIARLE LAS DIMENSIONES DESDE CSS YA QUE NO LO VUELVE A RENDERIZAR, SIMPLEMENTE COMPRIME O EXTIENDE LA IMAGEN YA EXISTENTE
const width = canvas.width = divisor.clientWidth;
const height = canvas.height = divisor.clientHeight;
const ctx = canvas.getContext("2d");
const estrellas=100;
const tierra = {x:width/2,y:height/2,radio:height*0.3};
//Obtener posición, tener en cuenta que toma dos funciones como parámetros
navigator.geolocation.getCurrentPosition(mostrarPosicion,falla);
function falla(){
    alert("Geolocalización no obtenida en este navegador");
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = 'black';
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Geolocalización no obtenida",5,15);
}
function mostrarPosicion(pos){
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,width,height);
    //Planeta tierra
    ctx.fillStyle = 'white';
    ctx.arc(tierra.x,tierra.y , tierra.radio, 0, 2*Math.PI, false);
    ctx.fill()
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tierra.x-tierra.radio,tierra.y);
    ctx.lineTo(tierra.x+tierra.radio,tierra.y);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Ecuador",tierra.x-10,tierra.y-10);
    
    //estrellas
    ctx.fillStyle = 'white';
    for(let i=0;i<estrellas;i++){
        ctx.fillRect(Math.random()*width,Math.random()*height , 3, 3);
    }

    //posicion
    let posicion = pos.coords;
    ctx.fillStyle = 'red';
    let latitud = (posicion.latitude *tierra.radio /90);
    if (posicion.latitude<0){
        latitud *= -1;
    }
    latitud += tierra.y;
    let longitud = ((posicion.longitude % 90) * tierra.radio /90) + tierra.x;
    console.log("Coordenadas esfera:"+latitud+" "+longitud);
    ctx.fillRect(longitud,latitud,5,5);
    ctx.fillStyle = 'green';
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("("+posicion.latitude+","+posicion.longitude+")",longitud+10,latitud+10);
}