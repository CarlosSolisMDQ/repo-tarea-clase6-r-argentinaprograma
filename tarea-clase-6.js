/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).

TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/


/*
Los dos puntos tienen la misma premisa así que los voy a tratar de resolver en solo una S.P.A.
*/

//en este bloque llamo los elementos del DOM que me interesan

//let cantidadDeIntegrantes = document.querySelector("#cantidad-de-integrantes").value;
let botonDeIntegrantes = document.querySelector("#boton-de-integrantes");
let botonDeBorrarIntegrante = document.querySelector("boton-de-borrar-integrantes");
let botonDeCalcular = document.querySelector("#boton-de-calcular");
let botonDeReset = document.querySelector("#boton-de-reinicio");
let salidaDeDatos = document.querySelector("#salida-de-datos");

//le doy funcionalidad a los botones a continuación, el que agrega los input, el que calcula, el que reinicia

botonDeIntegrantes.onclick = () => {
    let cantidadDeIntegrantes = document.querySelector("#cantidad-de-integrantes").value;
    //correccion para que un nuevo ingreso resetee el formulario
    let nodoPadre = document.querySelector("#cadena-de-inputs");
    nodoPadre.querySelectorAll('*').forEach(n => n.remove());
    salidaDeDatos.innerText = "";
    document.querySelector("#cantidad-de-integrantes").value = "";
    //queda ver si se puede funcionalizar para no repetir codigo
    
    for(let i = 0; i < cantidadDeIntegrantes; i++){
        //uso el agregar y borrar como si fueran componentes, pero sin react.
        agregarIntegrante(i);
        borrarIntegrante(i)
    }
    document.querySelector("#cantidad-de-integrantes").value = "";
   
}

botonDeCalcular.onclick = () => {
    let edadesDeIntegrantes = document.querySelectorAll("input");
    let arrayDeEdades = [];
    
    //ingreso los input CON ENTRADAS a un array.
    for(let i = 0; i < edadesDeIntegrantes.length; ++i){
        if(edadesDeIntegrantes[i].value != ""){
            arrayDeEdades.push(Number(edadesDeIntegrantes[i].value));
            //console.log(edadesDeIntegrantes[i].value);
            
        }
        
    }
    //este bloque busca el mayor, menor promedio y sus posiciones con funciones de alto nivel porque estamos en fiestas y tengo que cocinar.
    let mayor  = arrayDeEdades.reduce((a,b) => a > b ? a : b);
    let menor = arrayDeEdades.reduce((a,b) => a < b ? a : b);
    let promedio = arrayDeEdades.reduce((a,b) => a + b) / arrayDeEdades.length;
    let mayorPos = arrayDeEdades.indexOf(mayor) + 1;
    let menorPos = arrayDeEdades.indexOf(menor) + 1;
    //busco el charcode del simbolo de enésimo en charcode.
    const simboloEnesimo = String.fromCharCode(186);
    //console.log(simboloEnesimo); 
    //saco los datos a un elemento existente pero invisible, como pide el item de la tarea.
    salidaDeDatos.innerText = "El integrante mayor es el numero " + mayorPos + simboloEnesimo + " en la tabla" + "\nEl integrante menor es el " +  menorPos + simboloEnesimo + " en la tabla" + "\nEl promedio es: "  + promedio;
}

botonDeReset.onclick = () => {
    //dejo el codigo de mi primer solucion a esto, busque una mejor alternativa porque me pareció una gronchada lo que hice primero.
    let nodoPadre = document.querySelector("#cadena-de-inputs");
    nodoPadre.querySelectorAll('*').forEach(n => n.remove());
    salidaDeDatos.innerText = "";
    document.querySelector("#cantidad-de-integrantes").value = "";
    //borro todos los subnodos del contenedor de inputs y la salida de datos mas el input de integrantes.
    /*
    //solucion vieja.

    let cantidadDeInputsEnDOM = document.querySelectorAll("input");
    
    for(let i = 0; i < cantidadDeInputsEnDOM.length - 1; ++i){
        let temp = ".div" + i
        let divParaBorrar = document.querySelector(temp);
        divParaBorrar.parentNode.removeChild(divParaBorrar);
        temp = ".Borrar" + i;
        let divParaBorrarDelBoton = document.querySelector(temp);
        divParaBorrarDelBoton.parentNode.removeChild(divParaBorrarDelBoton);
    }    
    document.querySelector("#cantidad-de-integrantes").value = "";
    salidaDeDatos.innerText = "";
    */
}

//funciones de agregar integrante y borrar integrante.

let agregarIntegrante = (i) => {
    let divDeInputs = document.querySelector("#cadena-de-inputs");
    let div = document.createElement("div");
    div.className = "div" + i;
    let label = document.createElement("label");
    label.textContent = "Ingrese la edad del integrante " + (i + 1) + ": "
    let input = document.createElement("input");
    //genero los elementos y los agrego al DOM.
    divDeInputs.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
}

let borrarIntegrante = (i) => {
    let divDeInputs = document.querySelector("#cadena-de-inputs");
    let div = document.createElement("div");
    div.className = "Borrar" + i;
    let borrar = document.createElement("button");
    let label = document.createElement("label");
    label.textContent = "Borrar el integrante: ";
    borrar.textContent = "Borrar integrante " + (i + 1);
    //genero los label y botones de borrar integrante y los agrego al DOM.
    divDeInputs.appendChild(div);
    div.appendChild(label);
    div.appendChild(borrar);
    //Di vueltas con esto, no sabía si agregar la funcionalidad del boton de borrado acá o fuera de la funcion componente borrar.
    //Al final la dejé acá porque anda sin problemas y tengo que hacer un pollo al escabeche.
    borrar.onclick = () =>{
        let temp = ".div" + i
        let divParaBorrar = document.querySelector(temp);
        divParaBorrar.parentNode.removeChild(divParaBorrar);
        temp = ".Borrar" + i;
        let divParaBorrarDelBoton = document.querySelector(temp);
        divParaBorrarDelBoton.parentNode.removeChild(divParaBorrarDelBoton);
        //este modulo selecciona la clase custom numerada que le di a cada elemento relacionado con el input base.
    }
}








