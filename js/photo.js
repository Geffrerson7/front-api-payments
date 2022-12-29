import { BASE_URL, updateTokenInterval, logoutUser} from "./auth.js";
const containerservice = document.querySelector("#section-service")
const containeravatar = document.querySelector("#row-a");
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

async function chooseMyAvatar(){
    const id = new URLSearchParams(window.location.search).get("id");
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    
    const response = await fetch(BASE_URL+`api/v2/avatar/${id}/`, {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authTokens?.access
      }
    });
    const data = await response.json();
    
    containeravatar.innerHTML=`
    <div class="card col-md-3">
      <img src="${data.image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        
        
      </div>
    </div>
`;
}



updateTokenInterval();
chooseMyAvatar();


async function sendAvatar(){
    const id = new URLSearchParams(window.location.search).get("id");
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    
    const response = await fetch(BASE_URL+`api/v2/avatar/${id}/`, {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authTokens?.access
      }
    });
    const data = await response.json();
    Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Updated!',
            'Your avatar has been updated.',
            'success'
          )
         
        localStorage.setItem(user.email, JSON.stringify(data));
          
          
          window.location.replace("./edit-profile.html");
        }else{
            window.location.replace("./edit-profile.html");
        }
      })
    
}
const elegiravatarButton = document.getElementById("avatar");
elegiravatarButton.addEventListener("click", sendAvatar);

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