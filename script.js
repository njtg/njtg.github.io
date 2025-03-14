const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sparks = [];

function createSpark(x, y) {
  const spark = {
    x,
    y,
    size: Math.random() * 5 + 2,
    speedX: Math.random() * 4 - 2,
    speedY: Math.random() * -5 - 2,
    alpha: 1,
    color: `rgb(${Math.random() * 255}, ${Math.random() * 100}, 0)`
  };
  sparks.push(spark);
}

function updateSparks() {
  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    spark.x += spark.speedX;
    spark.y += spark.speedY;
    spark.speedY += 0.1; // Gravetat
    spark.alpha -= 0.02;

    if (spark.alpha <= 0) {
      sparks.splice(i, 1);
    }
  }
}

function drawSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const spark of sparks) {
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${spark.color}, ${spark.alpha})`;
    ctx.fill();
  }
}

function animate() {
  updateSparks();
  drawSparks();
  requestAnimationFrame(animate);
}

// Crea espurnes al fer clic al ratolí
canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 20; i++) {
    createSpark(e.clientX, e.clientY);
  }
});

animate();