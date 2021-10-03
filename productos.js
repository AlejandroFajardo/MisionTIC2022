const btnCrearServicio = document.getElementById('btnCrearServicio');
const txtServicio = document.getElementById('Service');
const txtCantidad = document.getElementById('Description');
const txtValorUnitario = document.getElementById('UnitValue');
btnCrearServicio.addEventListener('click', function (evento) {
    evento.preventDefault();
    let Servicio = txtService.value;
    let Descripcion = txtDescription.value;
    let valorUnitario = parseInt(txtUnitValue.value);
    if(Servicio.length>0) {
    alert('El servicio se ha guardado correctamente');
}
});


