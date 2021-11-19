const loginform =  document.getElementById('formLogin');

loginform.addEventListener('submit',(e)=>{
  e.preventDefault();
  let mail = loginform['inputEmailU'].value;
  let password = loginform['inputPassU'].value;

  console.log('CLICK')

  fbauth.signInWithEmailAndPassword(mail,password).then( cred =>{
      loginform.reset();      
      alert('Bienvenido :D');
      window.location.href = "http://127.0.0.1:5502/SistemasGeorreferenciadosv2_ProyectoParcial2/index.html";
      //loginform.querySelector('.error').innerHTML = '';
  }).catch( err => {
      //loginform.querySelector('.error').innerHTML = mensajeError(err.code);
      console.log(err);
  });
});