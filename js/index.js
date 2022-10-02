
const button = document.querySelector("button");

let url = "http://api.citybik.es/v2/networks";
fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));


const mostrarData = async (data) => {
    let body = "";
    let networks = new Array();
    let redes = data.networks;
    await redes.forEach((doc) => {
        if (doc.company == null) {
            doc.company = ["Independiente"];
        }
        networks.push(doc.company);
    });

    let UNetworks = new Array();
    let auxa = new Array();

    for (let i = 0; i < networks.length; i++) {
        if (Array.isArray(networks[i])) {
            auxa = networks[i];
            for (let j = 0; j < auxa.length; j++) {
                UNetworks.push(auxa[j]);
            }
        }
    }
    var nombreNetworks = _.uniq(UNetworks);


    for (var j = 0; j < nombreNetworks.length; j++) {
        
        

        body += `<tr>
                <td valign="middle" align="center">${nombreNetworks[j]} </td>
                <td valign="middle" align="center">    
                <center><button class="btn btn-dark" name="${data.networks[j].company}" id="${data.networks[j].id}" onclick="myFunction(this)">Ver Empresas de la Red</button></center>
                    <br>
                    <div style="display:none" id="myDIV${data.networks[j].id}">
                    <br>
                    <button class="btn btn-outline-primary"> ${data.networks[j].name}</button>
                </td> </td>
                </tr>`;
    }
    document.getElementById("data").innerHTML = body;
}
function myFunction(id) {
    var x = document.getElementById("myDIV"+id.id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};
