const db = firebase.firestore();
const signInBtn = document.getElementById("signInBtn");
const googleButton = document.getElementById("login-google");

const getUsers = () => db.collection("users").get();

/*signInBtn.addEventListener("click", async (e) => {
  let users = await getUsers();
  users.forEach(user => {
      console.log(user.data());
  });
});*/

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      alert("Correcto");
      window.location.href = "https://github.com/AlejandroFajardo/MisionTIC2022/vistas/vista_usuario.html";
    })
    .catch((err) => {
      alert("error");
      alert(err);
    });
});

const signInForm = document.getElementById("formsignin");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["inputEmail"].value;
  const password = signInForm["inputPassword"].value;
  // Authenticate the User
  const users = await getUsers();
  let login = false;
  users.forEach((user) => {
    if ((email == user.data().user) & (password == user.data().password)) {
      if (user.data().state == "Activo") {
        signInForm.reset();
        alert("Correcto");
        if (user.data().role == "Administrador") {
          window.location.href = "/vistas/vista_administrador.html";
          login = true;
        } else if (user.data().role == "Vendedor") {
          window.location.href = "https://github.com/AlejandroFajardo/MisionTIC2022/vistas/vista_vendedor.html";
          login = true;
        } else {
        }
      }
    }
  });
  if (!login) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // clear the form
        signInForm.reset();
        alert("Correcto");
        window.location.href = "./user-list.html";
      })
      .catch((err) => {
        signInForm.reset();
        alert("El usuario no existe o esta inactivo");
      });
  }
});
