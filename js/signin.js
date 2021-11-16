const loginform =  document.getElementById('formLogin');

loginform.addEventListener('submit',(e)=>{
  e.preventDefault();
  let mail = loginform['inputEmailU'].value;
  let password = loginform['inputPassU'].value;

  console.log('CLICK')

  fbauth.signInWithEmailAndPassword(mail,password).then( cred =>{
      loginform.reset();
      //loginform.querySelector('.error').innerHTML = '';
  }).catch( err => {
      //loginform.querySelector('.error').innerHTML = mensajeError(err.code);
      console.log(err);
  });
});