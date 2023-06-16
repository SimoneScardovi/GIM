
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creazione per memorizzare i fiocchi di neve
var flakes = [];

// Funzione per creare un nuovo fiocco di neve
function createFlake() {
  var x = Math.random() * canvas.width; // Coordinata x casuale
  var y = 0; // Partenza dal bordo superiore del canvas
  var size = Math.random() * 3 + 2; // Dimensione casuale tra 2 e 5

  return {
    x: x,
    y: y,
    size: size,
    speed: Math.random() * 1 + 0.5 // Velocità casuale tra 0.5 e 1.5
  };
}

// Funzione per disegnare i fiocchi di neve sul canvas
function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulizia del canvas

  ctx.fillStyle = 'white'; // Colore dei fiocchi di neve

  for (var i = 0; i < flakes.length; i++) {
    var flake = flakes[i];
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Funzione per aggiornare la posizione dei fiocchi di neve
function updateFlakes() {
  for (var i = 0; i < flakes.length; i++) {
    var flake = flakes[i];
    flake.y += flake.speed; // Aggiornamento della posizione verticale del fiocco

    // Se il fiocco di neve raggiunge il bordo inferiore del canvas, viene riposizionato
    if (flake.y > canvas.height) {
      flakes[i] = createFlake();
    }
  }
}

// Funzione per l'avvio dell'animazione
function animateSnow() {
  drawFlakes();
  updateFlakes();
  requestAnimationFrame(animateSnow);
}

// Creazione dei fiocchi di neve iniziali
for (var i = 0; i < 100; i++) {
  flakes.push(createFlake());
}

// Avvio dell'animazione
animateSnow();