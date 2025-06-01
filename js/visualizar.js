//visualizar en cards
function visualizarSalones(){
  const salones = JSON.parse(localStorage.getItem('salones')) || [];// traemos salones
  const contenedorCard = document.getElementById('containerSalones');

  contenedorCard.innerHTML = "";

  salones.forEach(salon => {
     const card = document.createElement("div");
     card.classList.add("col", "mt-2");

    card.innerHTML = `
             <div class="card h-100">
               
              <div class="card-body">
                <h5 class="card-title">${salon.tituloSalon}</h5>
                 <p class="card-text"><strong>Descripcion:</strong> $${salon.descripcion}</p>
                <p class="card-text"><strong>Ubicación:</strong> ${salon.direccionSalon}</p>
                <p class="card-text"><strong>Precio:</strong> $${salon.precioSalon}</p>
                <p class="card-text">"🟢 Disponible"}</p>
                <a href="#" class="btn btn-custom">Ver más</a>
                </div>
            </div>
            ` ;
            
    contenedorCard.appendChild(card);
  }) 
}

document.addEventListener('DOMContentLoaded',() =>{
  visualizarSalones()
})
/* {<img class="card-img-top" src="${salon.image}" alt="${salon.name}"> }*/
