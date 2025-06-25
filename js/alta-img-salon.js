import { inicializarLocalStorage } from "./inicializar.js"; 

const formularioAdminImg = document.getElementById('form-admin-img')
const formularioImagen = document.getElementById('formularioImagen')

const btnDesplegarFormularioImagen = document.getElementById('btn-desplegarFormularioImagen');//boton-agregar
const btnAgregarImagen = document.getElementById('btn-agregarImagen');//boton-agregarSalon del formulario
const botonEditar = document.querySelector("#boton-editar");//boton-agregarSalon
const btnEliminar = document.querySelector("#boton-eliminar");//boton-eliminarSalon


document.addEventListener('DOMContentLoaded',() =>{
  mostrarImagenesSalon()
  inicializarLocalStorage();
})

function obtenerNuevoIdImagen(imagenesSalon) {
    if (imagenesSalon.length === 0) return 1;
    const maxId = Math.max(...imagenesSalon.map(s => s.idImagen || 0));
    return maxId + 1;
}

formularioImagen.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    const idSalon = document.getElementById('inputIdSalon').value;
    const rutaImagen = document.getElementById('inputFotoSalon').value.trim();
   
    const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
    const idImagen = modoEdicion ? imagenesSalon[indexEdicion].idImagen : obtenerNuevoIdImagen(imagenesSalon);

    if (modoEdicion) {
        // Actualizar imagen existente
        imagenesSalon[indexEdicion] = { idImagen,  idSalon, rutaImagen };
        modoEdicion = false;
        indexEdicion = null;
        document.getElementById('btn-agregarImagen').textContent = 'Cargar Imagen';
    } else {
        // Agregar nueva imagen
        imagenesSalon.push({ idImagen, idSalon, rutaImagen });
        // localStorage.setItem('imagenesSalon', JSON.stringify(imagenesSalon));
        // mostrarAlertaExito(tituloSalo);
    }
    
    localStorage.setItem('imagenesSalon', JSON.stringify(imagenesSalon));
    mostrarImagenesSalon();

    //cerrar modal
    const modalImg = document.getElementById('modalImagen');
    if (modalImg) {
        let modalcerrar = bootstrap.Modal.getInstance(modalImg);
        if (!modalcerrar) {
            modalcerrar = new bootstrap.Modal(modalImg);
        }
        modalcerrar.hide();
    }
    mostrarImagenesSalon();
    formularioImagen.reset();
    formularioImagen.classList.remove('was-validated');
  
});


///////////////////////////////////////funcionalidades///////////////////////////////////////

//visualizar tabla imagenes
function mostrarImagenesSalon(){
//busca en el html el tbody
  const tabla = document.querySelector('#tabla-imagenes');
  tabla.innerHTML = '';

  //trae las imagenes guardados y si no hay devuelve un array vacio
  const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
  imagenesSalon.forEach((imagen,index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${imagen.idImagen}</td>
        <td>${imagen.idSalon}</td>
        <td>${imagen.rutaImagen}</td>
        <td><img src="${imagen.rutaImagen}" class="tamanioImg"></td>
        <td><button id="boton-editar" class="editarStyle align-items-center" data-bs-toggle="modal" data-bs-target="#modalImagen" onclick="editarImagen(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt=""></button>
            <button id="boton-eliminar" class="eliminarStyle align-items-center" onclick="eliminarImagen(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt=""></button></td>
        `;    
    tabla.appendChild(fila); 
  })   

 }

//eliminar
function eliminarImagen(index){
  const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
  imagenesSalon.splice(index, 1);// al apretar elimina la imagen seleccionada en el arreglo
  localStorage.setItem('imagenesSalon', JSON.stringify(imagenesSalon));
  mostrarImagenesSalon();
}


function editarImagen(index) {
    const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
    const imagenSalon = imagenesSalon[index];

    document.getElementById('inputIdSalon').value = imagenSalon.idSalon;
    document.getElementById('inputFotoSalon').value = imagenSalon.rutaImagen;
    
    modoEdicion = true;
    indexEdicion = index;

    document.getElementById('btn-agregarImagen').textContent = 'Guardar cambios';
}


btnDesplegarFormularioImagen.addEventListener('click', function(event) {
    event.preventDefault();
    // desplegarFormularioImagen();
    formularioImagen.reset();
    document.getElementById('btnAgregarImagen');

});

//para que sean accesibles desde el html
window.eliminarImagen = eliminarImagen;
window.editarImagen = editarImagen;