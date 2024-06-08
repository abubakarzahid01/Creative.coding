let img;
let positions = [];

function preload() {
  img = loadImage("leaf.png"); // Load your image here
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  img.loadPixels();

  // Pre-generate random positions
  for (let i = 0; i < 1000; i++) {
    positions.push([int(random(img.width)), int(random(img.height))]);
  }
}

function draw() {
  for (let i = 0; i < 10; i++) { // Draw multiple shapes per frame
    if (positions.length > 0) {
      let pos = positions.pop();
      let x = pos[0];
      let y = pos[1];
      drawWatercolorShape(x, y);
    }
  }

  if (positions.length == 0) {
    noLoop(); // Stop the draw loop when all positions are used
  }
}

function drawWatercolorShape(x, y) {
  // Ensure coordinates are within image bounds
  if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
    let index = (x + y * img.width) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let a = img.pixels[index + 3];

    // Draw shape with sampled color
    fill(r, g, b, 50);

    // Use rect as an alternative shape
    rect(x, y, random(20, 50), random(20, 50));
  }
}
