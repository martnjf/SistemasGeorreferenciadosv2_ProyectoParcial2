let id = '';

fbauth.onAuthStateChanged( user => {
  id = user.uid;  
  console.log('Usuario nuevo', id )
});


const registerform = document.getElementById('formPetModal');
var petsContainer = document.getElementById("petsContainer");
var petImage = document.getElementById('petImg');

let editStatus = false;
let petID = '';

const savePet = (id, imagen, nombre, sexo, nacimiento, especie, color, senias) =>
  fbdb.collection("mascotas").doc().set({
    id,
    imagen,
    nombre,
    sexo,
    nacimiento,
    especie,
    color,
    senias
  });

const getPets = () => fbdb.collection("mascotas").get();

const onGetPets = (callback) => fbdb.collection("mascotas").onSnapshot(callback);

const deletePet = (petID) => fbdb.collection("mascotas").doc(petID).delete();

const getPet = (petID) => fbdb.collection("mascotas").doc(petID).get();

const updatePet = (petID, updatedPet) => fbdb.collection('mascotas').doc(petID).update(updatedPet);

const saveCoords = (id, updatedCords) => fbdb.collection('usuarios').doc(id).update(updatedCords);

// Obtener mascotas
window.addEventListener('DOMContentLoaded', async (e) => { 

  let html = '';
  await onGetPets((querySnapshot) => {
 
    querySnapshot.forEach((doc) => {

      if(id == doc.data().id){
        const pets = doc.data();
        pets.id = doc.id;

        const template = `
        <div class="card my-4">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3 text-center">
                  <img class="top-image mb-3" src="${pets.imagen}" alt="">
                  <h6>Nombre: ${pets.nombre}</h6>
              </div>
              <div class="col-12 col-lg-6">
                  <p><strong>Sexo:</strong> ${pets.sexo}</p>
                  <p><strong>Fecha de nacimiento:</strong> ${pets.nacimiento}</p>
                  <p><strong>Especie:</strong> ${pets.especie}</p>
                  <p><strong>Color:</strong> ${pets.color}</p>
                  <p><strong>Señas Particulares:</strong> ${pets.senias}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
              <button type="button" class="btn btn-info btn-date" data-id="${pets.id}">Solicitar consulta</button>
              <button type="button" class="btn btn-warning btn-edit" data-id="${pets.id}">🖉 Editar datos</button>
              <button type="button" class="btn btn-danger btn-delete" data-id="${pets.id}">🗑 Borrar</button>
          </div>
        </div>
        `;
        html += template;
      }

      
    });
    petsContainer.innerHTML = html;

    const btnsDelete = document.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deletePet(e.target.dataset.id);
          alert('Mascota borrada');
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = document.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getPet(e.target.dataset.id);
          const pets = doc.data();
          
          //var select = document.getElementById('selectGender');
          //const sexo = select.options[select.selectedIndex];

          petImage.src = pets.imagen;
          registerform['petImage'].value = pets.imagen;
          registerform['petName'].value = pets.nombre;
          //sexo.text = pets.sexo
          registerform['date'].value = pets.nacimiento;
          registerform['petSpecie'].value = pets.especie;
          registerform['petColor'].value = pets.color;
          registerform['petSign'].value = pets.senias;

          editStatus = true;
          petID = doc.id;
          registerform["btnPetForm"].innerText = "Actualizar datos";

        } catch (error) {
          console.log(error);
        }
      });
    });

    const btnsDate = document.querySelectorAll(".btn-date");
    btnsDate.forEach((btn) => 
      btn.addEventListener("click", e => {
        console.log(e.target.dataset.id);

        let options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        
        function success(pos) {
          var crd = pos.coords;
          saveCoords(id,{
            lat: crd.latitude,
            lng: crd.longitude
          });
          alert('Consulta solicitada');
        };
        
        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        };
        
        navigator.geolocation.getCurrentPosition(success, error, options);
      })
    );
  });
});

// registrar mascota
registerform.addEventListener('submit', async(e) => {
  e.preventDefault();

  const imagen = registerform['petImage'].value;
  const nombre = registerform['petName'].value;
  var select = document.getElementById('selectGender');
  const sexo = select.options[select.selectedIndex].text;
  const nacimiento = registerform['date'].value;
  const especie = registerform['petSpecie'].value;
  const color = registerform['petColor'].value;
  const senias = registerform['petSign'].value;
  try{
    if(!editStatus){
      await savePet(
        id,
        imagen, 
        nombre,
        sexo,
        nacimiento,
        especie,
        color,
        senias
      );
      window.location.reload();
    } else {
      await updatePet(petID, {
        imagen,
        nombre,
        sexo,
        nacimiento,
        especie,
        color,
        senias
      });
      window.location.reload();
      editStatus = false;
      petID = '';
      registerform['btnPetForm'].innerHTML = 'Registrar Mascota';
    }
    console.log("Mascota registrada :D");
    registerform.reset();
  } catch(e) {
    console.log('Ha habido un problema ):');
    console.log(e);
  }
});

// GUARDAR EL UID DEL USUARIO EN LA MASCOTA
// CUANDO SE HAGA EL GET, COMPARAR EL UID DEL USUARIO LOGGEADO CON EL DE LAS MASCOTAS EN LA COLECCIÓN
