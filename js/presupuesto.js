const formularioPresupuesto = document.getElementById("formularioPresupuesto");
const modalPresupuesto = document.getElementById('modalPresupuesto');
modalPresupuesto.addEventListener('show.bs.modal', 
    traerYmostrarServicios);


// Cargar presupuestos al iniciar
  document.addEventListener('DOMContentLoaded', () =>{
      mostrarPresupuestos(), traerYmostrarSalones(), traerYmostrarServicios(), traerYmostrarTematica()






   }); 

function traerYmostrarSalones(){
    //trae los salones guardados 
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const select = document.getElementById('salonselec');
    if (!select) return;

    select.innerHTML = '<option value="">Seleccioná un salón</option>';
    salones.forEach(salon => {
    select.innerHTML += `<option value="${salon.tituloSalon}|${salon.precioSalon}">${salon.tituloSalon} ($${salon.precioSalon})</option>`;
    });
    }

function traerYmostrarServicios() {
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  const contenedor = document.getElementById('listaServicios');
  if (!contenedor) return;

  contenedor.innerHTML = ''; // Limpiar contenido anterior

  servicios.forEach((servicio, index) => {
    const id = `servicio${index + 1}`;
    const valor = `${servicio.tituloServicio}|${servicio.precioServicio}`;
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
    tematicas.forEach(tematicas => {
    seleccionadoTematica.innerHTML += `<option value="${tematicas.tituloTematica}">${tematicas.tituloTematica}</option>`;
    });
    }

function solicitarPresupuesto() {
    const seleccionadoTematica = document.getElementById('temaselect');
    const checkboxes = document.querySelectorAll('#listaServicios .form-check-input');
    const seleccionados = [];
    let totalServicios = 0;

    checkboxes.forEach(c => {
        if (c.checked) {
            const [nombre, precio] = c.value.split('|');
            seleccionados.push(nombre);
            totalServicios += parseInt(precio);
        }
    });

    const select = document.getElementById('salonselec');
    const salonSelec = select.value;

    if (!salonSelec || seleccionados.length === 0) {
        alert('Seleccioná al menos un servicio y un salón.');
        return;
    }

    const fechaInput = document.getElementById('fechaReserva');
    const [salonNombre, salonPrecio] = salonSelec.split('|');
    const total = totalServicios + parseInt(salonPrecio);

    const nuevoPresupuesto = {
        servicios: seleccionados,
        salon: salonNombre,
        total: total,
        fechaReserva: fechaInput.value,
        tematica: seleccionadoTematica.value
    };

    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];

    if (modoEdicion) {
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
    document.getElementById('form-presupuesto').reset();
}

function mostrarPresupuestos() {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const tbody = document.getElementById('tablaPresupuestos');
    tbody.innerHTML = '';

    presupuestos.forEach((p, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.servicios.join(', ')}</td>
            <td>${p.salon}</td>
            <td>$${p.total}</td>
            <td>${p.fechaReserva}</td>
            <td>${p.tematica}</td>
            <td>${p.idCliente || ''}</td>
            <td>${p.nombreCliente || ''}</td>
            <td>${p.apellidoCliente || ''}</td>
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
//editar 
// 
function editarPresupuesto(index) {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const presupuesto = presupuestos[index];

    modoEdicion = true;
    indexEdicion = index;

    // Rellenar los campos del formulario
    document.getElementById('fechaReserva').value = presupuesto.fechaReserva;
    document.getElementById('temaselect').value = presupuesto.tematica;

    // Seleccionar el salón correcto
    const salonSelect = document.getElementById('salonselec');
    for (let i = 0; i < salonSelect.options.length; i++) {
        if (salonSelect.options[i].text.includes(presupuesto.salon)) {
            salonSelect.selectedIndex = i;
            break;
        }
    }

    // Seleccionar los servicios
    const checkboxes = document.querySelectorAll('#listaServicios .form-check-input');
    checkboxes.forEach(c => {
        const [nombre] = c.value.split('|');
        c.checked = presupuesto.servicios.includes(nombre);
    });

    // Cambiar texto del botón
    const btn = document.getElementById('btn-solicitarPresupuesto');
    if (btn) {
        btn.textContent = 'Guardar Cambios';
    }
    formularioPresupuesto.reset();

}


// para descargar presupuesto en pdf 
async function exportarPDF(index) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const p = presupuestos[index];

    doc.setFontSize(14);
    doc.text("Presupuesto", 20, 20);
    doc.setFontSize(12);
    doc.text(`Servicios: ${p.servicios.join(', ')}`, 20, 35);
    doc.text(`Salón: ${p.salon}`, 20, 45);
    doc.text(`Fecha de Reserva: ${p.fechaReserva}`, 20, 55);
    doc.text(`Total: $${p.total}`, 20, 65);

    doc.save(`presupuesto_${index + 1}.pdf`);
}

