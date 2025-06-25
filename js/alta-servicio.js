
let modoEdicionServicio = false;
let indexEdicionServicio = null;

const formAdminServicio = document.getElementById('form-admin-servicios');
const formularioServicio = document.getElementById('formularioServicio');
const btnDesplegarFormularioServicio = document.getElementById('btn-desplegarFormularioServicio');

function obtenerNuevoIdServicio(servicios) {
    if (servicios.length === 0) return 1;
    const maxId = Math.max(...servicios.map(s => s.idServicio || 0));
    return maxId + 1;
}

// Guarda datos en el localStorage - Servicios//
formularioServicio.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!formularioServicio.checkValidity()) {
        formularioServicio.classList.add('was-validated');
        return;
    }

    const tituloServicio = document.getElementById('inputTituloServicio').value;
    const precioServicio = document.getElementById('inputPrecioServicio').value;

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    const idServicio = modoEdicionServicio ? servicios[indexEdicionServicio].idServicio : obtenerNuevoIdServicio(servicios);
    if (modoEdicionServicio) {
        servicios[indexEdicionServicio] = { idServicio, tituloServicio, precioServicio };
        modoEdicionServicio = false;
        indexEdicionServicio = null;
        document.getElementById('btn-agregarServicio').textContent = 'Cargar Servicio';
    } else {
        servicios.push({ idServicio, tituloServicio, precioServicio });
    }

    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios();

    //cerrar modal
    const modalServicios = document.getElementById('modalServicio');
    if (modalServicios) {
        let modalcerrar = bootstrap.Modal.getInstance(modalServicios);
        if (!modalcerrar) {
            modalcerrar = new bootstrap.Modal(modalServicios);
        }
        modalcerrar.hide();
    }


    formularioServicio.reset();
    formularioServicio.classList.remove('was-validated');
});

// DesplIEGA formulario //
btnDesplegarFormularioServicio.addEventListener('click', function(event) {
    event.preventDefault();
    formularioServicio.reset();
    document.getElementById('btn-agregarServicio').textContent = 'Cargar Servicio';

});


// Visualiza tabla//
function mostrarServicios() {
    const tablaServicios = document.querySelector('#tabla-servicios');
    tablaServicios.innerHTML = '';

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.forEach((servicio, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${servicio.idServicio}</td>
            <td>${servicio.tituloServicio}</td>
            <td>${servicio.precioServicio}</td>
            <td>
                <button class="editarStyle" data-bs-toggle="modal" data-bs-target="#modalServicio" onclick="editarServicio(${index})">
                    <img class="mx-1 iconos-tabla" src="/assets/icons/lapiz.svg" alt="Editar">
                </button>
                <button class="eliminarStyle" onclick="eliminarServicio(${index})">
                    <img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt="Eliminar">
                </button>
            </td>
        `;
        tablaServicios.appendChild(fila);
    });
}

function eliminarServicio(index) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.splice(index, 1);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios();
}

function editarServicio(index) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios[index];

    document.getElementById('inputTituloServicio').value = servicio.tituloServicio;
    document.getElementById('inputPrecio').value = servicio.precioServicio;

    desplegarFormularioServicio();

    modoEdicionServicio = true;
    indexEdicionServicio = index;

    document.getElementById('btn-agregarServicio').textContent = 'Guardar cambios';
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarServicios();
});
