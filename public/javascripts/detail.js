
const deleteNote = document.querySelector("#deleteNote")



deleteNote.addEventListener("submit", (button) => {
    button.preventDefault()
    Swal.fire({
        title: 'Deseas borrar esta nota?',
        showDenyButton: true,
       
        confirmButtonText: 'SI',
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Borrando...',
            showConfirmButton: false,
            timer: 1000
          })
          deleteNote.submit()
    
        }
      })
      
})
