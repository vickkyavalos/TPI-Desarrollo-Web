
const formAdmin = document.getElementById('form-admin');
const formularioS = document.getElementById('formulario')

const btnDesplegarFormulario = document.getElementById('btn-desplegarFormulario');//#boton-agregar
const btnAgregarSalon = document.getElementById('btn-agregarSalon');//boton-agregarSalon del formulario
const botonEditar = document.querySelector("#boton-editar");//boton-agregarSalon
const btnEliminar = document.querySelector("#boton-eliminar");//boton-eliminarSalon



//guardar datos en el local storage
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
    mostrarAlertaExito(tituloSalon);


    // console.log(salon);
    mostrarSalones();
    this.reset();

    
});


btnAgregarSalon.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Cargado exitosamente! :)"); 

});


//desplegar formulario
btnDesplegarFormulario.addEventListener('click', function(event) {
    event.preventDefault();
    desplegarFormulario()
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


//visualizar
function mostrarSalones(){
//busca en el html el tbody
  const tabla = document.querySelector('#tabla-salones');
  tabla.innerHTML = '';

  //trae los salones guardados(devuelve un string) y si no hay devuelve un array vacio
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  salones.forEach((salon,index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${salon.tituloSalon}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.direccionSalon}</td>
        <td>${salon.precioSalon}</td>
        <td><button id="boton-editar" class="editarStyle align-items-center" onclick="editar-salon"><img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt=""></button>
            <button id="boton-eliminar" class="eliminarStyle align-items-center" onclick="eliminarSalon(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt=""></button></td>
        `;    
    tabla.appendChild(fila); 
  })   

 }

//para que automaticamente muestre los datos que ya estan cargados
document.addEventListener('DOMContentLoaded',() =>{
  mostrarSalones()
})
  

// al apretar eliminar el salon seleccionado en el arreglo
// eliminar de la tabla sea recargando. o por medio de una funcion eliminar la fila correspondiente

//eliminar
function eliminarSalon(index){
  // traemos salones
  
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  salones.splice(index, 1);
  localStorage.setItem('salones', JSON.stringify(salones));
  mostrarSalones();
  
}

   let lastIsMdOrLarger = window.innerWidth >= 768;

  window.addEventListener('resize', () => {
    const isMdOrLarger = window.innerWidth >= 768;

    if (isMdOrLarger !== lastIsMdOrLarger) {
      const boxes = document.querySelectorAll('.transition-wrapper .box');

      boxes.forEach(el => {
        el.classList.add('slide'); // Activa animación

        // Espera 1.2 segundos para quitarla (igual que en el CSS)
        setTimeout(() => {
          el.classList.remove('slide');
        }, 1200);
      });

      lastIsMdOrLarger = isMdOrLarger;
    }
  });