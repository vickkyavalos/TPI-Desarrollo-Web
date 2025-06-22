document.addEventListener("DOMContentLoaded", () => {
  const userData = sessionStorage.getItem("userData");
  const iconoLink = document.getElementById("icono-link");
  const userInfo = document.getElementById("user-info");
  const nombreUsuario = document.getElementById("nombre-usuario");
  const logoutBtn = document.getElementById("btn-logout");

  if (userData) {

    const user = JSON.parse(userData);
    const nombre = user.firstNameUser;
    const rol = user.roleUser;

    nombreUsuario.textContent = `Hola, ${nombre}`;
    userInfo.style.display = "flex";

    // Cambiar el link del ícono para que no redirija al login
    iconoLink.href = "#";


    const estaEnPanel = window.location.pathname.includes("panel-admin.html");
    const esAdmin = rol === "admin";

    if (estaEnPanel && !esAdmin) {
      window.location.href = "../templates/catalogo.html";
    }
  } else {
    if (window.location.pathname.includes("panel-admin.html")) {
      window.location.href = "../templates/login.html";
    }
  }

  logoutBtn?.addEventListener("click", () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userData");
    window.location.href = "../templates/login.html";
  });
});

