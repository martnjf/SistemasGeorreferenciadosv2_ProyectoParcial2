const petName = document.getElementById('nombreMascota');
const petGender = document.getElementById('gender');
const petBirth = document.getElementById('date');
const petSpecies = document.getElementById('inputPetSpecie');
const petColor = document.getElementById('inputPetColor');
const petSing = document.getElementById('inputPetSign');

const cancelBtn = document.getElementById('cancelInfo');
const saveBtn = document.getElementById('saveInfo');

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
                              <form id="form-imagePet" action="" style="display: none;">
                                  <label for="picture">Foto de perfil</label><br>
                                  <input required type="url" id="url-image" placeholder="URL de la imagen" value="${pets.imagen}">
                                  <input type="submit" value="Subir">
                              </form>
                          </div>
                      </div>
                      <div class="col">
                          <form id="formUpdatePet">  
                              <div class="text-center">
                                  <div class="mb-3">
                                      <label for="gender">Sexo de la mascota</label>
                                      <input disabled required type="text" id="gender" class="form-control" value="${pets.sexo}" >
                                  </div>                          
                                  <div class="mb-3">
                                      <label for="date">Fecha de nacimiento</label>
                                      <input disabled required type="text" id="date" class="form-control" value="${pets.nacimiento}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetSpecie">Especie</label>
                                      <input disabled required type="text" class="form-control" id="inputPetSpecie" value="${pets.especie}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetColor">Color</label>
                                      <input disabled required type="text" class="form-control" id="inputPetColor" value="${pets.color}" >
                                  </div>
                                  <div class="mb-3">
                                      <label for="inputPetSign">Señas Particulares</label>
                                      <input disabled required type="text" class="form-control" id="inputPetSign" value="${pets.señas}" >
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
                  <button type="button" class="btn btn-warning" onclick="_showEdit()">Editar datos</button>
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

function _showEdit(){
  
  const uploadImg = document.getElementById('form-imagePet');
  uploadImg.addEventListener('submit', (e)=>{
      e.preventDefault();
      
      var image = document.getElementById('profile-pic');
      var source = document.getElementById('url-image').value;

      try {
        fsdb.collection('mascotas').doc(credentials).update({
            imagen: source
        });
        console.log("Actualización exitosa :)");
      } catch(e) {
          console.log(e);
      }
      image.src = source;
  });

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


const imageform = document.getElementById('form-image');
const registerform = document.getElementById('formPetR');
registerform.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const petImg = imageform['url-image'].value;
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
    señas: petSign,
    imagen: petImg
  }).then( ()=>{
    console.log("Mascota registrada :D");
    registerform.reset();
    $('#registrarmodal').modal('hide');
  }).catch( err => {
    console.log('Ha habido un problema ):')
    console.log(err);
  });
});

