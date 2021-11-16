const registerform = document.getElementById('formPetR');

registerform.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const petName = registerform['inputPetName'].value;
  var select = document.getElementById('selectGender');
  const petGender = select.options[select.selectedIndex].text;
  const petBirth = registerform['date'].value;
  const petSpecies = registerform['inputPetSpecie'].value;
  const petColor = registerform['inputPetColor'].value;
  const petSign = registerform['inputPetSign'].value;

  await fbdb.collection('mascotas').add({
    nombre: petName,
    sexo: petGender,
    nacimiento: petBirth,
    especie: petSpecies,
    color: petColor,
    señas: petSign
  }).then( ()=>{
    alert("Mascota registrada :D");
    registerform.reset();
  }).catch( err => {
    alert('Ha habido un problema ):')
    console.log(err);
  });
});