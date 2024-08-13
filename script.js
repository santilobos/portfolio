


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


// Efecto mouse
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
};

const config = {
  glowDuration: 75,
  maximumGlowPointSpacing: 5,
};

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const createGlowPoint = position => {
  const glow = document.createElement("div");
  
  glow.className = "glow-point";
  
  // Posicionar de manera fija para que funcione en todo el documento
  glow.style.position = "fixed";
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  glow.style.zIndex = 9999;  // Asegura que esté sobre otros elementos

  appendElement(glow);
  
  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);
  
  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
  
  // Crear puntos intermedios para el alargamiento
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });

  // Asegura que siempre haya un glow point en la posición actual del cursor o del toque
  createGlowPoint(current);
}

const updateLastMousePosition = position => last.mousePosition = position;

const handleOnMove = e => {
  const mousePosition = { 
    x: e.clientX, 
    y: e.clientY 
  };
  
  // Crear una secuencia de puntos brillantes entre la última posición y la actual
  createGlow(last.mousePosition, mousePosition);
  
  // Actualiza la posición del ratón
  updateLastMousePosition(mousePosition);
}

const handleOnTouch = e => {
  const touch = e.touches[0];
  
  const touchPosition = {
    x: touch.clientX,
    y: touch.clientY
  };
  
  // Crear una secuencia de puntos brillantes entre la última posición tocada y la actual
  createGlow(last.mousePosition, touchPosition);
  
  // Actualiza la posición del toque
  updateLastMousePosition(touchPosition);
}

// Registrar la posición del ratón o toque al entrar en la ventana
const handleMouseEnter = e => {
  const mousePosition = { 
    x: e.clientX, 
    y: e.clientY 
  };
  
  // Establecer la última posición del ratón cuando entra en la ventana
  updateLastMousePosition(mousePosition);
}

const handleTouchStart = e => {
  const touch = e.touches[0];
  
  const touchPosition = {
    x: touch.clientX,
    y: touch.clientY
  };
  
  // Establecer la última posición del toque cuando entra en la ventana
  updateLastMousePosition(touchPosition);
}

// Función para detectar si es un dispositivo móvil
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

// Configurar eventos al cargar la página
window.addEventListener('load', () => {
  if (!isMobile()) {
    window.onmousemove = e => handleOnMove(e);
    document.body.onmouseenter = e => handleMouseEnter(e);
    document.body.onmouseleave = () => updateLastMousePosition(originPosition);
  }
  
  // Solo agregar eventos táctiles si no es móvil
  if (!isMobile()) {
    window.ontouchmove = e => handleOnTouch(e);
    document.body.ontouchstart = e => handleTouchStart(e);
  }
});




document.addEventListener('DOMContentLoaded', function() {
  const cardContainer = document.querySelector('.cardContainer');
  const progressBar = document.querySelector('.progressBar');

  const startPercentage = 5; // Porcentaje de inicio de la barra de progreso

  cardContainer.addEventListener('scroll', function() {
      const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;
      const scrollLeft = cardContainer.scrollLeft;

      // Calcular el porcentaje actual de desplazamiento
      const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;

      // Ajustar la posición de la barra de progreso
      if (scrollLeft <= 0) {
          // Si estamos al inicio, establece la barra al porcentaje inicial deseado
          progressBar.style.width = startPercentage + '%';
      } else {
          // Ajustar la barra de progreso en función del desplazamiento
          progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
      }
  });

  // Inicializar la posición de la barra de progreso al cargar
  function initializeProgressBar() {
      const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;
      const scrollLeft = cardContainer.scrollLeft;

      // Establecer la barra de progreso al porcentaje de inicio
      if (scrollLeft <= 0) {
          progressBar.style.width = startPercentage + '%';
      } else {
          const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;
          progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
      }
  }

  initializeProgressBar();
});


// header que se esconde 
