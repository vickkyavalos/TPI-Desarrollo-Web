import { login, obtenerUsuario} from "./auth.js";

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


document.addEventListener('DOMContentLoaded',() =>{
  auth()
})

// Función para verificar si el usuario está logueado y es admin
function auth(){
  document.getElementById("formularioLogin").addEventListener('submit', async function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuarioLogin").value.trim();
  const contrasena = document.getElementById("contrasenalogin").value.trim();
  // const data = data.token; 

  const data = await login(usuario, contrasena);
  if (!data || !data.accessToken) {
    swal.fire({
      title: "Error",
      text: "Credenciales inválidas",
      icon: "error"
    });
    return data;
  }

  const traerID = await fetch(`https://dummyjson.com/users/${data.id}`)
  const user = await traerID.json();
  //const user = await obtenerUsuario(data.accesToken);
  if (!user) return;
  
  const firstNameUser = user.firstName;
  const username = user.username;
  const roleUser = user.role;

  const userMostrar = {firstNameUser, username, roleUser};

  

  sessionStorage.setItem('userData', JSON.stringify(userMostrar));

  let redirigir = '';
  let mensaje = '';

  if (user.role === 'admin') {
    redirigir = '../templates/panel-admin.html';
    mensaje = 'panel de administración';
  } else {
    redirigir = '../templates/catalogo.html';
    mensaje = 'catálogo de salones';
  }

  swal.fire({
    title: `Bienvenido ${user.firstName}`,
    text: `Redirigiendo al ${mensaje}...`,
    icon: 'success'
  });

   setTimeout(() => {
     window.location.href = redirigir;
      }, 2000);
   });

}








































































// function auth(){
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
//     formLogin.addEventListener("submit", auth);
//   }

 
// }
// }

