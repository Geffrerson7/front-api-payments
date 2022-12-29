import { BASE_URL, updateTokenInterval, logoutUser, validateAuth } from "./auth.js";

const containeravatar = document.querySelector("#row-a");
const containeruser = document.querySelector("#user-email");
const containerservice = document.querySelector("#section-service")
const foto =document.querySelector("#profile-image")

let user = JSON.parse(localStorage.getItem("user"));

containeruser.innerHTML = `<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);



validateAuth("../templates/edit-profile.html")
//opcion servicios
if (user.is_superuser){
    
    containerservice.innerHTML = `<a href="./services.html" class="nav-link text-secondary">
                                  <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                                      <use xlink:href="#grid" />
                                  </svg>
                                Servicios
                                </a>`;   
} 


async function getAvatar() {
  
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    
    const response = await fetch(BASE_URL+'api/v2/avatar/', {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authTokens?.access
      }
    });
    const data = await response.json();
    data.forEach((avatar) => {
      containeravatar.innerHTML += renderAvatar(avatar);
    });
  }
  
function renderAvatar(avatar) {
    return `
        <div class="card col-md-3">
          <img src="${avatar.image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${avatar.name}</h5>
            <a href="./photo.html?id=${avatar.id}" class="btn btn-primary" id="avatar">Elegir como avatar</a>
          </div>
        </div>
    `;
}



updateTokenInterval();
getAvatar();

let avatar = JSON.parse(localStorage.getItem("avatar"));
if (avatar==null){
    foto.innerHTML=`<a href="#" class="nav-link text-white">
                     <img src="../assets/brand/perfil.jpg" alt="mdo" width="40" height="40" class="rounded-circle">
                    </a>`
  }else {
    foto.innerHTML=`<a href="#" class="nav-link text-white">
   <img src="${avatar.image}" alt="mdo" width="40" height="40" class="rounded-circle">
  </a>`
  }