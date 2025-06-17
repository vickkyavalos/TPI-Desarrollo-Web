const selectItem = document.getElementById('item');
const cantidadInput = document.getElementById('cantidad');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');
let total = 0;

function agregarAlPresupuesto() {
const selectedIndex = selectItem.selectedIndex;
const itemText = selectItem.options[selectedIndex].text;
const precio = parseFloat(selectItem.value);
const cantidad = parseInt(cantidadInput.value);
const subtotal = precio * cantidad;

const li = document.createElement('li');
li.textContent = `${itemText.split(' - ')[0]} x${cantidad} - $${subtotal}`;
lista.appendChild(li);

total += subtotal;
totalDisplay.textContent = `Total: $${total}`;

}

