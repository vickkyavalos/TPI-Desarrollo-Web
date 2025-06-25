document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaReservas");

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (!userData || !userData.username) {
    alert("No se encontró información del usuario. Redirigiendo al login.");
    window.location.href = "../templates/login.html";
    return;
  }

  const usernameActual = userData.username;

  // Mostrar nombre en el header y mostrar info usuario
  document.getElementById("nombre-usuario").textContent = usernameActual;
  document.getElementById("user-info").style.display = "flex";

  // Mostrar botón logout
  const btnLogout = document.getElementById("btn-logout");
  btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../templates/login.html";
  });

  // Obtener presupuestos desde localStorage
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

  // Filtrar presupuestos del usuario actual
  const reservasUsuario = presupuestos.filter(
    (p) => p.usuario === usernameActual
  );

  // Mostrar las reservas en la tabla
  if (reservasUsuario.length === 0) {
    tabla.innerHTML = `<tr><td colspan="4" class="text-center">No tenés reservas registradas.</td></tr>`;
    return;
  }

  reservasUsuario.forEach((reserva, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${reserva.servicios.join(", ")}</td>
      <td>${reserva.salon}</td>
      <td>$${reserva.total}</td>
    `;
    tabla.appendChild(fila);
  });
});
