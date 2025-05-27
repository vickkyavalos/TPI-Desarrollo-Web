//#boton-agregar

const btnDesplegarFormulario = document.getElementById('btn-desplegarFormulario');
const formAdmin = document.getElementById('form-admin');


//boton-agregarSalon del formulario
const btnAgregarSalon = document.querySelectorAll('#btn-agregarSalon');
const formulario = document.querySelectorAll('#formulario')

//boton-agregarSalon eliminarSalon
const botonEditar = document.querySelector("#boton-editar");
const btnEliminar = document.querySelector("#boton-eliminar");

// id de inputs de formulario (nombre, direccion, descripcion, precio)
const tituloform = document.getElementById('titulo-form');
const descripcion = document.getElementById('inputDescripcionSalon')
const direccionSalon= document.getElementById('inputDireccion');
const precioSalon = document.getElementById('inputPrecio');


const salones = [
  { title: ""}
];

btnDesplegarFormulario.addEventListener('click', function(event) {
    event.preventDefault();
    desplegarFormulario()
});

btnAgregarSalon.addEventListener('submit', function(event) {
    event.preventDefault();
    
    
});


function desplegarFormulario(){
    if (formAdmin.style.visibility === 'hidden') {
      formAdmin.style.visibility = 'visible';

    } else {
      formAdmin.style.visibility = 'hidden';
    }
};


function agregarSalon(){

}


