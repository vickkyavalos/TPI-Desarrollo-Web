//#boton-agregar

const btnDesplegarFormulario = document.getElementById('btn-desplegarFormulario');
const element = document.getElementById('form-admin');


//boton-agregarSalon del formulario
const btnagregarSalon = document.querySelectorAll('#btn-agregarSalon');
const formulario = document.querySelectorAll('#formulario')

//boton-agregarSalon eliminarSalon
const botonEditar = document.querySelector("#boton-editar");
const btnEliminar = document.querySelector("#boton-eliminar")


btnDesplegarFormulario.addEventListener('click', function() {
    desplegarFormulario()
});


function desplegarFormulario(){
    if (formAdmin.style.visibility === 'hidden') {
      formAdmin.style.visibility = 'visible';
    } else {
      elforAdmintyle.visibility = 'hidden';
    }
};


function agregarSalon(){

}