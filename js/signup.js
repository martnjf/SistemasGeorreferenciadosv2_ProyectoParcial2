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