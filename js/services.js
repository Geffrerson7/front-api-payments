import { updateTokenInterval, logoutUser, BASE_URL } from "./auth.js";
import validate from "./validation.js";

const containeruser = document.querySelector("#user-email");
const foto =document.querySelector("#profile-image")

const formNewService = document.querySelector('#form-create');
const newname = document.querySelector('#new-name');
const newprefixe = document.querySelector('#new-prefixe');
const newURLlogo = document.querySelector('#new-URLlogo');
const serviceOption = document.querySelector("#service");
const formUpdate = document.querySelector('#form-update');
const name = document.querySelector("#name")
const prefixe = document.querySelector("#prefixe")
const URLlogo = document.querySelector("#URLlogo")

updateTokenInterval();
formNewService.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});



let formValidation = () => {
    let validated = validate([newname.value, newprefixe.value, newURLlogo.value]);
    if (validated) {
        acceptData();
    }
};

async function acceptData() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const data = {
        name: newname.value,
        prefixe: newprefixe.value,
        logo: newURLlogo.value,

    }
    await fetch(BASE_URL + "api/v2/services-crud/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./index-admin.html");
                }
            })
        }
        else {
            Swal.fire({
                icon: "error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })
        }
    })
}



formUpdate.addEventListener('submit', (event) => {
    event.preventDefault();
    formUpdateValidation();
});

let formUpdateValidation = () => {
    let validated = validate([service.value, name.value, prefixe.value, URLlogo.value]);
    if (validated) {
        updateData();
    }
};

async function updateData() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const data = {
        id: serviceOption.value,
        name: name.value,
        prefixe: prefixe.value,
        logo: URLlogo.value
    }
    await fetch(`http://127.0.0.1:8000/api/v2/services-crud/${data.id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./services.html");
                }
            })
        }
        else {
            Swal.fire({
                icon: "error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })
        }
    })
}

async function getServices() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "api/v2/services-crud/", {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }
    });
    const data = await response.json();
    data.results.forEach((service) => {

        serviceOption.innerHTML += `<option value="${service.id}">${service.name}</option>`

    });
}

getServices();

let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML = `<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

var avatar = JSON.parse(localStorage.getItem(user.email));


if (avatar==null){
    foto.innerHTML=`<a href="#" class="nav-link text-white">
                     <img src="../assets/brand/perfil.jpg" alt="mdo" width="40" height="40" class="rounded-circle">
                    </a>`
  }else {
    foto.innerHTML=`<a href="#" class="nav-link text-white">
   <img src="${avatar.image}" alt="mdo" width="40" height="40" class="rounded-circle">
  </a>`
  }