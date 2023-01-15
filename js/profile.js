import { BASE_URL, updateTokenInterval, logoutUser, validateAuth} from "./auth.js";
import { validacionImagen } from "./validation2.js";
validateAuth();
const containerservice = document.querySelector("#section-service")

const containeruser = document.querySelector("#user-email");
const foto =document.querySelector("#profile-image")
//email del usuario en la página
let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML = `<p>${user.email}</p>`
//Opcion de logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

//opcion services
if (user.is_superuser){
    
    containerservice.innerHTML = `<a href="./services.html" class="nav-link text-secondary">
                                  <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                                      <use xlink:href="#grid" />
                                  </svg>
                                Servicios
                                </a>`;   
} 

const inputPhoto = document.getElementById('imagen');
const button_add = document.getElementById('actualizar');
//let usertype = JSON.parse(localStorage.getItem("user"));
let ImagenEscogida = document.getElementById('Imagen-escogida');

button_add.onclick = async function() {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const formData = new FormData();
    // Agrega la imagen al formData
    formData.append('photo', inputPhoto.files[0]);
    let valid=validacionImagen(formData)
    if (valid) {

        //---------------------------------------------------------
        
    
        const response = await fetch(BASE_URL + "api/v2/profile/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authTokens?.access
            } 
    
        });
        const data=await response.json();
        
       
         //---------------------------------------------------------
        let logo=data.results
        
        if (logo.length === 0){

            try {
                const response = await fetch(BASE_URL + "api/v2/profile/",{
                    method: "POST",
                    mode: "cors",        
                    headers: {
                        'Authorization': 'Bearer ' + authTokens?.access
                    },
                    body: formData,
            
                }); 
            
                Swal.fire({
                    text: "Logo de usuario se creó exitosamente",
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
                
            } catch (error) {
                Swal.fire({
                text: error,
                icon: "error",
                });
                }


        }else {
            
            try {
                const response = await fetch(BASE_URL + `api/v2/profile/${logo[0].id}/`,{
                    method: "put",
                    mode: "cors",  
                    headers: {
                        'Authorization': 'Bearer ' + authTokens?.access
                    },      
                    body: formData,
            
                }); 
            
                Swal.fire({
                    text: "Logo de usuario se actualizó existosamente",
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
                
            } catch (error) {
                Swal.fire({
                text: error,
                icon: "error",
                });
                }

        }


    } else {
        Swal.fire({
            text: "Tienes que Elegir una imagen",
            icon: "error",
            });
    }

}

async function getLogo(){

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
            ImagenEscogida.src=`${logo[0].photo}`
            foto.innerHTML=`<a href="#" class="nav-link text-white">
                        <img src="${logo[0].photo}" alt="mdo" width="40" height="40" class="rounded-circle">
                    </a>`
    }else{
            ImagenEscogida.src="../assets/brand/perfil.jpg"
            foto.innerHTML=`<a href="#" class="nav-link text-white">
                                 <img src="../assets/brand/perfil.jpg" alt="mdo" width="40" height="40" class="rounded-circle">
                                </a>`
    }
}



getLogo();
updateTokenInterval();

