function mostrarAlertaExito(tituloSalon) {
  Swal.fire({
    title: `¡${tituloSalon} cargado exitosamente!`,
    text: "El salón ha sido agregado correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}
