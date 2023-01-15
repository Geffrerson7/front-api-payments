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

function validacionImagen(params) {
  let valid = true;
  params.forEach((value, key) => {
    if (value === "" || value==="undefined") {
      valid = false;
      return valid;
    }
  
  });
  return valid;

}

export { validarURL, validateDecimal, validacionImagen }; 