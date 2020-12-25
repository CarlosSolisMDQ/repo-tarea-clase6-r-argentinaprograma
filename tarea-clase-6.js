/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

//let cantidadDeIntegrantes = document.querySelector("#cantidad-de-integrantes").value;
let botonDeIntegrantes = document.querySelector("#boton-de-integrantes");
let botonDeBorrarIntegrante = document.querySelector("boton-de-borrar-integrantes");
let botonDeCalcular = document.querySelector("#boton-de-calcular");
let botonDeReset = document.querySelector("#boton-de-reinicio");
let salidaDeDatos = document.querySelector("#salida-de-datos");

botonDeIntegrantes.onclick = () => {
    let cantidadDeIntegrantes = document.querySelector("#cantidad-de-integrantes").value;
    for(let i = 0; i < cantidadDeIntegrantes; i++){
        agregarIntegrante(i);
        borrarIntegrante(i)
    }
    document.querySelector("#cantidad-de-integrantes").value = "";
   
}

botonDeCalcular.onclick = () => {
    let edadesDeIntegrantes = document.querySelectorAll("input");
    let arrayDeEdades = [];
    
    for(let i = 0; i < edadesDeIntegrantes.length; ++i){
        if(edadesDeIntegrantes[i].value != ""){
            arrayDeEdades.push(Number(edadesDeIntegrantes[i].value));
            console.log(edadesDeIntegrantes[i].value)
        }
        
    }
    
    let mayor  = arrayDeEdades.reduce((a,b) => a > b ? a : b);
    let menor = arrayDeEdades.reduce((a,b) => a < b ? a : b);
    let promedio = arrayDeEdades.reduce((a,b) => a + b) / arrayDeEdades.length;
    let mayorPos = arrayDeEdades.indexOf(mayor) + 1;
    let menorPos = arrayDeEdades.indexOf(menor) + 1;
    
    salidaDeDatos.innerText = "El integrante mayor es el numero: " + mayorPos  + "\nEl integrante menor es el numero: " +  menorPos  +  "\nEl promedio es: "  + promedio;
}

botonDeReset.onclick = () => {
    
    let nodoPadre = document.querySelector("#cadena-de-inputs");
    nodoPadre.querySelectorAll('*').forEach(n => n.remove());
    salidaDeDatos.innerText = "";
    document.querySelector("#cantidad-de-integrantes").value = "";
    
    /*
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



let agregarIntegrante = (i) => {
    let divDeInputs = document.querySelector("#cadena-de-inputs");
    let div = document.createElement("div");
    div.className = "div" + i;
    let label = document.createElement("label");
    label.textContent = "Ingrese la edad del integrante " + (i + 1) + ": "
    let input = document.createElement("input");
    
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
    
    divDeInputs.appendChild(div);
    div.appendChild(label);
    div.appendChild(borrar);
    
    borrar.onclick = () =>{
        let temp = ".div" + i
        let divParaBorrar = document.querySelector(temp);
        divParaBorrar.parentNode.removeChild(divParaBorrar);
        temp = ".Borrar" + i;
        let divParaBorrarDelBoton = document.querySelector(temp);
        divParaBorrarDelBoton.parentNode.removeChild(divParaBorrarDelBoton);
    }
}








