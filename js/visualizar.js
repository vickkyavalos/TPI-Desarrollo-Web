import { imgSalones, inicializarLocalStorage } from "./inicializar.js"; 


document.addEventListener('DOMContentLoaded',() =>{
  visualizarSalones();
  visualizarSalonesIndex()
  inicializarLocalStorage();
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
                <p class="card-text">🔴 Sin disponibilidad</p>
                <a href="#" class="btn btn-custom">Ver más</a>
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
                  <p class="card-text">🔴 Sin disponibilidad</p>
                  <a href="#" class="btn btn-custom">Ver más</a>
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