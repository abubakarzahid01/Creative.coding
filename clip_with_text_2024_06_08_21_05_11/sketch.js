function setup() {
  createCanvas(500, 500);
  background(30, 150, 200); // unique background color

  let cnv3 = createGraphics(width, height); // creating sub canvas to create text inside the shape
  cnv3.noStroke(); // it removes the border of the shape

  // Create a gradient fill for the shape
  let gradient = cnv3.drawingContext.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'purple');
  gradient.addColorStop(1, 'orange');
  cnv3.drawingContext.fillStyle = gradient;

  // Create a pentagon shape
  cnv3.beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI / 5 * i - HALF_PI;
    let x = 150 + cos(angle) * 100;
    let y = 200 + sin(angle) * 100;
    cnv3.vertex(x, y);
  }
  cnv3.endShape(CLOSE);

  cnv3.erase(); // it erases the text part in the shape
  cnv3.fill(30, 150, 200); // set text color to match background
  cnv3.textSize(30); // font size
  cnv3.textAlign(CENTER, CENTER); // center the text
  cnv3.text('Bath', 150, 180); // inserts the text and sets the position of the text 
  cnv3.text('Spa', 150, 220); // inserts the text and sets the position of the text 
  cnv3.noErase();

  image(cnv3, 75, 100); // inserts sub canvas inside the main canvas and sets position of sub canvas 
}
