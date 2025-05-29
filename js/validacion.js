const expresiones={
    titulo: /^[a-zA-Z0-9\s]{1,50}$/,
    direccion: /^[a-zA-Z0-9\s]{1,100}$/,
    descripcion: /^.{1,200}$/,
    precio: /^\d{1,7}$/
} 

const formularioS = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

formularioS.addEventListener('submit', function(event) {
    event.preventDefault();
});
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




function validacionAltaSalon(e) {
    switch (e.target.name) {
        case "titulo":
            if (expresiones.titulo.test(e.target.value)) {
                document.getElementById('inputTituloSalon').textContent = '';
            } else {
                document.getElementById('inputTituloSalon').textContent = 'Este campo no puede estar vacío';
            }
            break;

        case "direccion":
            if (expresiones.direccion.test(e.target.value)) {
                document.getElementById('inputDireccion').textContent = '';
            } else {
                document.getElementById('inputDireccion').textContent = 'Este campo no puede estar vacío';
            }
            break;

        case "descripcion":
            if (expresiones.descripcion.test(e.target.value)) {
                document.getElementById('inputDescripcionSalon').textContent = '';
            } else {
                document.getElementById('inputDescripcionSalon').textContent = 'Este campo no puede estar vacío';
            }
            break;

        case "precio":
            if (expresiones.precio.test(e.target.value)) {
                document.getElementById('inputPrecio').textContent = '';
            } else {
                document.getElementById('inputPrecio').textContent = 'Este campo no puede estar vacío';
            }
            break;
    }
}
 
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keyup', validacionAltaSalon);
});