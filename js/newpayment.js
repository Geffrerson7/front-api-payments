import validate from "./validation.js";
import { updateTokenInterval, BASE_URL, logoutUser } from "./auth.js";

const containeruser = document.querySelector("#user-email");
const formTodo = document.querySelector('#form');
const expirationDate = document.querySelector('#expirationDate');
const service = document.querySelector('#service');
const amount = document.querySelector('#amount')
const serviceOption = document.querySelector(".form-select");

updateTokenInterval();
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    let validated = validate([expirationDate.value, service.value, amount.value]);
    if (validated) {
    acceptData();
    }
  };

async function acceptData(){
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const data = {
        expirationDate: expirationDate.value,
        service: service.value,
        amount: amount.value,
     
    }
    await fetch(BASE_URL+"api/v2/payments/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./index.html");
                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
}

async function getServices() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "api/v2/services/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }
    });
    const data = await response.json();
    data.results.forEach((service) => {

        serviceOption.innerHTML += `<option>${service.name}</option>`

    });
}

getServices();

let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML=`<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);