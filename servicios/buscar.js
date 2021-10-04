const db = firebase.firestore();
const idServicioBuscar = document.getElementById('id-servicio');
const DescripServicioBuscar = document.getElementById('descripcion-servicio');
const buscarForm = document.getElementById("buscar-form");
const tablaServicios = document.getElementById('atributos-Servicio');
const tBody = tablaServicios.querySelector('tbody');

//Declaración de variables
let arrayServicios = [];
let botonEditandoServicio = null;



const getServicios = () => db.collection('servicios').get();

const buscarservicio = (id) => db.collection("servicios").doc(id).log("si");

window.addEventListener("DOMContentLoaded", async(e) =>{
    const services = await getServicios()
    services.forEach(doc =>{
        const idservicio = doc.id;
        const nombreServicio = doc.data().servicio;
        const descripcionServicio = doc.data().descripcion;
        const cantidadServicio = doc.data().cantidad;
        const valorUniServicio = doc.data().valorUnitario;
        const valorTotalServicio = doc.data().valorTotal;
        console.log(nombreServicio);
        console.log(descripcionServicio);
        console.log(cantidadServicio);
        console.log(valorUniServicio);
        console.log(valorTotalServicio);
        let fila = document.createElement('tr');
        let colIdServicio= document.createElement('td');
        colIdServicio.innerHTML= idservicio;
        let colServicio= document.createElement('td');
        colServicio.innerHTML = nombreServicio;
        let colDescripcion= document.createElement('td');
        colDescripcion.innerHTML = descripcionServicio;
        let colCantidad= document.createElement('td');
        colCantidad.innerHTML = cantidadServicio;
        let colValorUnitario = document.createElement('td');
        colValorUnitario.innerHTML = valorUniServicio;
        let colValorTotalServicio = document.createElement('td');
        colValorTotalServicio.innerHTML = valorTotalServicio;
        let colEditar= document.createElement('td');
        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'editar';
        btnEditar.type = 'button';
        btnEditar.classList.add('btn');
        btnEditar.classList.add('btn-info');
        btnEditar.classList.add('editar-fila');
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
        fila.appendChild(colServicio);
        fila.appendChild(colDescripcion);
        fila.appendChild(colCantidad);
        fila.appendChild(colValorUnitario);
        fila.appendChild(colValorTotalServicio);
        fila.appendChild(colEditar);
        fila.appendChild(colBorrar);
                    
        tBody.appendChild(fila);

        console.log(fila);
    })
})



buscarForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    if((idServicioBuscar.value!='') || (DescripServicioBuscar.value !='')){
        const services = await getServicios()
        services.forEach(doc =>{
        const idservicio = doc.id;
        if(idServicioBuscar.value == idservicio){
            const nombreServicio = doc.data().servicio;
            const descripcionServicio = doc.data().descripcion;
            const cantidadServicio = doc.data().cantidad;
            const valorUniServicio = doc.data().valorUnitario;
            const valorTotalServicio = doc.data().valorTotal;
            console.log(nombreServicio);
            console.log(descripcionServicio);
            console.log(cantidadServicio);
            console.log(valorUniServicio);
            console.log(valorTotalServicio);
            let fila = document.createElement('tr');
            let colIdServicio= document.createElement('td');
            colIdServicio.innerHTML=idservicio;
            let colServicio= document.createElement('td');
            colServicio.innerHTML = nombreServicio;
            let colDescripcion= document.createElement('td');
            colDescripcion.innerHTML = descripcionServicio;
            let colCantidad= document.createElement('td');
            colCantidad.innerHTML = cantidadServicio;
            let colValorUnitario = document.createElement('td');
            colValorUnitario.innerHTML = valorUniServicio;
            let colValorTotalServicio = document.createElement('td');
            colValorTotalServicio.innerHTML = valorTotalServicio;
            let colEditar= document.createElement('td');
            let btnEditar = document.createElement('button');
            btnEditar.textContent = 'editar';
            btnEditar.type = 'button';
            btnEditar.classList.add('btn');
            btnEditar.classList.add('btn-info');
            btnEditar.classList.add('editar-fila');
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
            fila.appendChild(colServicio);
            fila.appendChild(colDescripcion);
            fila.appendChild(colCantidad);
            fila.appendChild(colValorUnitario);
            fila.appendChild(colValorTotalServicio);
            fila.appendChild(colEditar);
            fila.appendChild(colBorrar);
            
            tBody.appendChild(fila);

            console.log(fila);
        }
    })
     idServicioBuscar.value="";
}



    })