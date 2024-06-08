let ufoX, ufoY; // Position of UFO
let alienSize; // Size of the alien
let stars = []; // Array to store stars
let speedX = -1; // Speed of stars moving to the left

function setup() {
  createCanvas(800, 600);
  
  // Initialize UFO position
  ufoX = width / 2;
  ufoY = height / 2;
  
  // Set alien size
  alienSize = 50;
  
  // Create stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      color: color(random(150, 255), random(150, 255), random(150, 255), random(100, 200)),
    });
  }
}

function draw() {
  background(0);
  
  // Draw and animate stars
  for (let star of stars) {
    fill(star.color);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
    
    // Update star position
    star.x += speedX;
    
    // Wrap around edges
    if (star.x < 0) star.x = width;
  }
  
  // Draw and animate UFO
  drawUFO(ufoX, ufoY);
  animateUFO();
  
  // Draw alien
  drawAlien(ufoX, ufoY, alienSize);
}

function drawUFO(x, y) {
  fill(100);
  stroke(255);
  strokeWeight(2);
  // Body
  ellipse(x, y, 100, 30);
  // Dome
  ellipse(x, y - 15, 60, 30);
  // Windows
  fill(150, 200, 255);
  ellipse(x - 25, y - 15, 20, 20);
  ellipse(x + 25, y - 15, 20, 20);
}

function animateUFO() {
  // Oscillate UFO up and down
  ufoY += sin(frameCount * 0.05) * 2;
}

function drawAlien(x, y, size) {
  fill(0, 255, 0);
  noStroke();
  // Head
  ellipse(x, y - 20, size * 0.8, size * 0.8);
  // Eyes
  fill(0);
  ellipse(x - 10, y - 25, 10, 10);
  ellipse(x + 10, y - 25, 10, 10);
}
