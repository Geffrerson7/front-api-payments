import { updateTokenInterval, BASE_URL, logoutUser } from "./auth.js";

const containeruser = document.querySelector("#user-email");
const container = document.querySelector("#row-p");
const containerex = document.querySelector("#row-ex");

async function getPayments() {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch(BASE_URL + "api/v2/payments-crud/", {
    method: 'GET',
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
      <div class="card-body">
        <h3 class="text-center">${payment.email}</h3>
        <p>${payment.service}</p>
        <p>${payment.amount}</p>
        <p>${payment.paymentDate}</p>
        
      </div>
    </div>
  `;
}

async function getPaymentsExpired() {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(BASE_URL + "api/v2/expired-crud/", {
    method: 'GET',
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
      <div class="card-body">
        <h3 class="text-center">${payment.user}</h3>
        <p>${payment.service}</p>
        <p>${payment.paymentDate}</p>
        <p>${payment.amount}</p>
        <p>${payment.penalty_fee_amount}</p>
        
      </div>
    </div>
  `;
}


let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML=`<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

updateTokenInterval();
getPayments();
getPaymentsExpired();
