
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
var uid;

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

fbauth.onAuthStateChanged( user => {
  if(user){
    console.log('Usuario entró');
    loginCheck(user);

    var email;
    email = user.email;
    uid = user.uid;
    console.log(email,uid);
    
  } else {
    console.log('Usuario salió');
    loginCheck(user);
  }
});

const salir = document.getElementById('salir');
salir.addEventListener('click', (e)=>{
  e.preventDefault();
  fbauth.signOut().then(()=>{
      alert("Sesión finalizada");
      window.location.href = "http://127.0.0.1:5502/SistemasGeorreferenciadosv2_ProyectoParcial2/index.html";
  });
});

/*
function mensajeError(codigo) {

  let mensaje = '';

  switch(codigo) {
      case 'auth/wrong-password':
        mensaje = 'Su contraseña no es correcta';
        break;
      case 'auth/user-not-found':
          mensaje = 'El usuario no existe o el correo no esta registrado';
          break;
      case 'auth/weak-password':
          mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
          break;
      default:
          mensaje = 'Ocurrió un error al ingresar con este usuario';
    }
  return mensaje;
}


entrarGoogle = () => {
  var provider = new fbauth.GoogleAuthProvider();

  fbauth().signInWithPopup(provider).then(function(result) {

      var token = result.credential.accessToken;
      console.log(token);

      var user = result.user;
      console.log(user);

      const html = `
          <p>Nombre: ${ user.displayName }</p>
          <p>Correo: ${ user.email}</p>
          <img src="${ user.photoURL }" width="50px">
      `;
      dataAccount.innerHTML = html;

      $('#loginmodal').modal('hide');
      loginform.reset();
      loginform.querySelector('.error').innerHTML = '';
      // ...
      }).catch(function(error) {
          console.log(error);
  });
}*/