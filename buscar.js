const db = firebase.firestore();
const idServicioBuscar = document.getElementById('id-servicio');
const buscarForm = document.getElementById("buscar-form");

const getServicios = () => db.collection('servicios').get();

const buscarservicio = (id) => db.collection("servicios").doc(id).log("si");

// window.addEventListener("DOMContentLoaded", async(e) =>{
    
// })

buscarForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    console.log(idServicioBuscar.value)
    const services = await getServicios()
    services.forEach(doc =>{
        const idservicio = doc.data().id
        console.log(idservicio)
         if(idServicioBuscar != idservicio){
             console.log("existe");
        }
    idServicioBuscar.remove();
    })



    })