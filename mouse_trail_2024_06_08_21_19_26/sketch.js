// Array to store particles
let particles = [];

function setup() {
  createCanvas(800, 600);
  background(255); // White background
}

function draw() {
  // Adjust the transparency of the background to create a fading effect
  background(255, 30); 
  
  // Draw and update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1); // Remove faded out particles
    }
  }
  
  // Add new particle at mouse position
  particles.push(new Particle(mouseX, mouseY));
}

// Particle class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.alpha = 255; // Initial alpha value
    this.size = random(5, 20); // Random size
    this.color = color(random(255), random(255), random(255)); // Random color
  }
  
  update() {
    this.pos.add(this.vel); // Update position
    this.alpha -= 2; // Decrease alpha
  }
  
  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
