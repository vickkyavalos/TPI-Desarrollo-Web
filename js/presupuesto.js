// Cargar presupuestos al iniciar
    document.addEventListener('DOMContentLoaded', mostrarPresupuestos);

    function solicitarPresupuesto() {
        const checkboxes = document.querySelectorAll('#listaServicios input[type="checkbox"]');
        const seleccionados = [];
        let totalServicios = 0;

        checkboxes.forEach(c => {
        if (c.checked) {
            const [nombre, precio] = c.value.split('|');
            seleccionados.push(nombre);
            totalServicios += parseInt(precio);
        }
    });

        const salonSelec = document.getElementById('salonselec').value;
        if (!salonSelec || seleccionados.length === 0) {
        alert('Seleccioná al menos un servicio y un salón.');
        return;
    }

        const [salonNombre, salonPrecio] = salonSelec.split('|');
        const total = totalServicios + parseInt(salonPrecio);

        const nuevoPresupuesto = {
        servicios: seleccionados,
        salon: salonNombre,
        total: total
    };

        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
        presupuestos.push(nuevoPresupuesto);
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

        mostrarPresupuestos();
    }

    function mostrarPresupuestos() {
        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
        const tbody = document.getElementById('tablaPresupuestos');
        tbody.innerHTML = '';

    presupuestos.forEach((p, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.servicios.join(', ')}</td>
            <td>${p.salon}</td>
            <td>$${p.total}</td>
            <td>
                <button class="eliminarStyle" onclick="eliminarPresupuesto(${index})">
                <img class="mx-1 iconos-tabla" src="/assets/icons/borrarIcono.svg" alt="Eliminar">
                </button></td>
                <td>
                <button class="btn btn-primary" onclick="exportarPDF(${index})">Descarga</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

    function eliminarPresupuesto(index) {
        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
        presupuestos.splice(index, 1);
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
        mostrarPresupuestos();
    }

async function exportarPDF(index) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const p = presupuestos[index];

    doc.setFontSize(14);
    doc.text("Presupuesto", 20, 20);
    doc.setFontSize(12);
    doc.text(`Servicios: ${p.servicios.join(', ')}`, 20, 35);
    doc.text(`Salón: ${p.salon}`, 20, 45);
    doc.text(`Total: $${p.total}`, 20, 55);

    doc.save(`presupuesto_${index + 1}.pdf`);
}
