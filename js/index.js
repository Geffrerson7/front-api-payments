import { BASE_URL, updateTokenInterval, logoutUser, validateAuth } from "./auth.js";

const containeruser = document.querySelector("#user-email");
const container = document.querySelector("#row-p");
const containerex = document.querySelector("#row-ex");
const containerservice = document.querySelector("#section-service")
const foto =document.querySelector("#profile-image")
//email del usuario en la página
let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML = `<p>${user.email}</p>`
//Opcion de logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

validateAuth("../templates/index.html")

var DIR_EXPIRED = '';
var DIR_PAYMENT = '';
if (user.is_superuser) {
  DIR_PAYMENT = 'http://127.0.0.1:8000/api/v2/payments-crud/';
  DIR_EXPIRED = 'http://127.0.0.1:8000/api/v2/expired-crud/';
  containerservice.innerHTML = `<a href="./services.html" class="nav-link text-secondary">
                                  <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                                      <use xlink:href="#grid" />
                                  </svg>
                                Servicios
                                </a>`;
  } else {
  DIR_PAYMENT = 'http://127.0.0.1:8000/api/v2/payments/';
  DIR_EXPIRED = 'http://127.0.0.1:8000/api/v2/expired/';
  }


async function getPayments() {
  
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  
  const response = await fetch(DIR_PAYMENT, {
    method: 'GET',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authTokens?.access
    }
  });
  const data = await response.json();
  data.results.forEach((payment) => {
    container.innerHTML += renderPayment(payment);
  });
}

function renderPayment(payment) {
  return `
      <div class="card col-md-3">
        <img src="${payment.service_logo}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Servicio: ${payment.service}</h5>
          <p class="card-text">Fecha de pago: ${payment.paymentDate}</p>
          <p class="card-text">Monto: s/. ${payment.amount}</p>
        </div>
      </div>
  `;
}

async function getPaymentsExpired() {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let user = JSON.parse(localStorage.getItem("user"));
  
  const response = await fetch( DIR_EXPIRED, {
    method: 'GET',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authTokens?.access
    }
  });
  const data = await response.json();
  data.results.forEach((payment) => {
    if (user.email == payment.user) {
      containerex.innerHTML += renderPaymentExpired(payment);
    }
  });
}

function renderPaymentExpired(payment) {

  return `
  <div class="card col-md-3">
      <img src="${payment.service_logo}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">Servicio: ${payment.service}</h5>
      <p class="card-text">Fecha de pago: ${payment.paymentDate}</p>
      <p class="card-text">Monto: s/. ${payment.amount}</p>
      <p class="card-text">Penalidad: s/. ${payment.penalty_fee_amount}</p>
    </div>
  </div>
  `;
}

updateTokenInterval();
getPayments();
getPaymentsExpired();


async function getMyAvatar() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (id==null){
    foto.innerHTML=`<a href="#" class="nav-link text-white">
                     <img src="../assets/brand/perfil.jpg" alt="mdo" width="40" height="40" class="rounded-circle">
                    </a>`
  }else {
    
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
    localStorage.setItem("avatar", JSON.stringify(data));
  };
}
getMyAvatar();


let avatar = JSON.parse(localStorage.getItem("avatar"));
foto.innerHTML=`<a href="#" class="nav-link text-white">
     <img src="${avatar.image}" alt="mdo" width="40" height="40" class="rounded-circle">
    </a>`
