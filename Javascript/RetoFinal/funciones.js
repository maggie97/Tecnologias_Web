var palabras = [ "pantalla", "camara", "luces", "accion", "mouse", "fotos", 
                        "paginaweb", "pantalon", "estereo", "computadora"];
function espacios(){
    /*alert( Math.round( Math.random() * 10 ));
    document.getElementById("palabra").innerHTML +=palabra + palabra.length;
    alert(palabras[Math.round( Math.random() * 10 )].length); */
    var nombre = prompt("Nombre Jugador");
    var palabra = palabras[Math.round( Math.random() * 10 )];
    
    for(i = 0 ; i < palabra.length; i++){
        document.getElementById("palabra").innerHTML +=
            "<div class='letra' >"+
            "<div class='espacio'></div><div class='linea'></div><div>";
    }
}
function clickLetra(letra){ 
    var arr = document.getElementsByClassName("letra") 
    arr[0].style.background = "url('letras/"+ letra +".png') no-repeat 5px" ; 
}