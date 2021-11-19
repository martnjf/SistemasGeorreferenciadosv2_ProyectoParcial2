const petName = document.getElementById('nombreMascota');
const petGender = document.getElementById('gender');
const petBirth = document.getElementById('date');
const petSpecies = document.getElementById('inputPetSpecie');
const petColor = document.getElementById('inputPetColor');
const petSing = document.getElementById('inputPetSign');

const cancelBtn = document.getElementById('cancelInfo');
const saveBtn = document.getElementById('saveInfo');

const uploadImg = document.getElementById('form-image');
uploadImg.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    var image = document.getElementById('profile-pic');
    var source = document.getElementById('url-image').value;

    try {
      await fsdb.collection('mascotas').doc(credentials).update({
          imagen: source
      });
      console.log("Actualización exitosa :)");
    } catch(e) {
        console.log(e);
    }
    image.src = source;
});

function _showEdit(){
  uploadImg.style.display = 'block';
  petName.disabled = false;
  petGender.disabled = false;
  petBirth.disabled = false;
  petSpecies.disabled = false;
  petColor.disabled = false;
  petSing.disabled = false;
  cancelBtn.style.display = 'block';
  saveBtn.style.display = 'block';
}

function _hideEdit(){
  uploadImg.style.display = 'none';
  petName.disabled = true;
  petGender.disabled = true;
  petBirth.disabled = true;
  petSpecies.disabled = true;
  petColor.disabled = true;
  petSing.disabled = true;
  cancelBtn.style.display = 'none';
  saveBtn.style.display = 'none';
}

function editInfo(){
    _showEdit();
    user.name = fullName.value;
    user.age = years.value; 
}

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

// Posts
const petsList = document.querySelector(".pets");
const setupPets = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const pets = doc.data();
      const card = `
      <div class="col-12 col-md-6 my-5">
          <div class="card text-center">
              <div class="card-header">                        
              </div>
              <div class="card-body">
                  <div class="row">
                      <div class="col">
                          <h5 id="nombreMascota">${pets.nombre}</h5>                                                              
                          <div class="mb-3">
                              <img id="profile-pic" class="top-image mb-3" src="${pets.imagen}" alt="">  
                              <form id="form-image" action="" style="display: none;">
                                  <label for="picture">Foto de perfil</label><br>
                                  <input required type="url" id="url-image" placeholder="URL de la imagen">
                                  <input type="submit" value="Subir">
                              </form>
                          </div>
                      </div>
                      <div class="col">
                          <form id="formUpdatePet">  
                              <div class="text-center">
                                  <div class="mb-3">
                                      <label for="gender">Sexo de la mascota</label>
                                      <input disabled required type="text" id="gender" class="form-control" value="${pet.sexo}" >
                                  </div>                          
                                  <div class="mb-3">
                                      <label for="date">Fecha de nacimiento</label>
                                      <input disabled required type="text" id="date" class="form-control" value="${pet.nacimiento}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetSpecie">Especie</label>
                                      <input disabled required type="text" class="form-control" id="inputPetSpecie" value="${pet.especie}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetColor">Color</label>
                                      <input disabled required type="text" class="form-control" id="inputPetColor" value="${pet.color}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetSign">Señas Particulares</label>
                                      <input disabled required type="text" class="form-control" id="inputPetSign" value="${pet.señas}" >
                                  </div>
                                  <div style="display: flex;">
                                      <button id="cancelInfo" type="button" class="btn btn-secondary" style="display: none;" onclick="_hideEdit()">Cancelar</button>
                                      <button id="saveInfo" type="submit" class="btn btn-success" style="display: none;" onclick="saveInfo()">Guardar</button>
                                  </div>                                        
                              </div> 
                          </form>
                      </div>
                  </div>                        
              </div>                    
              <div class="card-footer">                        
                  <button type="button" class="btn btn-info" onclick="requestDate()">Solicitar consulta</button>
                  <button type="button" class="btn btn-warning" onclick="editInfo()">Editar datos</button>
                  <button type="button" class="btn btn-danger" onclick="deleteInfo()">Borrar</button>
              </div>
          </div>            
      </div>
      `;
      html += card;
    });
    petsList.innerHTML = html;
  } else {
    petsList.innerHTML = '<h4 class="text-white">Inicie sesión para ver sus mascotas</h4>';
  }
};

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
      fs.collection("mascotas")
      .get()
      .then((snapshot) => {
        setupPets(snapshot.docs);
        loginCheck(user);
      });
    } else {
      console.log('Usuario salió');
      setupPets([]);
      loginCheck(user);
  }
});