const menu = document.querySelector(".header_menu")
const burguer = document.querySelector(".header_burger")

burguer.addEventListener("click", () => {
    menu.classList.toggle("menuEvent");
});

