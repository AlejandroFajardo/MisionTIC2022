import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  /*apiKey: "AIzaSyA9fbUf__NAZ3VgWBgo_nSePC9-YGaxW4A",
  authDomain: "proyectomintic-7f165.firebaseapp.com",
  databaseURL: "https://proyectomintic-7f165-default-rtdb.firebaseio.com",
  projectId: "proyectomintic-7f165",
  storageBucket: "proyectomintic-7f165.appspot.com",
  messagingSenderId: "393516624832",
  appId: "1:393516624832:web:523aaa4e8d178b9e7b3625",*/

  apiKey: "AIzaSyBnjFiCsuDs2CFF2xHyBlvTlfZ3j1qkMq8",
  authDomain: "crud-mt-2022.firebaseapp.com",
  projectId: "crud-mt-2022",
  storageBucket: "crud-mt-2022.appspot.com",
  messagingSenderId: "1018603559623",
  appId: "1:1018603559623:web:82b9c4a24bfa8e7af63ce2",
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

export async function getUsuarios() {
  let usuarios = [];
  let respuesta = await db.collection("users").get();

  respuesta.forEach((item) => {
    usuarios.push(item);
  });
  return usuarios;
}

export async function updateUsuario(id, usuario) {
  db.collection("users").doc(id).update(usuario);
}

export async function addUsuario(usuario, iden, rol, statu) {
  db.collection("users").doc(iden).set({
    user: usuario,
    role: rol,
    state: statu,
    password: " ",
  });
}

export async function addUsuarioCorreo(usuario, pass, rol, statu) {
  db.collection("users").doc().set({
    user: usuario,
    role: rol,
    state: statu,
    password: pass,
  });
}

export async function getUser(id) {
  let respuesta = await db.collection("users").doc(id).get();
  return respuesta;
}

export default db;
