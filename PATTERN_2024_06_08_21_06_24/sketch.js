let numX, numY;
let modSize;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100); // Background Color in HSB
  noStroke();
  numX = 10;
  numY = 20;
  modSize = windowWidth / numX;
}

function draw() {
  background(0, 0, 100);
  for (let y = 0; y < numY; y++) {
    for (let x = 0; x < numX; x++) {
      push();
      translate(x * modSize + modSize / 2, y * modSize + modSize / 2);
      let n = int(random(0, 4));
      rotate(radians(n * 90));
      egyptianSymbol(); // Call the Egyptian symbol function
      pop();
    }
  }
  noLoop(); // Run draw() function only once
}

function mousePressed() {
  loop(); // Allow redraw when mouse is pressed
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*-------Egyptian Symbol Function-------*/
function egyptianSymbol() {
  // Define Egyptian symbols with variations in colors and patterns
  let symbolType = int(random(0, 3));
  let color1 = color(random(30, 50), random(50, 100), random(70, 100));
  let color2 = color(random(30, 50), random(50, 100), random(70, 100));

  if (symbolType === 0) {
    // Ankh (Key of Life)
    fill(color1);
    rect(-modSize / 4, -modSize / 2, modSize / 2, modSize);
    ellipse(0, -modSize / 4, modSize / 2, modSize / 2);
    rect(-modSize / 8, -modSize / 4, modSize / 4, modSize / 2);
  } else if (symbolType === 1) {
    // Eye of Horus
    fill(color1);
    ellipse(0, 0, modSize * 0.8, modSize * 0.8);
    fill(color2);
    ellipse(0, 0, modSize * 0.6, modSize * 0.6);
  } else {
    // Scarab Beetle
    fill(color1);
    ellipse(0, 0, modSize * 0.8, modSize * 0.6);
    fill(color2);
    ellipse(0, 0, modSize * 0.4, modSize * 0.3);
    triangle(-modSize / 4, -modSize / 6, 0, -modSize / 3, modSize / 4, -modSize / 6);
  }

  // Add some details to the symbol
  fill(color2);
  ellipse(0, 0, modSize * 0.3, modSize * 0.3);
}
