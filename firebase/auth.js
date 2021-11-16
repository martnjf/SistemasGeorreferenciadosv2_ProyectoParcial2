fbauth.onAuthStateChanged( user =>{
  if(user){
      console.log('Usuario entró');

      var name, email, photoUrl, uid, emailVerified;

      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  
      
      console.log(name,email,photoUrl,emailVerified,uid);
    } else {
      console.log('Usuario salió');
      //configuraMenu();
  }
});

const registerform = document.getElementById('formReg');

registerform.addEventListener('submit',(e)=>{
  e.preventDefault();

  const mail = registerform['inputEmailR'].value;
  const password = registerform['inputPassR'].value;
  const repPassword = registerform['inputPass2R'].value;

  if(password == repPassword){
    fbauth.createUserWithEmailAndPassword(mail,password).then( cred =>{

      return fbdb.collection('usuarios').doc(cred.user.uid).set({
        nombre: registerform['inputNameR'].value,
        direccion: registerform['inputAddR'].value,
        codigopostal: registerform['inputCPR'].value,
        telefono: registerform['inputTelR'].value,
      });
    }).then( ()=>{
      //$('#registermodal').modal('hide');
      registerform.reset();
      alert('Registro exitoso');
      //registerform.querySelector('.error').innerHTML = '';
    }).catch( err => {
      //registerform.querySelector('.error').innerHTML = mensajeError(err.code);
    });
  } else {
    alert('Las contraseñas no coinciden');
  }  
});

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
  e.preventDefault();
  fbauth.signOut().then(()=>{
      alert("El usuario ha salido del sistema");
  });
});

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

const loginform =  document.getElementById('formLogin');

loginform.addEventListener('submit',(e)=>{
  e.preventDefault();
  let mail = loginform['inputEmailU'].value;
  let password = loginform['inputPassU'].value;

  console.log('CLICK')

  fbauth.signInWithEmailAndPassword(mail,password).then( cred =>{
      //$('#loginmodal').modal('hide');
      loginform.reset();
      //loginform.querySelector('.error').innerHTML = '';
  }).catch( err => {
      //loginform.querySelector('.error').innerHTML = mensajeError(err.code);
      console.log(err);
  });
});

/*
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