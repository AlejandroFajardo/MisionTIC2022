const db = firebase.firestore();
const idServicioBuscar = document.getElementById('id-servicio');
const DescripServicioBuscar = document.getElementById('descripcion-servicio');
const btnGuardarServicio = document.getElementById('btnGuardarServicio');
const buscarForm = document.getElementById("buscar-form");
const tablaServicios = document.getElementById('atributos-Servicio');
const btnGuardarModal = document.getElementById('btnGuardarServicio');
const tBody = tablaServicios.querySelector('tbody');


const modal = document.getElementById('ModalServicios');
const modalServicios = bootstrap.Modal.getOrCreateInstance(modal); //Obtener el objeto de Bootstrap Modal, para poder hacer uso de funciones de utilidad
const txtDescripcion = document.getElementById('Descripcion');
const txtServicio = document.getElementById('Servicio');
const txtValorUnitario = document.getElementById('ValorUnitario');
const txtEstado = document.getElementById('Estado');


//Declaración de variables
let arrayServicios = [];
let botonEditandoServicio = null;
const estado = "disponible";



const getServicios = () => db.collection('servicios').get();

const buscarservicio = (id) => db.collection("servicios").doc(id).log("si");

 window.addEventListener("DOMContentLoaded", async(e) =>{
     const services = await getServicios()
     services.forEach(doc =>{
         const idservicio = doc.id;
         const nombreServicio = doc.data().servicio;
         const descripcionServicio = doc.data().descripcion;
         const valorUniServicio = doc.data().valorUnitario;
         arrayServicios.push({
            id: idservicio,
            nombreServicio: nombreServicio,
            descripcionServicio: descripcionServicio,
            valorUnitario: valorUniServicio
        });
         let fila = document.createElement('tr');
         let colIdServicio= document.createElement('td');
         colIdServicio.innerHTML= idservicio;
         let colDescripcion= document.createElement('td');
         colDescripcion.innerHTML = descripcionServicio;
         let colServicio= document.createElement('td');
         colServicio.innerHTML = nombreServicio;
         let colValorUnitario = document.createElement('td');
         colValorUnitario.innerHTML = valorUniServicio;
         let colEstadoServicio = document.createElement('td');
         colEstadoServicio.innerHTML = "Disponible";
         let colEditar= document.createElement('td');
         let btnEditar = document.createElement('button');
         btnEditar.textContent = 'editar';
         btnEditar.type = 'button';
         btnEditar.classList.add('btn');
         btnEditar.classList.add('btn-info');
         btnEditar.classList.add('editar-fila');
         btnEditar.dataset.indice = arrayServicios.length - 1;
         btnEditar.addEventListener('click', editarServicio);
         colEditar.appendChild(btnEditar);
      
         let colBorrar= document.createElement('td');
         let btnBorrar = document.createElement('button'); //Estandar y recomendada!!
         btnBorrar.textContent = 'X';
         btnBorrar.type = 'button';
         btnBorrar.classList.add('btn');
         btnBorrar.classList.add('btn-danger');
         btnBorrar.classList.add('borrar-fila');
         colBorrar.appendChild(btnBorrar);
                   
         fila.appendChild(colIdServicio);
         fila.appendChild(colDescripcion);
         fila.appendChild(colServicio);
         fila.appendChild(colValorUnitario);
         fila.appendChild(colEstadoServicio);
         fila.appendChild(colEditar);
         fila.appendChild(colBorrar);
                  
         tBody.appendChild(fila);
     })
 })


function editarFila(){
    alert('El servicio se actualizo correctamente');
}

function editarServicio(){
    let datos = arrayServicios[this.dataset.indice];
    txtDescripcion.value = datos.descripcionServicio
    txtServicio.value = datos.nombreServicio;
    txtValorUnitario.value = datos.valorUnitario;
    modalServicios.show();
}

btnGuardarModal.addEventListener("click", (e) =>{
    e.preventDefault();
    modalServicios.hide();
    alert('El servicio se actualizo de manera correctamente');

})
