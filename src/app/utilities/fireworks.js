/* fireworks.js */

export function launchFireworks() {
  const canvas = document.getElementById("fireworkCanvas");
  if (!canvas) return; // regarde si le canvas existe
  const context = canvas.getContext("2d");
  const fireworks = [];

  class Firework {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.particles = [];
      this.createParticles();
    }

    createParticles() {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        this.particles.push(new Particle(this.x, this.y, angle, speed));
      }
    }

    update() {
      this.particles.forEach((particle) => particle.update());
    }

    draw() {
      this.particles.forEach((particle) => particle.draw());
    }
  }

  class Particle {
    constructor(x, y, angle, speed) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.02; // créé le fade out
    }

    draw() {
      context.globalAlpha = this.alpha;
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, 2, 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
      firework.update();
      firework.draw();
      if (firework.particles.every((particle) => particle.alpha <= 0)) {
        fireworks.splice(index, 1);
      }
    });
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2; // ajuste les explosions pour qu'elle ne soient que dans le haut de l'écran
    fireworks.push(new Firework(x, y));
  }, 500);

  animate();
}
