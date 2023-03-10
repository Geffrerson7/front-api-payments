import validate from "./validation.js";
import { validateDecimal } from "./validation2.js";
import { updateTokenInterval, BASE_URL, logoutUser, validateAuth} from "./auth.js";
validateAuth();
const foto =document.querySelector("#profile-image")
const containeruser = document.querySelector("#user-email");
const formTodo = document.querySelector('#form');
const expirationDate = document.querySelector('#expirationDate');
const service = document.querySelector('#service');
const amount = document.querySelector('#amount')
const serviceOption = document.querySelector(".form-select");
const containerservice = document.querySelector("#section-service")
let user = JSON.parse(localStorage.getItem("user"));
let DIR_PAYMENT='';
let DIR_SERVICE='';


if (user.is_superuser){
    DIR_PAYMENT='api/v2/payments-crud/';
    DIR_SERVICE='api/v2/services-crud/';
    containerservice.innerHTML = `<a href="./services.html" class="nav-link text-secondary">
                                  <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                                      <use xlink:href="#grid" />
                                  </svg>
                                Servicios
                                </a>`;   
} else {
    DIR_PAYMENT='api/v2/payments/';
    DIR_SERVICE= 'api/v2/services/';  
}

containeruser.innerHTML=`<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    let validated = validate([expirationDate.value, service.value,amount.value]);
    let validatedNumber=validateDecimal(amount.value)
    if (validated && validatedNumber) {
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
    await fetch(BASE_URL+DIR_PAYMENT, {
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
                '??Creado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                    //window.location.replace("./index.html");
                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "??Ocurri?? un error!"
            })           
        }
    })
}

async function getServices() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + DIR_SERVICE, {
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

    serviceOption.innerHTML += `<option>${service.name}</option>`

    });
}

async function getPhoto(){

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "api/v2/profile/", {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 
    });
    const data=await response.json();
    const logo =data.results
    
    if(logo.length >0){
            
            foto.innerHTML=`<a href="#" class="nav-link text-white">
                        <img src="${logo[0].photo}" alt="mdo" width="40" height="40" class="rounded-circle">
                    </a>`
    }else{
            
            foto.innerHTML=`<a href="#" class="nav-link text-white">
                                 <img src="../assets/brand/perfil.jpg" alt="mdo" width="40" height="40" class="rounded-circle">
                                </a>`
    }
}  
getPhoto();

updateTokenInterval();
getServices();