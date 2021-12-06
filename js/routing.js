var map = L.map('map').setView(
  [21.15223412617155, -101.7113883047542],
  12
);


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var routingtracker = [];
var currentConsult = 1;

const userLatLngs = [21.142859, -101.692256];
$(document).ready(function() {
  fbdb.collection("usuarios").get()
  .then((doc)=>{
    doc.forEach(element => {
      userLatLngs.push(element.data()['lat']);
      userLatLngs.push(element.data()['lng'])
    });
      
  }).then(()=>{
    for(var j = 1; j < userLatLngs.length; j+=2){
      routingtracker.push(L.Routing.control({
        waypoints: [L.latLng(userLatLngs[j-1], userLatLngs[j]),L.latLng(userLatLngs[j+1], userLatLngs[j+2])]
        }).addTo(map));  
    }
  }).catch((err) => {
    console.log(err);
  });

  
});


$('#successConsult').click(function(){
  currentConsult += 2;
  routingtracker.forEach(element => {
      element.remove()
  });


  for (let i = currentConsult; i < userLatLngs.length; i+=2) {
    routingtracker.push(L.Routing.control({
      waypoints: [L.latLng(userLatLngs[i-1], userLatLngs[i]),L.latLng(userLatLngs[i+1], userLatLngs[i+2])]
    }).addTo(map));
  }

  console.log(userLatLngs[userLatLngs.length-2]);
  console.log(userLatLngs[userLatLngs.length-1]);
  if(currentConsult == userLatLngs.length-1){
    routingtracker.push(L.Routing.control({
      waypoints: [L.latLng(userLatLngs[userLatLngs.length-2], userLatLngs[userLatLngs.length-1]),L.latLng(userLatLngs[0], userLatLngs[1])]
    }).addTo(map));
  }
});

$('#deleteConsults').click(function(){
  routingtracker.forEach(element => {
    element.remove();
  })
})