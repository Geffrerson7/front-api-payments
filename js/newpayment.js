import validate from "./validation.js";

const formTodo = document.querySelector('#form');
const expirationDate = document.querySelector('#expirationDate');
const service = document.querySelector('#service');
const amount = document.querySelector('#amount')

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
    await fetch("http://127.0.0.1:8000/api/v2/payments/", {
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