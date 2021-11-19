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
      registerform.reset();
      alert('Registro exitoso');
      window.location.href = "http://127.0.0.1:5502/SistemasGeorreferenciadosv2_ProyectoParcial2/index.html";
      //registerform.querySelector('.error').innerHTML = '';
    }).catch( err => {
      //registerform.querySelector('.error').innerHTML = mensajeError(err.code);
    });
  } else {
    alert('Las contraseñas no coinciden');
  }  
});