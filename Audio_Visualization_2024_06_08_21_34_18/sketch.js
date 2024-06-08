let mic, fft;
let particles = [];
let numParticles = 200;
let interactiveCircle;
let rings = [];
let numRings = 5;
let ringSpeed = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100); // Use HSB color mode for vibrant colors
  background(30, 30, 50); // Unique background color

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Initialize particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  // Create an interactive circle
  interactiveCircle = new InteractiveCircle(width / 2, height / 2, 100);

  // Initialize rings
  for (let i = 0; i < numRings; i++) {
    let radius = 50 + i * 30;
    let hue = map(i, 0, numRings - 1, 0, 360);
    rings.push(new Ring(width / 2, height / 2, radius, hue));
  }
}

function draw() {
  background(30, 30, 50); // Unique background color

  // Update and display particles
  for (let i = 0; i < numParticles; i++) {
    particles[i].update();
    particles[i].display();
  }

  // Update and display interactive circle
  interactiveCircle.update();
  interactiveCircle.display();

  // Get spectrum data from FFT
  let spectrum = fft.analyze();

  // Draw dynamic bars
  let numBars = spectrum.length;
  let barWidth = width / numBars;
  for (let i = 0; i < numBars; i++) {
    let barHeight = map(spectrum[i], 0, 255, 0, height);
    let x = i * barWidth;
    let y = height - barHeight;
    let c = color(map(i, 0, numBars, 0, 360), 100, 100); // Unique color mapping
    fill(c);
    rect(x, y, barWidth, barHeight);
  }

  // Update and display rings
  for (let i = 0; i < numRings; i++) {
    rings[i].update();
    rings[i].display();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(5, 20); // Adjusted size range for variation
    this.color = color(random(360), 100, 100, 50); // Unique particle color
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }

  display() {
    strokeWeight(2);
    stroke(this.color);
    line(this.prevX, this.prevY, this.x, this.y);
  }
}

class InteractiveCircle {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color = color(255, 255, 255, 50);
  }

  update() {
    // Move circle based on mouse interaction
    if (dist(this.x, this.y, mouseX, mouseY) < this.diameter / 2) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(2);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Ring {
  constructor(x, y, radius, hue) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.hue = hue;
    this.theta = 0;
  }

  update() {
    this.theta += ringSpeed;
  }

  display() {
    noFill();
    strokeWeight(3);
    stroke(this.hue, 80, 100, 80); // Value 80
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    let numPoints = 30;
    beginShape();
    for (let i = 0; i < numPoints; i++) {
      let angle = map(i, 0, numPoints, 0, TWO_PI);
      let x = this.x + cos(angle + this.theta) * this.radius;
      let y = this.y + sin(angle + this.theta) * this.radius;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
