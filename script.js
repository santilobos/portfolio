

let icon = document.getElementById("themeIcon");

function changeTheme() {
    document.body.classList.toggle("lightTheme");
    if (document.body.classList.contains("lightTheme")) {
        icon.textContent = "dark_mode";
    } else {
        icon.textContent = "light_mode";
    }
}
