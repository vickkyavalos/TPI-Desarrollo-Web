document.addEventListener("DOMContentLoaded", () => {
  mostrarReservasUsuarioEnTabla();
});

async function mostrarReservasUsuarioEnTabla(){
  const tabla = document.getElementById("tablaReserva");
  const userData = JSON.parse(sessionStorage.getItem("userData"))|| [];
  const salones = JSON.parse(localStorage.getItem("salones")) || [];
  const tematicas = JSON.parse(localStorage.getItem("tematicas")) || [];
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  
  if (!userData || !userData.username) {
    alert("No se encontró información del usuario. Redirigiendo al login.");
    window.location.href = "../templates/login.html";
    return;
  }

  const idUsuario = await obtenerIdUsuarioDesdeToken();
  if (!idUsuario) {
    alert('desconocido');
    return;
  }

  // obtener presupuestos desde localStorage
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

  // filtrar presupuestos del usuario actual
  const reservasUsuario = presupuestos.filter(
    (p) => p.idUsuario === idUsuario
  );
  


  // mostrar las reservas en la tabla
  if (reservasUsuario.length === 0) {
    tabla.innerHTML = `<tr><td colspan="4" class="text-center">No tenés reservas registradas.</td></tr>`;
    return;
  }

  reservasUsuario.forEach((reserva,index) => {
    const fila = document.createElement("tr");
    const salon = salones.find(s => s.idSalon === reserva.idSalon);
    const tematica = tematicas.find(t => t.idTematica === reserva.idTematica);
   
    let serviciosTexto = '';
      if (Array.isArray(reserva.idServicio)) {
        serviciosTexto = reserva.idServicio
          .map(idServicio => {
            const servicio = servicios.find(s => String(s.idServicio) === String(idServicio));
            return servicio ? servicio.tituloServicio : '';
          })
          .filter(Boolean)
          .join(', ');
      } 

    fila.innerHTML = `
            <td>${reserva.idPresupuesto}</td>
            <td>${serviciosTexto}</td>
            <td>${salon ? salon.tituloSalon : 'desconocido'}</td>
            <td>${tematica ? tematica.tituloTematica : 'desconocido'}</td>
            <td>${reserva.fechaReserva}</td>
            <td>$${reserva.total}</td>
            
    `;
    tabla.appendChild(fila);
  });
}

async function obtenerIdUsuarioDesdeToken() {
  const token = sessionStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const usuario = await response.json();
      return usuario.id;
    }
  } catch (e) {
    console.error("Error al obtener ID de usuario:", e);
  }

  return null;
}
