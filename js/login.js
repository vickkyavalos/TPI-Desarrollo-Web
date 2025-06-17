const container = document.querySelector(".container-login");
const btnregistra = document.getElementById("btn-registra");
const btninicia = document.getElementById("btn-inicia");
const formLogin = document.getElementById('formularioLogin');

btnregistra.addEventListener("click", () => {
  container.classList.add("toggle");
});

btninicia.addEventListener("click", () => {
  container.classList.remove("toggle");
});


document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.querySelector('#tablaUsuarios tbody');

  try {
    const response = await fetch('https://dummyjson.com/users');
    if (response.ok) {
      const data = await response.json();
      const usuarios = data.users;

      usuarios.forEach((usuario) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${usuario.firstName}</td>
          <td>${usuario.lastName}</td>
          <td>${usuario.email}</td>
          <td>${usuario.phone}</td>
        `;
        tabla.appendChild(fila);
      });

    } else {
      console.error(response.status);
      throw new Error("Error al consultar");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Error con la API de usuarios");
  }
});


// document.getElementById("btn-is").addEventListener("click", function(e) {
//         e.preventDefault(); 
//           falsoAuth(); 
//   }
//  );


// function falsoAuth(){
//   const user = {
//   user: "admin123@gmail.com",
//   contrasena: "admin1234", }

//   const userInput = document.getElementById("emailLogin").value;
//   const passwordInput = document.getElementById("contrasenalogin").value;
    
//   if (userInput === user.user && passwordInput === user.contrasena) {
//             {
//                  swal.fire(
//                      title="Bienvenido",
//                      text="Inicio de sesión exitoso. Redirigiendo a la página...",
//                      icon="success",
//                    );
//                  setTimeout(function() {
//                      window.location.href = "../templates/panel-admin.html";
//                  }, 4000);
//              }
//   } else {
//              if(userInput != user.user || passwordInput != user.contrasena){
//                  swal.fire({
//                  title:"¡Datos Incorrectos!",
//                  icon:"error",
//              });}
//              if(userInput == "" && passwordInput == ""){
//                  {swal.fire({
//                          title:"¡No se registraron datos!",
//                          icon:"warning",
//                      });
        
//                  };
            
//   }
//   if (formLogin) {
//     formLogin.addEventListener("submit", falsoAuth);
//   }

 
// }
// }

