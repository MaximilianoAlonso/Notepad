
const formCreate = document.querySelector("#formCreate")



formCreate.addEventListener("submit", (button) => {
    button.preventDefault()
    Swal.fire({
        title: 'Deseas guardar esta nota?',
        showDenyButton: true,
       
        confirmButtonText: 'Guardar',
        denyButtonText: `Olvide algo`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardando...',
            showConfirmButton: false,
            timer: 1000
          })
          formCreate.submit()
        } else if (result.isDenied) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Segui escribiendo...',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
      
})
