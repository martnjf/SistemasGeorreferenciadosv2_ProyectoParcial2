const registerform = document.getElementById('formPetModal');
const petsContainer = document.querySelector(".pets");

let editStatus = false;
let id = '';

const savePet = (imagen, nombre, sexo, nacimiento, especie, color, senias) =>
  fbdb.collection("mascotas").doc().set({
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

const deletePet = (id) => fbdb.collection("mascotas").doc(id).delete();

const getPet = (id) => fbdb.collection("mascotas").doc(id).get();

const updatePet = (id, updatedPet) => fbdb.collection('mascotas').doc(id).update(updatedPet);

// Obtener mascotas
window.addEventListener('DOMContentLoaded', async (e) => { 
  await onGetPets((querySnapshot) => {
      petsContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const pets = doc.data();
        petsContainer += `
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
              <button type="button" class="btn btn-info btn-date" data-id="${doc.id}">Solicitar consulta</button>
              <button type="button" class="btn btn-warning btn-edit" data-id="${doc.id}">🖉 Editar datos</button>
              <button type="button" class="btn btn-danger btn-delete" data-id="${doc.id}">🗑 Borrar</button>
          </div>
        </div>
        `;
      });

    const btnsDelete = petsContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deletePet(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = petsContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const pets = doc.data();

          /*const imagen = registerform['petImage'].value;
          const nombre = registerform['petName'].value;
          var select = document.getElementById('selectGender');
          const sexo = select.options[select.selectedIndex].text;
          const nacimiento = registerform['date'].value;
          const especie = registerform['petSpecie'].value;
          const color = registerform['petColor'].value;
          const senias = registerform['petSign'].value;

          nombre = pets.nombre;
          imagen = pets.imagen;
          sexo = pets.sexo;*/

          editStatus = true;
          id = doc.id;
          taskForm["btnPetForm"].innerText = "Actualizar datos";

        } catch (error) {
          console.log(error);
        }
      });
    });
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
        imagen, 
        nombre,
        sexo,
        nacimiento,
        especie,
        color,
        senias
      );
    } else {
      await updatePet(id, {
        imagen,
        nombre,
        sexo,
        nacimiento,
        especie,
        color,
        senias
      });

      editStatus = false;
      id = '';
      registerform['btnPetForm'].innerHTML = 'Registrar Mascota';
    }
    console.log("Mascota registrada :D");
    registerform.reset();
  } catch(e) {
    console.log('Ha habido un problema ):');
    console.log(e);
  }
});

fbauth.onAuthStateChanged( user => {
  console.log('Usuario', user.uid )
});
// GUARDAR EL UID DEL USUARIO EN LA MASCOTA
// CUANDO SE HAGA EL GET, COMPARAR EL UID DEL USUARIO LOGGEADO CON EL DE LAS MASCOTAS EN LA COLECCIÓN