function setup() {
  createCanvas(1000, 500);
  frameRate(60);
}

function draw() {
  background(220);

  // Car properties
  let carX = frameCount % width; // Making the car move across the screen
  let carY = height / 2;
  let carWidth = 300;
  let carHeight = 80;
  let wheelSize = 40;

  // Draw the car body
  fill(0, 0, 255); // Blue color
  
  // Draw the main body of the Lamborghini
  beginShape();
  vertex(carX, carY);
  vertex(carX + 40, carY - 40);
  vertex(carX + 120, carY - 40);
  vertex(carX + 160, carY);
  vertex(carX + carWidth, carY);
  vertex(carX + carWidth - 20, carY + carHeight);
  vertex(carX + 20, carY + carHeight);
  endShape(CLOSE);

  // Draw the car windows
  fill(0); // Black color
  beginShape();
  vertex(carX + 50, carY);
  vertex(carX + 120, carY - 30);
  vertex(carX + 150, carY - 30);
  vertex(carX + 170, carY);
  endShape(CLOSE);

  // Draw the car wheels
  fill(0); // Black color
  ellipse(carX + 60, carY + carHeight, wheelSize, wheelSize);
  ellipse(carX + 240, carY + carHeight, wheelSize, wheelSize);

  // Add some details to the wheels
  fill(255);
  ellipse(carX + 60, carY + carHeight, wheelSize / 2, wheelSize / 2);
  ellipse(carX + 240, carY + carHeight, wheelSize / 2, wheelSize / 2);

  // Add headlights
  fill(255, 255, 0); // Yellow color
  ellipse(carX + carWidth - 10, carY + 20, 16, 16);
  ellipse(carX + carWidth - 10, carY + 60, 16, 16);

  // Draw the Lamborghini logo
  fill(255, 215, 0); // Gold color for logo background
  ellipse(carX + carWidth / 2, carY + carHeight / 2, 20, 20);
  fill(0); // Black color for the logo details
  textSize(10);
  textAlign(CENTER, CENTER);
  text('L', carX + carWidth / 2, carY + carHeight / 2 - 2);
}

