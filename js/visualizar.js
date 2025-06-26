import { inicializarLocalStorage } from "./inicializar.js"; 


document.addEventListener('DOMContentLoaded',() =>{
  visualizarSalones();
  visualizarSalonesIndex()
  inicializarLocalStorage();
  const modal = document.getElementById('modalReserva');
  if (modal) {
    modal.addEventListener('show.bs.modal', () => {
      traerYmostrarSalones();
      traerYmostrarTematica();
      traerYmostrarServicios();
    });
  }
})

// //visualizar en cards
function visualizarSalones(){
  const salones = JSON.parse(localStorage.getItem('salones')) || [];// traemos salones
  const contenedorCard = document.getElementById('containerSalones');
  const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
   
  if (!contenedorCard) return;
  contenedorCard.innerHTML = "";

  salones.forEach(salon => {

    const imagen = imagenesSalon.find(img => img.idSalon == salon.idSalon);

    const card = document.createElement("div");
    card.classList.add("col", "mt-2");

    card.innerHTML = `
             <div class="card h-100">
              <div class="card-body">
                <img src="${imagen ? imagen.rutaImagen : 'ruta/por/defecto.jpg'}" alt="${"imagen de " + salon.tituloSalon}"/>
                <h5 class="card-title">${salon.tituloSalon}</h5>
                 <p class="card-text"><strong>Descripcion:</strong> ${salon.descripcion}</p>
                <p class="card-text"><strong>Ubicación:</strong> ${salon.direccionSalon}</p>
                <p class="card-text"><strong>Precio:</strong> ${salon.precioSalon}</p>
                <p class="card-text">${salon.estadoSalon}</p>
                <button class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#modalReserva">Reservar</button>
                </div>
            </div>
            ` ;
            
    contenedorCard.appendChild(card);
  }) 
}


function visualizarSalonesIndex() {
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  const imagenesSalon = JSON.parse(localStorage.getItem('imagenesSalon')) || [];
  const contenedorCardIndex = document.getElementById('containerIndexSalones');
  if (!contenedorCardIndex) return;

  //Detecta el tamaño
  const esCelular = window.innerWidth < 768;
  const itemsPorSlide = esCelular ? 1 : 2;

  // Agrupar salones por slide
  let slides = [];
  for (let i = 0; i < salones.length; i += itemsPorSlide) {
    slides.push(salones.slice(i, i + itemsPorSlide));
  }

  // Generar HTML
  let inner = slides.map((grupo, idx) => `
    <div class="carousel-item${idx === 0 ? ' active' : ''} ">
      <div class="row justify-content-center">
        ${grupo.map(salon => {
          const imagen = imagenesSalon.find(img => img.idSalon == salon.idSalon);
          return `
            <div class="col-10  col-md-6">
              <div class="card h-100 mx-2 my-2">
                <img src="${imagen ? imagen.rutaImagen : 'ruta/por/defecto.jpg'}" class="card-img-top" alt="imagen de ${salon.tituloSalon}">
                <div class="card-body">
                  <h5 class="card-title">${salon.tituloSalon}</h5>
                  <p class="card-text"><strong>Descripcion:</strong> ${salon.descripcion}</p>
                  <p class="card-text"><strong>Ubicación:</strong> ${salon.direccionSalon}</p>
                  <p class="card-text"><strong>Precio:</strong> ${salon.precioSalon}</p>
                  <p class="card-text">${salon.estadoSalon}</p>
                  <button class="btn btn-custom">Ver Más</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  contenedorCardIndex.innerHTML = `
    <div id="salonesCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${inner}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#salonesCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#salonesCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;
}
window.addEventListener('resize', () => {
  visualizarSalonesIndex();
});//para que se adapte

/////////////////////////////////////////////////////////////////////////////////////

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

  contenedor.innerHTML = ""; // Limpia antes

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


async function reserva() {
  const salones = JSON.parse(localStorage.getItem('salones')) || [];
  const tematicas = JSON.parse(localStorage.getItem('tematicas')) || [];
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  // Servicios seleccionados
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

  // Salón seleccionado
  const selectSalon = document.getElementById('salonselec');
  const salonSeleccionado = selectSalon.value;
  if (!salonSeleccionado || serviciosSeleccionados.length === 0) {
    alert('Seleccioná al menos un servicio y un salón.');
    return;
  }

  const [salonId, salonPrecio] = salonSeleccionado.split('|');
  const salon = salones.find(s => String(s.idSalon) === salonId);

  // Temática seleccionada
  const seleccionadoTematica = document.getElementById('temaselect');
  const tematicaId = seleccionadoTematica.value;
  const tematica = tematicas.find(t => String(t.idTematica) === tematicaId);

  // Fecha
  const fechaInput = document.getElementById('fechaReserva');
  if (!fechaInput.value) {
    alert('Seleccioná una fecha.');
    return;
  }

  // Usuario
  const idUsuario = await obtenerIdUsuarioDesdeToken();
  if (!idUsuario) {
    alert('No se pudo identificar al usuario. Iniciá sesión nuevamente.');
    return;
  }

  const total = totalServicios + parseInt(salonPrecio);

  const reservas = JSON.parse(localStorage.getItem('presupuestos')) || [];
  const nuevaReserva = {
    idPresupuesto: generarIdPresupuesto(reservas),
    idUsuario: idUsuario,
    idSalon: salon.idSalon ? salon.idSalon : null,
    idServicio: serviciosSeleccionados,
    total: total,
    fechaReserva: fechaInput.value,
    idTematica: tematica.idTematica ? tematica.idTematica : null,
  };

  reservas.push(nuevaReserva);
  localStorage.setItem('presupuestos', JSON.stringify(reservas));


  if (window.bootstrap && window.bootstrap.Modal) {
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
    if (modal) modal.hide();
  }
  // resetea formulario
  document.getElementById('formularioReserva').reset();
}


function generarIdPresupuesto(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(p => p.idPresupuesto)) + 1;
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


//para visualizalo de manera global
window.reserva = reserva;
