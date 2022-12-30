function validate(params) {
    let c = 0;
    params.forEach((value) => {
      if (value === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Todos los campos son requerido!",
        });
        c++;
      }
    });
    return c===0;
  }
  
function validateDecimal(valor) {
    var RE = /^\d*\.?\d*$/;
    if (RE.test(valor)) {
        return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El monto ingresado no es un numero!",
      });
        return false;
    }
}

function validarURL(miurl) {
  try {
 
    new URL(miurl);
    return true;
 
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡La URL ingresada no existe!",
    });
    return false;
 
  }
}

export {validate, validateDecimal, validarURL};