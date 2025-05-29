const container = document.querySelector(".container-login");
const btnregistra = document.getElementById("btn-registra");
const btninicia = document.getElementById("btn-inicia");

btnregistra.addEventListener("click", () => {
  container.classList.add("toggle");
});

btninicia.addEventListener("click", () => {
  container.classList.remove("toggle");
});


