// Creazione del canvas
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Array delle sfere
let balls = [];

// Variabili per la posizione del cursore
let mouseX = 0;
let mouseY = 0;

// Funzione per disegnare una sfera
function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

  // Creazione del gradiente per la scia
  const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
  gradient.addColorStop(0, `rgba(${ball.color.r}, ${ball.color.g}, ${ball.color.b}, 1)`);
  gradient.addColorStop(1, `rgba(${ball.color.r}, ${ball.color.g}, ${ball.color.b}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

// Funzione per aggiornare la posizione e la velocità delle sfere
function updateBalls() {
  balls.forEach((ball) => {
    // Calcolo della direzione e intensità della gravità
    const gravityX = mouseX - ball.x;
    const gravityY = mouseY - ball.y;
    const distance = Math.sqrt(gravityX * gravityX + gravityY * gravityY);
    const gravityIntensity = 0.03;
    const gravityDirectionX = gravityX / distance;
    const gravityDirectionY = gravityY / distance;

    // Aggiornamento velocità con la gravità
    ball.speedX += gravityDirectionX * gravityIntensity;
    ball.speedY += gravityDirectionY * gravityIntensity;

    // Aggiornamento posizione
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Controllo collisione con i lati verticali
    if (ball.y + ball.radius >= canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.speedY *= -1; // Rimbalzo con inversione della velocità verticale
    } else if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.speedY *= -1; // Rimbalzo con inversione della velocità verticale
    }

    // Controllo collisione con i lati orizzontali
    if (ball.x + ball.radius >= canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.speedX *= -1; // Rimbalzo con inversione della velocità laterale
    } else if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius;
      ball.speedX *= -1; // Rimbalzo con inversione della velocità laterale
    }

	// Controllo collisione con altre sfere
    balls.forEach((otherBall) => {
		if (otherBall !== ball) {
		  const dx = ball.x - otherBall.x;
		  const dy = ball.y - otherBall.y;
		  const distance = Math.sqrt(dx * dx + dy * dy);
  
		  if (distance < ball.radius + otherBall.radius) {
			// Le sfere collidono, invertire la direzione delle velocità
			const angle = Math.atan2(dy, dx);
			const sin = Math.sin(angle);
			const cos = Math.cos(angle);
  
			// Applicare la rotazione alle velocità
			const vx1 = ball.speedX * cos + ball.speedY * sin;
			const vy1 = ball.speedY * cos - ball.speedX * sin;
			const vx2 = otherBall.speedX * cos + otherBall.speedY * sin;
			const vy2 = otherBall.speedY * cos - otherBall.speedX * sin;
  
			// Calcolare le nuove velocità dopo la collisione
			const finalVx1 = ((ball.radius - otherBall.radius) * vx1 + 2 * otherBall.radius * vx2) / (ball.radius + otherBall.radius);
			const finalVx2 = ((otherBall.radius - ball.radius) * vx2 + 2 * ball.radius * vx1) / (ball.radius + otherBall.radius);
			const finalVy1 = vy1;
			const finalVy2 = vy2;
  
			// Aggiornare le velocità delle sfere
			ball.speedX = finalVx1 * cos - finalVy1 * sin;
			ball.speedY = finalVy1 * cos + finalVx1 * sin;
			otherBall.speedX = finalVx2 * cos - finalVy2 * sin;
			otherBall.speedY = finalVy2 * cos + finalVx2 * sin;
		  }
		}
	  });
  });
}

// Funzione per gestire il movimento del mouse
function handleMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// Funzione per gestire il click del mouse
function handleMouseClick(event) {
  if (event.button === 0) {
    const randomSpeed = Math.floor(Math.random() * 5) + 2;
    const randomSize = 25;
    const randomDirection = Math.random() > 0.5 ? -1 : 1;
    const randomX = randomDirection === -1 ? -randomSize : canvas.width + randomSize;
    const randomY = Math.floor(Math.random() * (canvas.height - randomSize * 2)) + randomSize;

    // Creazione della sfera
    const ball = {
      x: randomX,
      y: randomY,
      radius: randomSize,
      speedX: randomDirection * randomSpeed,
      speedY: 0,
      color: getRandomColor(),
      trail: [],
    };

    balls.push(ball);
  }
}

// Funzione per cambiare i colori delle sfere
function changeColors() {
  balls.forEach((ball) => {
    ball.color = getRandomColor();
  });
}

// Funzione per ottenere un colore casuale
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

// Aggiunta degli eventi per il movimento del mouse e il click del mouse
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", handleMouseClick);
window.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    changeColors();
  }
});

// Funzione di loop per l'animazione
function animate() {
  // Pulizia del canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Aggiornamento e disegno delle sfere
  updateBalls();
  balls.forEach((ball) => {
    drawBall(ball);

    // Aggiornamento della scia
    ball.trail.push(ball.color);
    if (ball.trail.length > 40) {
      ball.trail.shift();
    }
  });

  // Richiesta di animazione
  requestAnimationFrame(animate);
}

// Avvio dell'animazione
animate();
