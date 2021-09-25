const db = firebase.firestore();

const googleButton = document.getElementById("login-google");

googleButton.addEventListener("click", (e) => {
    e.preventDefault();

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            console.log("BIEN!!!");
        })
        .catch(err => {
            console.log("MAL!!!");
        })
});

const signInForm = document.getElementById("formsignin");

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signInForm["inputEmail"].value;
    const password = signInForm["inputPassword"].value;
    // Authenticate the User
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        // clear the form
        signInForm.reset();
        console.log("BIEN!!!")
    });
    
});