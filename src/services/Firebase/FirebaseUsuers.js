import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig2 = {
  apiKey: "AIzaSyBnjFiCsuDs2CFF2xHyBlvTlfZ3j1qkMq8",
  authDomain: "crud-mt-2022.firebaseapp.com",
  projectId: "crud-mt-2022",
  storageBucket: "crud-mt-2022.appspot.com",
  messagingSenderId: "1018603559623",
  appId: "1:1018603559623:web:82b9c4a24bfa8e7af63ce2",
};

const appu = firebase.initializeApp(firebaseConfig2, "other");
const dbu = appu.firestore();

export async function getUsuarios() {
  let usuarios = [];
  let respuesta = await dbu.collection("users").get();

  respuesta.forEach((item) => {
    usuarios.push(item);
  });
  return usuarios;
}

export async function updateUsuario(id, usuario) {
  dbu.collection("users").doc(id).update(usuario);
}

export async function addUsuario(usuario, iden, rol, statu) {
  dbu.collection("users").doc(iden).set({
    user: usuario,
    role: rol,
    state: statu,
    password: " ",
  });
}

export async function addUsuarioCorreo(usuario, pass, rol, statu) {
  dbu.collection("users").doc().set({
    user: usuario,
    role: rol,
    state: statu,
    password: pass,
  });
}

export async function getUser(id) {
  let respuesta = await dbu.collection("users").doc(id).get();
  return respuesta;
}
