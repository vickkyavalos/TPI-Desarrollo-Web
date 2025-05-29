//form de alta salon
const formularioS = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')


formularioS.addEventListener('submit'), function(event) {
    event.preventDefault();

    // id de inputs de formulario (nombre, password)
    const nombreR = document.getElementById('inputNombreRegristro').value;
    const contraR = document.getElementById('inputPwRegistro').value;
       
}

const expresiones = { //define las expresiones  regulares parea validar la contraseña y el correo
    contraaR: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
}

function validacionLogin(){
  if (nombreR === "") {
    alert("El campo nombre está vacío");
    return false;
}  else if (nombreR.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return false;
}
}

    if (contraR === "") {
        alert("El campo contraseña está vacío");
        return false;
    } else if (contraR.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return false;
    }


 
    

function validacionAltaSalon(e){
    switch(e.target.name){
        case"titulo":
        if (titulo.test(e.target.value)) {
            documen
ynemelEteg.
        } else {
            
        }
        
        
    }
}        
    
