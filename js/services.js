import { updateTokenInterval,logoutUser,BASE_URL} from "./auth.js";
import validate from "./validation.js";

const containeruser = document.querySelector("#user-email");
const formNewService = document.querySelector('#form-create');
const newname =document.querySelector('#new-name');
const newprefixe =document.querySelector('#new-prefixe');
const newURLlogo =document.querySelector('#new-URLlogo');
const service = document.querySelector("#service");

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

async function acceptData(){
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const data = {
        name: newname.value,
        prefixe: newprefixe.value,
        logo: newURLlogo.value,
     
    }
    await fetch(BASE_URL+"api/v2/services-crud/", {
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
                    window.location.replace("./index-admin.html");
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

let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML=`<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);