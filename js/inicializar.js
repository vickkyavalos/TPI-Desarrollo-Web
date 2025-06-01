// Función para inicializar LocalStorage
export const eventosExportados = [
    { idSalon: 1 ,tituloSalon: "Fiesta Kids", direccionSalon: "Av. Rivadavia 123", descripcion: "Salón temático con animadores, pista de baile y catering incluido.", precioSalon: 100000 },
    { idSalon: 2 ,tituloSalon: "Rincón Feliz", direccionSalon: "Urquiza 345", descripcion: "Espacio con juegos interactivos, plaza blanda y sector de merienda.", precioSalon: 200000 },
    { idSalon: 3 ,tituloSalon: "Peque Mundo", direccionSalon: "Savio 3000", descripcion: "Zona de juegos blandos, rincón de lectura y mini cine para los chicos", precioSalon:  60000 }
];

export const inicializarLocalStorage = () => {
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify(eventosExportados));
        console.log(salones);
    }
};



