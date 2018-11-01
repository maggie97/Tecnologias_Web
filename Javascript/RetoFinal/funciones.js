var palabras = []; 
var palabra ;
var vidas = 3;
var intento = 0 ; 
var NombreJugador ="";
var min = 00;
var seg = 00;
var contador;
var records = [];
function cargaPag(){
    while(NombreJugador == "")
        NombreJugador = prompt("Nombre del Jugador");
    
    botonesNivel();
    //espacios();
    document.getElementById("numV").innerHTML = vidas;
    document.getElementById("numV").style.float = "right";
}
function botonesNivel(){
    
    document.getElementById("monito").innerHTML +=  "<br/><div class='boton' onclick='nivel(1)'>Nivel 1</div>"+
                                                    "<br/>" + "<div class='boton' onclick='nivel(2)' >Nivel 2</div>"+
                                                    "<br/>" +  "<div class='boton' onclick='nivel(3)'>Nivel 3</div>"; 
}
function nivel(niv){ 
    switch(niv){
        case 1:
            palabras = [ "camara", "luces", "mouse", "fotos", "Agudo", "Gene", "Rotula", "Social", "Virus","Imitar" ];
            break;
        case 2:
            palabras = [ "computadora", "teclado", "pantalla", "aplicacion", "bocinas", "memoria" , 
                        "procesador", "Graficos", "Impresora", "Gabinete"];
            break;
        case 3:
            palabras = [  "Discapacidad", "Diagnostico", "Contractura", "Fisioterapeuta",
            "Espasticidad", "Antibiotico", "Circulacion", "Cuadriplejica"];
            break;
    } 
    
    document.getElementById("monito").innerHTML = "";
    espacios();
}
function espacios(){
    contador = setInterval(function(){ 
        if(seg >= 59){
            seg = -1;
            min++;
        }
        seg++;
      }, 1000);
    document.getElementById("monito").style.background = "url(ahorcadoInicial.png) no-repeat 0 100%";
    intento = 0;
    palabra = palabras[Math.round( Math.random() * 9 )].toUpperCase(); 
    document.getElementById("palabra").innerHTML +=palabra  + palabra.length ;
   
    for(i = 0 ; i < palabra.length; i++){
        document.getElementById("palabra").innerHTML +=
            "<div class='letra' >"+
            "<div class='espacio'></div><div class='linea'></div><div>";
    }
}
function clickLetra(letra){ 
   
    var arr = document.getElementsByClassName("letra") ;
    var letraTeclado = document.getElementById(letra); 
    if(intento>= 6 ) return;
    if(letraTeclado.style.opacity == 0.5) return;
    if(palabra.includes(letra)){  
        var indices = []; 
        var idx = palabra.indexOf(letra);
        while (idx != -1) {
            indices.push(idx);
            idx = palabra.indexOf(letra, idx + 1); 
        }
        for(i = 0 ; i <  indices.length; i++ ){
            ind = indices[i];
            arr[ind].style.background = "url('letras/"+ letra +".png') no-repeat 5px" ; 
        }
        gana(arr);
    }
    else
    {
        intento++; 
        document.getElementById("monito").value = intento;
        document.getElementById("monito").style.background = "url(ahorcado"+ intento +".png) 0 100%";
        if(intento == 6){
            clearInterval(contador); 
            resultado(false);
            vidas--;
        } 
    }
    if(vidas == 0){
        alert("Perdiste");
    }
    letraTeclado.style.opacity = ".5";
}
function muestraRecords(){
    
    document.getElementById("records").innerHTML = ""; 
    for(i = 0; i< records.length && i< 5; i++){  
        document.getElementById("records").innerHTML += "<p>" + records[i] + "</p>";
    }
}
function tiempoJuego(){
    var record = [];
    record.push(NombreJugador);
    var cadenachida = "";
    var tiempo = "";
    if(min< 10  & seg < 10 )
        tiempo += "0" + min + ":" + "0" + seg;
    else if (min < 10 ) 
        tiempo += "0" + min + ":" +  seg;
    else if (seg < 10 )
        tiempo +=  min + ":" +  "0" + seg;
    else 
        tiempo +=  min + ":" +   seg;  
    record.push(tiempo);
    records.push(record); 
    record = []; 
}
function resultado(val){
    seg = min = 0; 
    if(val) res = "GANASTE";
    else res = "PERDISTE";
    document.getElementById("monito").innerHTML +=  
            "<div class='Resultado' onclick=''>"+res+"</div>" + 
            "<br/><div style='font-size: .9em;' class='boton' onclick = 'reinicia(1)'>VOLVER A JUGAR</div>"+
            "<br/><div style='font-size: .9em;' class='boton' onclick = 'reinicia(2)'>cambiar de nivel</div>";
}
function reinicia(op){
    if(vidas == 0) return;  
    
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("monito").innerHTML = "";
    if(op == 2){
        botonesNivel();
    }
    else 
        espacios();
    document.getElementById("numV").innerHTML = vidas; 
    inicializaTeclado();
    //alert("sali");

}
function inicializaTeclado(){
    up = document.getElementById("up").children ;
    down =  document.getElementById("down").children ; 
    for(i = 0 ; i< up.length; i++){
        up[i].style.opacity = "1";
    }
    for(i = 0 ; i< down.length; i++){
        down[i].style.opacity = "1";
    }
} 
function gana(arr){
    cont = true;
    //alert("2"); 
    for(i = 0 ; i <  arr.length; i++ ){
        if(arr[i].style.background == ""){ 
            cont = false;
            }
    }
    if(cont) { //gano
        //alert("1");
        clearInterval(contador); 
        tiempoJuego(); 
        muestraRecords(); 
        resultado(true); 
    }  
}