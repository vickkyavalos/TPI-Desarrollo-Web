document.addEventListener("DOMContentLoaded", function () {
  const btnCrearCuenta = document.getElementById("btn-rg");

  if (btnCrearCuenta) {
    btnCrearCuenta.addEventListener("click", function (e) {
      e.preventDefault(); 

      Swal.fire({
        title: "¡Cuenta creada!",
        text: "confirme su registro, ingresando a su email",
        icon: "success",
        confirmButtonText: "Ir a email"
      });
    });
  }
});
