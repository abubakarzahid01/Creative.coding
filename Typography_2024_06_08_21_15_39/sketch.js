let font;
let shapes = [];

function preload() {
  font = loadFont('Oswald-VariableFont_wght.ttf'); // Ensure the path is correct
}

function setup() {
  createCanvas(600, 400);
  noStroke();

  // Generate points for the text
  let points1 = font.textToPoints('BATH SPA', 50, 150, 60, { sampleFactor: 0.2 });
  let points2 = font.textToPoints('UNIVERSITY', 50, 250, 50, { sampleFactor: 0.2 });

  // Create random shapes for each point of the first text
  for (let i = 0; i < points1.length; i++) {
    let p = points1[i];
    let shape = createShape(p.x, p.y);
    shapes.push(shape);
  }

  // Create random shapes for each point of the second text
  for (let j = 0; j < points2.length; j++) {
    let q = points2[j];
    let shape = createShape(q.x, q.y);
    shapes.push(shape);
  }
}

function draw() {
  background("#22253C"); // Clear the background in each frame

  // Draw shapes
  for (let k = 0; k < shapes.length; k++) {
    let s = shapes[k];
    drawShape(s);
    updateShapeColor(s); // Update the shape color over time
    updateShapeSize(s);  // Update the shape size for pulsing effect
  }
}

// Function to create a shape
function createShape(x, y) {
  let shapeType = int(random(0, 3)); // Randomly choose a shape type
  let shapeSize = random(2, 5); // Randomize size
  let shapeColor = color(random(255), random(255), random(255)); // Randomize color
  let originalSize = shapeSize; // Store original size for pulsing effect

  return {
    x: x,
    y: y,
    type: shapeType,
    size: shapeSize,
    color: shapeColor,
    originalSize: originalSize,
    pulseSpeed: random(0.01, 0.05), // Randomize pulse speed
    pulseOffset: random(TWO_PI) // Randomize pulse offset
  };
}

// Function to draw a shape
function drawShape(shape) {
  fill(shape.color);

  switch (shape.type) {
    case 0:
      ellipse(shape.x, shape.y, shape.size, shape.size);
      break;
    case 1:
      rect(shape.x, shape.y, shape.size, shape.size);
      break;
    case 2:
      triangle(shape.x, shape.y, shape.x + shape.size, shape.y, shape.x + shape.size / 2, shape.y - shape.size);
      break;
    // Add more cases for additional shape types if desired
  }
}

// Function to update a shape's color
function updateShapeColor(shape) {
  shape.color = color(
    (red(shape.color) + 1) % 256,
    (green(shape.color) + 1) % 256,
    (blue(shape.color) + 1) % 256
  );
}

// Function to update a shape's size for pulsing effect
function updateShapeSize(shape) {
  shape.size = shape.originalSize + sin(frameCount * shape.pulseSpeed + shape.pulseOffset) * shape.originalSize * 0.2;
}
