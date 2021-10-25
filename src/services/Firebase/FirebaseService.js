import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9fbUf__NAZ3VgWBgo_nSePC9-YGaxW4A",
  authDomain: "proyectomintic-7f165.firebaseapp.com",
  databaseURL: "https://proyectomintic-7f165-default-rtdb.firebaseio.com",
  projectId: "proyectomintic-7f165",
  storageBucket: "proyectomintic-7f165.appspot.com",
  messagingSenderId: "393516624832",
  appId: "1:393516624832:web:523aaa4e8d178b9e7b3625",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export async function getServicios() {
  let servicios = [];
  let respuesta = await db.collection("servicios").get();

  respuesta.forEach((item) => {
    servicios.push(item.data());
  });

  return servicios;
}

export default db;
