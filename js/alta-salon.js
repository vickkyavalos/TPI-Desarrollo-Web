let modoEdicion = false;
let indexEdicion = null;


const formAdmin = document.getElementById('form-admin');
const formularioS = document.getElementById('formulario')

const btnDesplegarFormulario = document.getElementById('btn-desplegarFormulario');//boton-agregar
const btnAgregarSalon = document.getElementById('btn-agregarSalon');//boton-agregarSalon del formulario
const botonEditar = document.querySelector("#boton-editar");//boton-agregarSalon
const btnEliminar = document.querySelector("#boton-eliminar");//boton-eliminarSalon


function obtenerNuevoIdSalon(salones) {
    if (salones.length === 0) return 1;
    const maxId = Math.max(...salones.map(s => s.idSalon || 0));
    return maxId + 1;
}

//guardar datos en el local storage
formularioS.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!formularioS.checkValidity()) {
        formularioS.classList.add('was-validated'); 
        return;
    }
    
    const tituloSalon = document.getElementById('inputTituloSalon').value;
    const descripcion = document.getElementById('inputDescripcionSalon').value;
    const direccionSalon= document.getElementById('inputDireccion').value;
    const precioSalon = document.getElementById('inputPrecio').value;
    const fotoPrueba = document.getElementById('fotoSalon').value;

    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    
    const idSalon = modoEdicion ? salones[indexEdicion].idSalon : obtenerNuevoIdSalon(salones);
    if (modoEdicion) {
        // Actualizar salón existente
        salones[indexEdicion] = { idSalon, tituloSalon, descripcion, direccionSalon, precioSalon, fotoPrueba };
        modoEdicion = false;
        indexEdicion = null;
        document.getElementById('btn-agregarSalon').textContent = 'Cargar Salón';
    } else {
        // Agregar nuevo salón
        salones.push({ idSalon, tituloSalon, descripcion, direccionSalon, precioSalon, fotoPrueba });
        mostrarAlertaExito(tituloSalon);
    }

    
    localStorage.setItem('salones', JSON.stringify(salones));
    mostrarSalones();
    cerrarFormulario();

    formularioS.reset();
    formularioS.classList.remove('was-validated');
});


//desplegar formulario
btnDesplegarFormulario.addEventListener('click', function(event) {
    event.preventDefault();
    desplegarFormulario();
    formularioS.reset();
    document.getElementById('btn-agregarSalon').textContent = 'Cargar Salón';
    cerrarFormulario();
});


//cambiar visibilidad
function desplegarFormulario(){
    if (formAdmin.style.visibility == 'hidden') {
      formAdmin.style.visibility = 'visible';
    }else{
      formAdmin.style.visibility = 'hidden';
    }
};

function cerrarFormulario(){
    if (formAdmin.style.visibility == 'visible') {
      formAdmin.style.visibility = 'hidden';
    }else{
      formAdmin.style.visibility = 'visible';
    }
};

///////////////////////////////////////funcionalidades///////////////////////////////////////

//visualizar tabla
function mostrarSalones(){
//busca en el html el tbody
  const tabla = document.querySelector('#tabla-salones');
  tabla.innerHTML = '';

  //trae los salones guardados y si no hay devuelve un array vacio
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  salones.forEach((salon,index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><img src="${salon.fotoPrueba}"/></td>
        <td>${salon.tituloSalon}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.direccionSalon}</td>
        <td>${salon.precioSalon}</td>
        <td><button id="boton-editar" class="editarStyle align-items-center" onclick="editarSalon(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt=""></button>
            <button id="boton-eliminar" class="eliminarStyle align-items-center" onclick="eliminarSalon(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt=""></button></td>
        `;    
    tabla.appendChild(fila); 
  })   

 }

//eliminar
function eliminarSalon(index){
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  salones.splice(index, 1);// al apretar elimina el salon seleccionado en el arreglo
  localStorage.setItem('salones', JSON.stringify(salones));
  mostrarSalones();
}

//editar
function editarSalon(index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const salon = salones[index];

    // Cargar valores en el formulario
    document.getElementById('inputTituloSalon').value = salon.tituloSalon;
    document.getElementById('inputDescripcionSalon').value = salon.descripcion;
    document.getElementById('inputDireccion').value = salon.direccionSalon;
    document.getElementById('inputPrecio').value = salon.precioSalon;

    desplegarFormulario();
    
    // Cambiar estado a edición
    modoEdicion = true;
    indexEdicion = index;

    // Cambiar texto del botón
    document.getElementById('btn-agregarSalon').textContent = 'Guardar cambios';
    
    
}


//para que automaticamente muestre los datos que ya estan cargados
document.addEventListener('DOMContentLoaded',() =>{
  mostrarSalones()
})






