// Función para inicializar LocalStorage
export const eventosExportados = [
    { idSalon: 1 ,tituloSalon: "Fiesta Kids", direccionSalon: "Av. Rivadavia 123", descripcion: "Salón temático con animadores, pista de baile y catering incluido.", precioSalon: 100000 },
    { idSalon: 2 ,tituloSalon: "Rincón Feliz", direccionSalon: "Urquiza 345", descripcion: "Espacio con juegos interactivos, plaza blanda y sector de merienda.", precioSalon: 200000 },
    { idSalon: 3 ,tituloSalon: "Peque Mundo", direccionSalon: "Savio 3000", descripcion: "Zona de juegos blandos, rincón de lectura y mini cine para los chicos", precioSalon:  60000 }
];

export const imgSalones = [
    { idImagen: 1, idSalon: 1, rutaImagen: "../assets/img/evento3.jpg" },
    { idImagen: 2, idSalon: 2, rutaImagen: "../assets/img/burbuja-kid.jpg" },
    { idImagen: 3, idSalon: 3, rutaImagen: "../assets/img/salon.jpg" },

];

export const servicios = [
    {idPresupuesto: 1, tituloServicio: "Dj - Música", precioServicio: 25000},
    {idPresupuesto: 2, tituloServicio: "Categing", precioServicio: 35000},
    {idPresupuesto: 3, tituloServicio: "Fotografía", precioServicio: 30000},
    {idPresupuesto: 4, tituloServicio: "Decoración", precioServicio: 15000},
];


export const inicializarLocalStorage = () => {
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify(eventosExportados));
        console.log(eventosExportados);
    }
    if (!localStorage.getItem("imagenesSalon")) {
        localStorage.setItem("imagenesSalon", JSON.stringify(imgSalones));
        console.log(imgSalones);
    }
    if (!localStorage.getItem("servicios")) {
        localStorage.setItem("servicios", JSON.stringify(servicios));
        console.log(servicios);
};
}

