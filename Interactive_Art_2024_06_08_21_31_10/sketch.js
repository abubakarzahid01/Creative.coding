let textX, textY;
let galaxyImage;
let points = [];
let mult = 0.005;

function preload() {
  galaxyImage = loadImage('Galaxy.jpg'); // Load your galaxy image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);
  let density = 50;
  let space = width / density;
  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }
  
  textX = width / 2;
  textY = height / 2;
  textAlign(CENTER, CENTER);
}

function draw() {
  // Apply galaxy background effect
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let c = galaxyImage.get(x % galaxyImage.width, y % galaxyImage.height);
      fill(c);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
  
  // Display the text
  fill(255);
  textSize(40);
  text("Bath Spa", textX, textY - 20);
  text("University", textX, textY + 20);
  
  // Draw the points
  noStroke();
  for (let i = 0; i < points.length; i++) {
    let r = map(i, 0, points.length, 0, width);
    let g = map(i, 0, points.length, width, 0);
    let b = map(i, 0, points.length, 255, 50);
    fill(r, g, b);
    let angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
    points[i].add(createVector(cos(angle), sin(angle)));
    ellipse(points[i].x, points[i].y, 1);
  }
}