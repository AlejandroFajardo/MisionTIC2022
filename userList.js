const db = firebase.firestore();
const userForm = document.getElementById("user-form");
const usersContainer = document.getElementById("users-container");

let editStatus = false;
let id = "";

/*const saveUser = (title, description) =>
  db.collection("users").doc().set({
    title,
    description,
  });

const getTasks = () => db.collection('tasks').get();*/

const getUser = (id) => db.collection("users").doc(id).get();

const onGetUsers = (callback) => db.collection("users").onSnapshot(callback);

/*const deleteTask = (id) => db.collection('tasks').doc(id).delete();*/

const updateUser = (id, updatedUser) =>
  db.collection("users").doc(id).update(updatedUser);

window.addEventListener("DOMContentLoaded", async (e) => {
  document.getElementById("formulario").style.display = "none";
  onGetUsers((querySnapshot) => {
    usersContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      user.id = doc.id;
      usersContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
                <h3 class="h5">${user.user}</h3>
                <p>${user.role}</h3>
                <p>${user.state}</h3>
                <div>
                    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            </div>`;

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getUser(e.target.dataset.id);
          const user = doc.data();
          editStatus = true;
          id = doc.id;
          userForm["user-state"].value = user.state;
          userForm["user-role"].value = user.role;
          document.getElementById("formulario").style.display = "block";
          userForm["btn-user-form"].innerText = "Actualizar";
        });
      });
    });
  });
});

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const state = userForm["user-state"];
  const role = userForm["user-role"];

  if (!editStatus) {
    console.log("click");
  } else {
    await updateUser(id, {
      state: state.value,
      role: role.value,
    });
    editStatus = false;
    id = "";
    document.getElementById("formulario").style.display = "none";
    alert("Se edito correctamente");
  }

  userForm.reset();
  state.focus();
});
