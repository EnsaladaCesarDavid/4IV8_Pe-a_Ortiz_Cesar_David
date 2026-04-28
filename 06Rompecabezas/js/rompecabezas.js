var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas",
    "Para ordenar las piezas guíate por la imagen Objetivo"
];

// Para guardar los movimientos necesitamos un arreglo

var movimientos = [];

// Tengo que saber cuales son las posiciones del rompecabezas original

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

// Necesito otra variable para saber que el orden del rompecabezas es correcto

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

// Necesito conocer la posicion de la ficha vacia

var filaVacia = 2;
var columnaVacia = 2;

// Necesito una funcion que se encarge de mostrar la lista de intrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(lista[i], "lista-instrucciones")
    }
}

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}