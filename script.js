


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
  
  glow.style.position = "fixed";
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  glow.style.zIndex = 9999;

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
  
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });

  createGlowPoint(current);
}

const updateLastMousePosition = position => {
  last.mousePosition = position;
}

const handleOnMove = e => {
  const mousePosition = { 
    x: e.clientX, 
    y: e.clientY 
  };
  
  const header = document.querySelector('header');
  if (header && header.contains(e.target)) {
    return;
  }
  
  if (last.mousePosition.x !== 0 || last.mousePosition.y !== 0) {
    createGlow(last.mousePosition, mousePosition);
  }
  
  updateLastMousePosition(mousePosition);
}

const handleOnTouch = e => {
  const touch = e.touches[0];
  
  const touchPosition = {
    x: touch.clientX,
    y: touch.clientY
  };
  
  const header = document.querySelector('header');
  if (header && header.contains(e.target)) {
    return;
  }
  
  if (last.mousePosition.x !== 0 || last.mousePosition.y !== 0) {
    createGlow(last.mousePosition, touchPosition);
  }
  
  updateLastMousePosition(touchPosition);
}

const handleMouseEnter = e => {
  const mousePosition = { 
    x: e.clientX, 
    y: e.clientY 
  };
  
  const header = document.querySelector('header');
  if (header && header.contains(e.target)) {
    return;
  }

  updateLastMousePosition(mousePosition);
}

const handleTouchStart = e => {
  const touch = e.touches[0];
  
  const touchPosition = {
    x: touch.clientX,
    y: touch.clientY
  };

  const header = document.querySelector('header');
  if (header && header.contains(e.target)) {
    return;
  }
  
  updateLastMousePosition(touchPosition);
}

const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

window.addEventListener('load', () => {
  if (!isMobile()) {
    window.onmousemove = e => handleOnMove(e);
    document.body.onmouseenter = e => handleMouseEnter(e);
    document.body.onmouseleave = () => updateLastMousePosition(originPosition);
  }
  
  if (!isMobile()) {
    window.ontouchmove = e => handleOnTouch(e);
    document.body.ontouchstart = e => handleTouchStart(e);
  }
});




// Barra de progreso en slider cards

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


