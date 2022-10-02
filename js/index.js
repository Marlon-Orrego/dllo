//Obtener nombres de compañias
const button = document.querySelector("button");

let url = "http://api.citybik.es/v2/networks";
fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));


const mostrarData = async (data) => {
    let body = "";
    for (var i = 0; i < data.networks.length; i++) {
        body += `<tr>
                <td valign="middle" align="center">
                ${data.networks[i].company} (${data.networks[i].location.country})</td>
                <td valign="middle" align="center">    
                <center><button class="btn btn-outline-secondary" name="${data.networks[i].company}" id="${data.networks[i].id}" onclick="showStations(this)"> ${data.networks[i].name}</button></center>
                </tr>`;
    }
    document.getElementById("data").innerHTML = body;
    console.log(data)
}

//Obtener datos de esatciones de cada network

function showStations(station) {
    //var x = document.getElementById("myDIV" + station.id);
    var total_bikes=0
    var total_slots=0
    localStorage.setItem("id", JSON.stringify(station.id));

    let url2 = `http://api.citybik.es/v2/networks/${station.id}`;
    fetch(url2)
        .then((response) => response.json())
        .then ((data2) => mostrarData(data2))
        .catch((error) => console.log(error));

    const  mostrarData = async (data2) => {
        let modalcontent = "";
        let groupModal = "";
        //vacio el modal
        let modal="";
        document.getElementById("data2").innerHTML = modal;

        for (var i = 0; i < data2.network.stations.length; i++) {
          let aux= data2.network.stations[i]
          total_bikes+=aux.free_bikes
          total_slots+=aux.empty_slots;
          }
        
        //lleno el modal
        modal+=`
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
          
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Estaciones<br>Total de bicicletas de la red: ${total_bikes}<br>Total de espacios de la red: ${total_slots}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
          
              <div class="modal-body">
              <div id="modalcontent${station.name}" class="row row-cols-1 row-cols-md-3 g-4"></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>`
        document.getElementById("data2").innerHTML = modal;

        for (var i = 0; i < data2.network.stations.length; i++) {
            let aux= data2.network.stations[i]
            
            total_bikes+=aux.free_bikes
            total_slots+=aux.empty_slots
            
                modalcontent += 
                    `
                    <center>
                    <div class="card h-100" style="width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">Nombre Estación: ${aux.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Datos:</h6>
                        <p class="card-text">Fecha de Actualización: ${aux.timestamp}</p>
                        <p class="card-text">Espacios Libres: ${aux.empty_slots}</p>
                        <p class="card-text">Bicicletas Libres: ${aux.free_bikes}</p>
                        <p class="card-text">Total de espacios: ${aux.free_bikes+aux.empty_slots}</p>

                      </div>
                    </div></center>
                    `;
            }
            document.getElementById("modalcontent"+station.name).innerHTML = modalcontent;


            $('#exampleModal').modal('show');
        }

};
