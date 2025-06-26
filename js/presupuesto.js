const formularioPresupuesto = document.getElementById("formularioPresupuesto");
const modalPresupuesto = document.getElementById('modalPresupuesto');
modalPresupuesto.addEventListener('show.bs.modal', 
    traerYmostrarServicios);


// cargar presupuestos al iniciar
  document.addEventListener('DOMContentLoaded', async () =>{
      mostrarPresupuestos(), 
      traerYmostrarSalones(), 
      traerYmostrarServicios(), 
      traerYmostrarTematica(),
      await obtenerUsuarios();

   }); 


function traerYmostrarSalones(){
    //trae los salones guardados 
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const select = document.getElementById('salonselec');
    if (!select) return;

    select.innerHTML = '<option value="">Seleccioná un salón</option>';
    salones.forEach((salon,index) => {
      const tituloSalon= `${salon.tituloSalon}`;
      const valor = `${salon.idSalon}| ${salon.precioSalon}`;
      const precio = `${salon.precioSalon}`;
    select.innerHTML += `<option value="${valor} ">${tituloSalon} ($${precio})</option>`;
    });
}


function traerYmostrarServicios() {
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  const contenedor = document.getElementById('listaServicios');
  if (!contenedor) return;

  contenedor.innerHTML = ""; // limpia antes

  servicios.forEach((servicio, index) => {
    const id = `servicio${servicio.idServicio}`;
    const valor = `${servicio.idServicio}|${servicio.precioServicio}`;
    const labelTexto = `${servicio.tituloServicio} - $${servicio.precioServicio}`;

    contenedor.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${valor}" id="${id}">
        <label class="form-check-label" for="${id}">${labelTexto}</label>
      </div>
      `;
    });
  }


  function traerYmostrarTematica(){
    //trae los tematica guardados 
    const tematicas = JSON.parse(localStorage.getItem('tematicas')) || [];
    const seleccionadoTematica = document.getElementById('temaselect');
    if (!seleccionadoTematica) return;

    seleccionadoTematica.innerHTML = '<option value="">Seleccioná una temática</option>';
    tematicas.forEach((tematica,index) => {
    const id = `tematica${tematica.idTematica}`;
    const tituloTematica = `${tematica.tituloTematica}`
    const valor = `${tematica.idTematica}`;
    seleccionadoTematica.innerHTML += `<option id="${id}"value="${valor}">${tituloTematica}</option>`;
    });
    }

function solicitarPresupuesto() {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const tematicas = JSON.parse(localStorage.getItem('tematicas')) || [];
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    

    const checkboxes = document.querySelectorAll('#listaServicios .form-check-input');
    const serviciosSeleccionados = [];
    let totalServicios = 0;
    checkboxes.forEach(c => {
        if (c.checked) {
        const [idServicio, precio] = c.value.split('|');
        serviciosSeleccionados.push(idServicio);
        totalServicios += parseInt(precio);
        }
    });

    
  // salón seleccionado
  const selectSalon = document.getElementById('salonselec');
  const salonSeleccionado = selectSalon.value;
  if (!salonSeleccionado || serviciosSeleccionados.length === 0) {
    alert('Seleccioná al menos un servicio y un salón.');
    return;
  }
   
    const [salonId, salonPrecio] = salonSeleccionado.split('|');
    const salon = salones.find(s => String(s.idSalon) === salonId);

    const fechaInput = document.getElementById('fechaReserva');
    if (!fechaInput.value) {
        alert('Seleccioná una fecha.');
     return;
     }
    const total = totalServicios + parseInt(salonPrecio);
    const usuarioIdInput = document.getElementById('usuarioId');
    const idUsuario = usuarioIdInput ? parseInt(usuarioIdInput.value) : null;

    //usuario válido
    if (!idUsuario || idUsuario < 1 || idUsuario > 30) {
        alert('Seleccioná un ID de usuario válido (1 a 30).');
        return;
    }
    // temática seleccionada
    const seleccionadoTematica = document.getElementById('temaselect');
    const tematicaId = seleccionadoTematica.value;
    const tematica = tematicas.find(t => String(t.idTematica) === tematicaId);
    
    
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    

    const nuevoPresupuesto = {
       idPresupuesto: modoEdicion ? presupuestos[indexEdicion].idPresupuesto : generarIdPresupuesto(presupuestos),
       idUsuario: idUsuario,
       idSalon: salon.idSalon ? salon.idSalon : null,
       idServicio: serviciosSeleccionados,
       total: total,
       fechaReserva: fechaInput.value,
       idTematica: tematica.idTematica ? tematica.idTematica : null,
    };

    
    if (modoEdicion) {
        nuevoPresupuesto.idUsuario = presupuestos[indexEdicion].idUsuario;
        presupuestos[indexEdicion] = nuevoPresupuesto;
        modoEdicion = false;
        indexEdicion = null;

        const btn = document.getElementById('btn-solicitarPresupuesto');
        if (btn) {
            btn.textContent = 'Solicitar Presupuesto';
        }
    } else {
        presupuestos.push(nuevoPresupuesto);
    }

    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPresupuesto'));
    if (modal) {
        modal.hide();
    }

    mostrarPresupuestos();
    formularioPresupuesto.reset();
}

function generarIdPresupuesto(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(p => p.idPresupuesto)) + 1;
    }



async function mostrarPresupuestos() {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const tematicas = JSON.parse(localStorage.getItem('tematicas')) || [];
    const serviciosTodos = JSON.parse(localStorage.getItem('servicios')) || [];

    const usuarios = await obtenerUsuarios();
    const tbody = document.getElementById('tablaPresupuestos');
    tbody.innerHTML = '';
      
    presupuestos.forEach((p, index) => {
      const salon = salones.find(s => s.idSalon === p.idSalon);
      const tematica = tematicas.find(t => t.idTematica === p.idTematica);
      const usuario = usuarios.find(u => u.id === p.idUsuario) || {};
      const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`;
      const servicios = JSON.parse(localStorage.getItem('servicios')) || []  
      
      let serviciosTexto = '';
      if (Array.isArray(p.idServicio)) {
        serviciosTexto = p.idServicio
          .map(idServicio => {
            const servicio = servicios.find(s => String(s.idServicio) === String(idServicio));
            return servicio ? servicio.tituloServicio : '';
          })
          .filter(Boolean)
          .join(', ');
      } 
      const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.idPresupuesto}</td>
            <td>${salon ? salon.tituloSalon : ''}</td>
            <td>${serviciosTexto}</td>
            <td>$${p.total}</td>
            <td>${p.fechaReserva}</td>
            <td>${tematica ? tematica.tituloTematica : ''}</td>
            <td>${usuario ? usuario.id : ''}</td>
            <td>${usuario ? usuario.firstName : ''}</td>
            <td>${usuario ? usuario.lastName : ''}</td>
            <td>
                <button id="boton-editar" data-bs-toggle="modal" data-bs-target="#modalPresupuesto" class="editarStyle align-items-center" onclick="editarPresupuesto(${index})">
                  <img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt=""></button>
                <button class="eliminarStyle" onclick="eliminarPresupuesto(${index})">
                  <img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt="Eliminar">
                </button>
            </td>
            <td>
                <button class="btn btn-primary" onclick="exportarPDF(${index})">Descarga</button>
            </td>
        `;
    tbody.appendChild(fila);
  });
}

// boton eliminar
function eliminarPresupuesto(index) {
        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
        presupuestos.splice(index, 1);
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
        mostrarPresupuestos();
    }

//boton editar
 function editarPresupuesto(index) {
        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
        const presupuesto = presupuestos[index];

        modoEdicion = true;
        indexEdicion = index;

        // rellenar los campos del formulario
        document.getElementById('fechaReserva').value = presupuesto.fechaReserva;
        document.getElementById('temaselect').value = presupuesto.tematica;

        // seleccionar el salón correcto
        const salonSelect = document.getElementById('salonselec');
        for (let i = 0; i < salonSelect.options.length; i++) {
            if (salonSelect.options[i].text.includes(presupuesto.salon)) {
                salonSelect.selectedIndex = i;
                break;
            }
        }

        // seleccionar los servicios
        const checkboxes = document.querySelectorAll('#listaServicios .form-check-input');
        checkboxes.forEach(c => {
            const [nombre] = c.value.split('|');
            c.checked = presupuesto.idServicio.includes(nombre);
        });

        // cambiar texto del botón
        const btn = document.getElementById('btn-solicitarPresupuesto');
        if (btn) {
            btn.textContent = 'Guardar Cambios';
        }
        formularioPresupuesto.reset();

    }

async function exportarPDF(index) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];
  const salones = JSON.parse(localStorage.getItem("salones")) || [];
  const tematicas = JSON.parse(localStorage.getItem("tematicas")) || [];
  const serviciosTodos = JSON.parse(localStorage.getItem("servicios")) || [];
  const usuarios = await obtenerUsuarios();

  const p = presupuestos[index];

  //busca el usuario
  const usuario = usuarios.find(u => u.id === p.idUsuario) || {};
  const nombreCompleto = `${usuario.firstName || ''} ${usuario.lastName || ''}`;

  const serviciosTexto = Array.isArray(p.idServicio)
    ? p.idServicio
        .map(id => {
          const serv = serviciosTodos.find(s => String(s.idServicio) === String(id));
          return serv ? serv.tituloServicio : '';
        })
        .filter(Boolean)
        .join(', ')
    : '';

 
  const salon = salones.find(s => s.idSalon === p.idSalon);
  const tematica = tematicas.find(t => t.idTematica === p.idTematica);

  doc.setFontSize(14);
  doc.text("Presupuesto", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nombre: ${nombreCompleto}`, 20, 30);
  doc.text(`Servicios: ${serviciosTexto}`, 20, 40);
  doc.text(`Salón: ${salon ? salon.tituloSalon : ''}`, 20, 50);
  doc.text(`Temática: ${tematica ? tematica.tituloTematica : ''}`, 20, 60);
  doc.text(`Fecha de Reserva: ${p.fechaReserva}`, 20, 70);
  doc.text(`Total: $${p.total}`, 20, 80);

  doc.save(`presupuesto_${index + 1}.pdf`);
}

async function obtenerUsuarios() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        return data.users; 
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
