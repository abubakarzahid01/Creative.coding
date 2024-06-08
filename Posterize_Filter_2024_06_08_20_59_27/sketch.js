let img;

function preload() {
  img = loadImage("leaf.png"); // Load your image here
}

function setup() {
  createCanvas(400, 400);
  noLoop();
  img.loadPixels();
}

function draw() {
  background(0);
  image(img, 0, 0);

  // Dithering effect based on mouseX
  let d = map(mouseX, 0, width, 2, 50);

  // Create dithered image
  let ditheredImg = createDitheredImage(img, d);
  image(ditheredImg, 0, 0);
}

function createDitheredImage(img, d) {
  let ditheredImg = createImage(img.width, img.height);
  ditheredImg.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      // Convert pixel to grayscale
      let avg = (r + g + b) / 3;

      // Apply threshold to create dithering effect
      let threshold = (x % d) / d * 255;
      let newColor = avg > threshold ? 255 : 0;

      // Set the dithered pixel
      ditheredImg.pixels[index] = newColor;
      ditheredImg.pixels[index + 1] = newColor;
      ditheredImg.pixels[index + 2] = newColor;
      ditheredImg.pixels[index + 3] = a;
    }
  }

  ditheredImg.updatePixels();
  return ditheredImg;
}

function mouseMoved() {
  redraw(); // Redraw the canvas when the mouse is moved
}
