//Declaración de constantes
const txtServicio = document.getElementById('Servicio');
const txtCantidad = document.getElementById('Cantidad');
const txtValorUnitario = document.getElementById('ValorUnitario');
const btnGuardarServicio = document.getElementById('btnGuardarServicio');
const modal = document.getElementById('ModalServicios');
const modalServicios = bootstrap.Modal.getOrCreateInstance(modal); //Obtener el objeto de Bootstrap Modal, para poder hacer uso de funciones de utilidad
const tableServicios = document.getElementById('Servicios');
const tbody = tableServicios.querySelector('tbody');
const formNuevoServicio = document.getElementById('FormNuevoServicio');
const tituloModal = document.getElementById('tituloModal');
const btnServicios = document.getElementById('btnServicios');
const txtCantidadServicios = document.getElementById('txtCantidadServicios');
const txtTotalVenta = document.getElementById('txtTotalVenta');

//Declaración de variables
let arrayServicios = [];
let editandoServicio = false;
let botonEditandoServicio = null;
let valorTotalVenta = 0;

//Evento click del botón
btnGuardarServicio.addEventListener('click', function (evento) {
    evento.preventDefault();//Evita el comportamiento estandar el botón (Enviar el formulario recargando la página)
    let nombreServicio = txtServicio.value;
    let cantidad = parseInt(txtCantidad.value);
    let valorUnitario = parseInt(txtValorUnitario.value);

    if (cantidad > 0) {
        if (editandoServicio) {
            let indice = botonEditandoServicio.dataset.indice;

            valorTotalVenta -= arrayServicios[indice].cantidad * arrayServicios[indice].valorUnitario;

            arrayServicios[indice].nombreServicio = nombreServicio;
            arrayServicios[indice].cantidad = cantidad;
            arrayServicios[indice].valorUnitario = valorUnitario;

            let nuevoValor = valorUnitario * cantidad;

            valorTotalVenta += nuevoValor;

            let fila = botonEditandoServicio.closest('tr');
            fila.children[1].innerText = nombreServicio;
            fila.children[2].innerText = cantidad;
            fila.children[3].innerText = valorUnitario;
            fila.children[4].innerText = nuevoValor;

            editandoServicio = false;
            indiceServicioEditando = null;
            formNuevoServicio.reset();
        } else {
            arrayServicios.push({
                nombreServicio: nombreServicio,
                cantidad: cantidad,
                valorUnitario: valorUnitario
            });
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
            let total = valorUnitario * cantidad;
            colValorTotal.innerHTML = total;
            valorTotalVenta += total;


            let colEditar = document.createElement('td');
            let btnEditar = document.createElement('button');
            btnEditar.textContent = 'editar';
            btnEditar.type = 'button';
            btnEditar.classList.add('btn');
            btnEditar.classList.add('btn-info');
            btnEditar.classList.add('editar-fila');
            btnEditar.dataset.indice = arrayServicios.length - 1;
            btnEditar.addEventListener('click', editarFila);
            colEditar.appendChild(btnEditar);


            let colBorrar = document.createElement('td');
            //colBorrar.innerHTML = '<button type="button" class="btn btn-danger">X</button>'; //No recomendado
            let btnBorrar = document.createElement('button'); //Estandar y recomendada!!
            btnBorrar.textContent = 'X';
            btnBorrar.type = 'button';
            btnBorrar.classList.add('btn');
            btnBorrar.classList.add('btn-danger');
            btnBorrar.classList.add('borrar-fila');
            btnBorrar.dataset.indice = arrayServicios.length - 1;
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
        }

        actualizarTotales();

        modalServicios.hide(); //Oculta el modal
    }
});

btnServicios.addEventListener('click', function () {
    tituloModal.innerText = 'Agregar servicio';
    formNuevoServicio.reset(); //Límpia los campos
    editandoServicio = false;
});

function borrarFila() {
    if (confirm('¿Está seguro de borrar este servicio?')) {
        valorTotalVenta -= arrayServicios[this.dataset.indice].cantidad * arrayServicios[this.dataset.indice].valorUnitario;
        arrayServicios.splice(this.dataset.indice, 1);
        this.parentNode.parentNode.remove(); //Eliminar la fila

        //Actualizar índice de botones siguientes
        let botones = document.getElementsByClassName('borrar-fila');
        for (let i = 0; i < botones.length; i++) {
            botones[i].dataset.indice = i;
        }
        actualizarTotales();
    }
}

function editarFila() {
    editandoServicio = true;
    botonEditandoServicio = this;
    tituloModal.innerText = 'Editando servicio';
    let datos = arrayServicios[this.dataset.indice];
    txtServicio.value = datos.nombreServicio;
    txtCantidad.value = datos.cantidad;
    txtValorUnitario.value = datos.valorUnitario;
    modalServicios.show();
}

function actualizarTotales() {
    txtCantidadServicios.innerText = arrayServicios.length;
    txtTotalVenta.innerText = '$' + valorTotalVenta;
}

