//js de boostrap para validacion de formulario
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function validacionAltaSalon() {
    const errorTitulo = document.getElementById('errorTitulo');
    const errorDireccion = document.getElementById('errorDireccion');
    const errorDescripcion = document.getElementById('errorDescripcion');
    const errorPrecio = document.getElementById('errorPrecio');
    const expresiones = {
        titulo: /^[a-zA-Z0-9\s]{1,50}$/,
        direccion: /^[a-zA-Z0-9\s]{1,100}$/,
        descripcion: /^.{1,200}$/,
        precio: /^\d{1,7}$/
    };

    let valido = true;


    inputTituloSalon.classList.remove('is-invalid', 'is-valid');
    inputDireccion.classList.remove('is-invalid', 'is-valid');
    inputDescripcionSalon.classList.remove('is-invalid', 'is-valid');
    inputPrecio.classList.remove('is-invalid', 'is-valid');

    errorTitulo.textContent = "";
    errorDireccion.textContent = "";
    errorDescripcion.textContent = "";
    errorPrecio.textContent = "";

    const titulo = inputTituloSalon.value;
    const direccion = inputDireccion.value;
    const descripcion = inputDescripcionSalon.value;
    const precio = inputPrecio.value;

    if (titulo.length < 3 || titulo.length > 20 || !expresiones.titulo.test(titulo)) {
        errorTitulo.textContent = "El título debe tener entre 3 y 20 caracteres, solo letras, números y espacios.";
        inputTituloSalon.classList.add('is-invalid');
        valido = false;
    } else {
        inputTituloSalon.classList.add('is-valid');
    }
    if (direccion.length < 5 || direccion.length > 50 || !expresiones.direccion.test(direccion)) {
        errorDireccion.textContent = "La dirección debe tener entre 5 y 50 caracteres, solo letras, números y espacios.";
        inputDireccion.classList.add('is-invalid');
        valido = false;
    } else {
        inputDireccion.classList.add('is-valid');
    }
    if (descripcion.length < 10 || descripcion.length > 50 || !expresiones.descripcion.test(descripcion)) {
        errorDescripcion.textContent = "La descripción debe tener entre 10 y 50 caracteres.";
        inputDescripcionSalon.classList.add('is-invalid');
        valido = false;
    } else {
        inputDescripcionSalon.classList.add('is-valid');
    }
    if (isNaN(precio) || Number(precio) <= 0 || !expresiones.precio.test(precio)) {
        errorPrecio.textContent = "El precio debe ser un número mayor que cero y solo contener dígitos.";
        inputPrecio.classList.add('is-invalid');
        valido = false;
    } else {
        inputPrecio.classList.add('is-valid');
    }

    return valido;
}


// const formularioS = document.getElementById('formulario')
// const inputs = document.querySelectorAll('#formulario input')

// formularioS.addEventListener('submit', function(event) {
//     event.preventDefault();
// });
//     // id de inputs de formulario (nombre, password)
//     const nombreR = document.getElementById('inputNombreRegristro').value;
//     const correoR = document.getElementByID('correoR').value;
//     const contraR = document.getElementById('inputPwRegistro').value;
       
// }


// function validacionLogin(){
//     if (nombreR === "") {
//     alert("El campo nombre está vacío");
//     return false;
// }  else if (nombreR.length < 3) {
//     alert("El nombre debe tener al menos 3 caracteres");
//     return false;
// }
//     if (contraR === "") {
//         alert("El campo contraseña está vacío");
//         return false;
//     } else if (contraR.length < 6) {
//         alert("La contraseña debe tener al menos 6 caracteres");
//         return false;
//     }

// }



