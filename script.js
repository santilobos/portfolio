


let icon = document.getElementById("themeIcon");

// Función para aplicar el tema guardado en localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'darkTheme';
    document.body.classList.add(savedTheme);
    if (savedTheme === 'lightTheme') {
        icon.textContent = "dark_mode";
    } else {
        icon.textContent = "light_mode";
    }
}

// Llama a la función para aplicar el tema guardado cuando se carga la página
document.addEventListener('DOMContentLoaded', applySavedTheme);

function changeTheme() {
    document.body.classList.toggle("lightTheme");
    if (document.body.classList.contains("lightTheme")) {
        icon.textContent = "dark_mode";
        localStorage.setItem('theme', 'lightTheme');
    } else {
        icon.textContent = "light_mode";
        localStorage.setItem('theme', 'darkTheme');
    }
}


