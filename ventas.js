//Declaración de constantes
const txtServicio = document.getElementById('Servicio');
const txtCantidad = document.getElementById('Cantidad');
const txtValorUnitario = document.getElementById('ValorUnitario');
const btnGuardarServicio = document.getElementById('btnGuardarServicio');
const modalServicios = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalServicios')); //Obtener el objeto de Bootstrap Modal, para poder hacer uso de funciones de utilidad
const tableServicios = document.getElementById('Servicios');
const tbody = tableServicios.querySelector('tbody');
const formNuevoServicio = document.getElementById('FormNuevoServicio');

//Evento click del botón
btnGuardarServicio.addEventListener('click', function (evento) {
    evento.preventDefault();//Evita el comportamiento estandar el botón (Enviar el formulario recargando la página)
    let nombreServicio = txtServicio.value;
    let cantidad = parseInt(txtCantidad.value);
    let valorUnitario = parseInt(txtValorUnitario.value);

    if (cantidad > 0) {
        let fila = document.createElement('tr'); //Creación de la fila
        let colIdServicio = document.createElement('td'); //Creación de columna
        colIdServicio.innerHTML = '';
        let colServicio = document.createElement('td');
        colServicio.innerHTML = nombreServicio;
        let colCantidad = document.createElement('td');
        colCantidad.innerHTML = cantidad;
        let colValorUnitario = document.createElement('td');
        colValorUnitario.innerHTML = valorUnitario;
        let colValorTotal = document.createElement('td');
        colValorTotal.innerHTML = valorUnitario * cantidad;
        let colEditar = document.createElement('td');
        colEditar.innerHTML = '';
        let colBorrar = document.createElement('td');
        //colBorrar.innerHTML = '<button type="button" class="btn btn-danger">X</button>'; //No recomendado
        let btnBorrar = document.createElement('button'); //Estandar y recomendada!!
        btnBorrar.textContent = 'X';
        btnBorrar.type = 'button';
        btnBorrar.classList.add('btn');
        btnBorrar.classList.add('btn-danger');
        btnBorrar.classList.add('borrar-fila');
        btnBorrar.addEventListener('click', borrarFila); //Agregamos evento click del botón de eliminar la fila
        colBorrar.appendChild(btnBorrar); //Asociar la fila a la columna de borrar

        //Asociar las columnas a la fila
        fila.appendChild(colIdServicio);
        fila.appendChild(colServicio);
        fila.appendChild(colCantidad);
        fila.appendChild(colValorUnitario);
        fila.appendChild(colValorTotal);
        fila.appendChild(colEditar);
        fila.appendChild(colBorrar);

        tbody.appendChild(fila); //Agregar la nueva fila al tbody de la tabla

        formNuevoServicio.reset(); //Resetea (borra) todos los valores del formulario

        modalServicios.hide(); //Oculta el modal
    }
});

function borrarFila() {
    if (confirm('¿Está seguro de borrar este servicio?')) {
        this.parentNode.parentNode.remove(); //Eliminar la fila
    }
}
