document.addEventListener("DOMContentLoaded", () => {
  const userData = sessionStorage.getItem("userData")
  const iconoLink = document.getElementById("icono-link")
  const userInfo = document.getElementById("user-info")
  const nombreUsuario = document.getElementById("nombre-usuario")
  const logoutBtn = document.getElementById("btn-logout")

  // console.log("Script iniciado")
  // console.log("userData:", userData)

  if (userData) {
    const user = JSON.parse(userData)
    const nombre = user.firstNameUser
    const rol = user.roleUser

    //console.log("Usuario logueado:", user)


    nombreUsuario.textContent = `Hola, ${nombre}`
    userInfo.style.display = "flex"
    userInfo.setAttribute("style", "display: flex !important;") 

    iconoLink.href = "#"

    
    const estaEnPanel = window.location.pathname.includes("panel-admin.html")
    const esAdmin = rol === "admin"

    if (estaEnPanel && !esAdmin) {
      window.location.href = "../templates/catalogo.html"
    }
  } else {
    
    userInfo.style.display = "none"
    userInfo.setAttribute("style", "display: none !important;") 
    nombreUsuario.textContent = "" 

    iconoLink.href = "../templates/login.html"

    if (window.location.pathname.includes("panel-admin.html")) {
      window.location.href = "../templates/login.html"
    }
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault() 

    //console.log("Cerrar sesión clickeado")

    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("userData")

  
    userInfo.style.display = "none"
    userInfo.setAttribute("style", "display: none !important;")
    nombreUsuario.textContent = ""

    window.location.href = "../templates/login.html"
  })
})


