const $ = (id) => document.getElementById(id);



/* Valida el nombre */
const validateName = () => {
  const name = $("name").value.trim();
  if (!name) {
    $("nameError").innerText = "Debes ingresar un nombre";
    return true;
  } else if (name.length < 3 || name.length > 15) {
    $("nameError").innerText = "Debe tener entre 3 y 15 caracteres";
    return true;
  } else {
    $("nameError").innerText = "";
    return false;
  }
};

$("name").addEventListener("blur", () => {
  validateName();
});

/* Verifica el correo electrónico */
const regExEmails = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/;

const validateEmail = () => {
  const email = $("email").value.trim();
  if (!email) {
    $("emailError").innerText = "Debes ingresar un correo";
    return true;
  } else if (!regExEmails.test(email)) {
    $("emailError").innerText = "Debes ingresar un correo válido";
    return true;
  } else {
    $("emailError").innerText = "";
    return false;
  }
};

$("email").addEventListener("blur", () => {
  validateEmail();
});




/* Verifica la contraseña */
const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,12}[^'\s]/;

const validatePassword = () => {
  const password = $("password").value.trim();
  if (!password) {
    $("passwordError").innerText = "Debes ingresar una contraseña";
    return true;
  } else if (!regExPass.test(password)) {
    $("passwordError").innerText =
      "Debe ser entre 5 y 12 caracteres y tener una mayúscula, una minúscula y un número y un caracter especial";
    return true;
  } else {
    $("passwordError").innerText = "";
    return false;
  }
};

$("password").addEventListener("blur", () => {
  validatePassword();
});

/* Verifica la confirmación de contraseña */
const validatePasswordConfirmation = () => {
  const passwordConfirmation = $("password2").value.trim();
  const password = $("password").value.trim();
  if (!passwordConfirmation) {
    $("password2Error").innerText = "Debes ingresar la confirmación";
    return true;
  } else if (passwordConfirmation !== password) {
    $("password2Error").innerText = "Las contraseñas no coinciden";
    return true;
  } else {
    $("password2Error").innerText = "";
    return false;
  }
};

$("password2").addEventListener("blur", () => {
  validatePasswordConfirmation();
});

/* Event listener del envío del formulario */
$("formRegister").addEventListener("submit", (e) => {
  if (validateName() || validateEmail() || validatePassword() || validatePasswordConfirmation()) {
    e.preventDefault(); // Evita el envío del formulario si hay errores de validación
  } else {
    e.submit(); // Envía el formulario si no hay errores de validación
  }
});
