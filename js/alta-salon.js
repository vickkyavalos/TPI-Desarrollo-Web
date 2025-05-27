//#boton-agregar

const btnDesplegarFormulario = document.getElementById('btn-desplegarFormulario');
const formAdmin = document.getElementById('form-admin');


//boton-agregarSalon del formulario
const btnAgregarSalon = document.getElementById('btn-agregarSalon');


//boton-agregarSalon eliminarSalon
const botonEditar = document.querySelector("#boton-editar");
const btnEliminar = document.querySelector("#boton-eliminar");


const formularioS = document.getElementById('formulario')

formularioS.addEventListener('submit', function(event) {
    event.preventDefault();
    // id de inputs de formulario (nombre, direccion, descripcion, precio)
    const tituloSalon = document.getElementById('inputTituloSalon').value;
    const descripcion = document.getElementById('inputDescripcionSalon').value;
    const direccionSalon= document.getElementById('inputDireccion').value;
    const precioSalon = document.getElementById('inputPrecio').value;

    const salon = {tituloSalon, descripcion, direccionSalon, precioSalon};
    
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    salones.push(salon);

    localStorage.setItem('salones', JSON.stringify(salones));
    alert(salon);
    // console.log(salon);
    this.reset();
});

btnAgregarSalon.addEventListener('submit', function(event) {
    event.preventDefault();
    // id de inputs de formulario (nombre, direccion, descripcion, precio)
    // const tituloSalon = document.getElementById('titulo-form').value;
    // const descripcion = document.getElementById('inputDescripcionSalon').value;
    // const direccionSalon= document.getElementById('inputDireccion').value;
    // const precioSalon = document.getElementById('inputPrecio').value;

    // const salon = {tituloSalon, descripcion, direccionSalon, precioSalon};
    
    // const salones = JSON.parse(localStorage.getItem('salones')) || [];
    // salones.push(salon);
    // localStorare.setItem('salones', JSON.stringify(salones));
    // alert(salon);
    // this.reset();
});


//desplegar formulario
btnDesplegarFormulario.addEventListener('click', function(event) {
    event.preventDefault();
    desplegarFormulario()
});
//cambiar visibilidad
function desplegarFormulario(){
    if (formAdmin.style.visibility === 'hidden') {
      formAdmin.style.visibility = 'visible';

    } else {
      formAdmin.style.visibility = 'hidden';
    }
};





