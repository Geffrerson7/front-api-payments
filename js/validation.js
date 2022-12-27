function validate(params) {
    let c = 0;
    params.forEach((value) => {
      if (value === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All fields are required!",
        });
        c++;
      }
    });
    return c===0;
  }
  
export default validate;