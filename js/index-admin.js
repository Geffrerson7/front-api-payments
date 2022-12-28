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

        containerex.innerHTML += renderPaymentExpired(payment);

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


let user = JSON.parse(localStorage.getItem("user"));
containeruser.innerHTML = `<p>${user.email}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);

updateTokenInterval();
getPayments();
getPaymentsExpired();
