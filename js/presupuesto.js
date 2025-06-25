const modalPresupuesto = document.getElementById('modalPresupuesto');
modalPresupuesto.addEventListener('show.bs.modal', traerYmostrarServicios);

// Cargar presupuestos al iniciar
    document.addEventListener('DOMContentLoaded', () =>{
        mostrarPresupuestos(), traerYmostrarSalones(), traerYmostrarServicios()
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


    function solicitarPresupuesto() {
  // Selecciona todos los checkboxes dentro de #listaServicios
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

  const [salonNombre, salonPrecio] = salonSelec.split('|');
  const total = totalServicios + parseInt(salonPrecio);

  const nuevoPresupuesto = {
    servicios: seleccionados,
    salon: salonNombre,
    total: total
  };

  // Guarda en localStorage
  const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
  presupuestos.push(nuevoPresupuesto);
  localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

  mostrarPresupuestos(); // Ya lo tenés bien definido
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
            <td>
                <button class="eliminarStyle" onclick="eliminarPresupuesto(${index})">
                <img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt="Eliminar">
                </button></td>
                <td>
                <button id="boton-editar" class="editarStyle align-items-center" onclick="editarPresupuesto(${index})"><img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt=""></button>
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
function editarPresupuesto(index) {
    const listaPresupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const presupuestos = listaPresupuestos[index];

    // Cargar imagen en el formulario
    document.getElementById('inputI').value = presupuestos.idPresupuesto;

    desplegarFormPresupuesto();
    
    // Cambiar estado a edición
    modoEdicion = true;
    indexEdicion = index;

    // Cambiar texto del botón
    document.getElementById('btn-agregarPresupuesto').textContent = 'Guardar cambios';
    
    
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
    doc.text(`Total: $${p.total}`, 20, 55);

    doc.save(`presupuesto_${index + 1}.pdf`);
}

//desplegar formulario presupuesto
btnDesplegarFormulario.addEventListener('click', function(event) {
    event.preventDefault();
    desplegarFormPresupuesto();
    formularioS.reset();
    cerrarFormPresupuesto();
});

//cambiar visibilidad
function desplegarFormPresupuesto(){
    const tablaPresupuesto = document.getElementById('tabla-presupuesto')
    if (tablaPresupuesto.style.visibility == 'hidden') {
        tablaPresupuesto.style.visibility = 'visible';
    }else{
        tablaPresupuesto.style.visibility = 'hidden';
    }
};

function cerrarFormPresupuesto(){
    const tablaPresupuesto = document.getElementById('tabla-presupuesto')
    if (tablaPresupuesto.style.visibility == 'visible') {
        tablaPresupuesto.style.visibility = 'hidden';
    }else{
        tablaPresupuesto.style.visibility = 'visible';
    }
};