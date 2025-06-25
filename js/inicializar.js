// Función para inicializar LocalStorage
export const eventosExportados = [
    { idSalon: 1 ,tituloSalon: "Fiesta Kids", direccionSalon: "Av. Rivadavia 123", descripcion: "Salón temático con animadores, pista de baile y catering incluido.", precioSalon: 100000, estadoSalon:"Disponible" },
    { idSalon: 2 ,tituloSalon: "Rincón Feliz", direccionSalon: "Urquiza 345", descripcion: "Espacio con juegos interactivos, plaza blanda y sector de merienda.", precioSalon: 200000, estadoSalon:"Disponible" },
    { idSalon: 3 ,tituloSalon: "Peque Mundo", direccionSalon: "Savio 3000", descripcion: "Zona de juegos blandos, rincón de lectura y mini cine para los chicos", precioSalon:  60000, estadoSalon:"Reservado" }
];

export const imgSalones = [
    { idImagen: 1, idSalon: 1, rutaImagen: "../assets/img/evento3.jpg" },
    { idImagen: 2, idSalon: 2, rutaImagen: "../assets/img/burbuja-kid.jpg" },
    { idImagen: 3, idSalon: 3, rutaImagen: "../assets/img/salon.jpg" },

];

export const servicios = [
    {idServicio: 1, tituloServicio: "Dj - Música", precioServicio: 25000},
    {idServicio: 2, tituloServicio: "Catering", precioServicio: 35000},
    {idServicio: 3, tituloServicio: "Fotografía", precioServicio: 30000},
    {idServicio: 4, tituloServicio: "Decoración", precioServicio: 15000},
];

export const presupuestos = [
    { idPresupuesto: 1, idUsuario: 16, idSalon: 1, idServicios: [1, 2],  idTematica: 1, fechaReserva: "2025-07-01", total: 135000 },
    { idPresupuesto: 2, idUsuario: 17, idSalon: 2, idServicios: [2, 3],  idTematica: 2, fechaReserva: "2025-07-02", total: 235000 },
    { idPresupuesto: 3, idUsuario: 18, idSalon: 3, idServicios: [1, 3, 4], idTematica: 3, fechaReserva: "2025-07-03", total: 110000 },
    { idPresupuesto: 4, idUsuario: 19, idSalon: 1, idServicios: [3],  idTematica: 4, fechaReserva: "2025-07-04", total: 130000 }
];

export const tematicas = [
    {idTematica: 1, tituloTematica: "Spiderman"},
    {idTematica: 2, tituloTematica: "Kuromi"},
    {idTematica: 3, tituloTematica: "Merlina"},
    {idTematica: 4, tituloTematica: "Marvel"},
    {idTematica: 5, tituloTematica: "Star Wars"}
];

export const inicializarLocalStorage = () => {
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify(eventosExportados));
        //console.log(eventosExportados);
    }
    if (!localStorage.getItem("imagenesSalon")) {
        localStorage.setItem("imagenesSalon", JSON.stringify(imgSalones));
        //console.log(imgSalones);
    }
    if (!localStorage.getItem("servicios")) {
        localStorage.setItem("servicios", JSON.stringify(servicios));
        //console.log(servicios);
    
}
    if (!localStorage.getItem("tematicas")) {
        localStorage.setItem("tematicas", JSON.stringify(tematicas));
        //console.log(tematicas);;
}
    if (!localStorage.getItem("presupuestos")) {
        localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
        //console.log(presupuestos);;
}
};
