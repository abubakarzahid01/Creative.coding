let img;

// To retrieve the file, we use function preload()
function preload() {
  img = loadImage('image.jpg'); // image file is stored in variable img
}

function setup() {
  createCanvas(600, 600);
  background("#6ce7b2"); // background color

  // Clip Function
  img.resize(250, 250); // resizing the image
  let cnv1 = createGraphics(250, 250); // creating sub canvas to create shape
  cnv1.noStroke(); // it removes the border of the shape

  // Create shapes: star, sun, moon, and earth
  drawStar(cnv1, 125, 50, 30, 70, 5); // Star
  drawSun(cnv1, 50, 200, 40); // Sun
  drawMoon(cnv1, 200, 200, 50); // Moon
  drawEarth(cnv1, 125, 150, 60); // Earth

  cnv1.canvas.getContext("2d").clip(); // It creates cluster of shapes in sub canvas
  cnv1.image(img, 0, 0); // it inserts the image in the cluster of shapes
  image(cnv1, 50, 50); // inserts sub canvas inside the main canvas and sets position of sub canvas

  // Mask Function
  img.resize(250, 250); // resizing the image
  let cnv2 = createGraphics(250, 250); // creating sub canvas to create a combination of multiple shapes
  cnv2.noStroke(); // it removes the border of the shape

  // Create shapes: star, sun, moon, and earth
  drawStar(cnv2, 125, 50, 30, 70, 5); // Star
  drawSun(cnv2, 50, 200, 40); // Sun
  drawMoon(cnv2, 200, 200, 50); // Moon
  drawEarth(cnv2, 125, 150, 60); // Earth

  cnv2.canvas.getContext("2d").clip();
  img.mask(cnv2); // it inserts the image in the combination of multiple shapes
  image(img, 300, 300); // inserts sub canvas inside the main canvas and sets position of sub canvas
}

function drawStar(cnv, x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  cnv.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    cnv.vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    cnv.vertex(sx, sy);
  }
  cnv.endShape(CLOSE);
}

function drawSun(cnv, x, y, radius) {
  cnv.ellipse(x, y, radius * 2);
}

function drawMoon(cnv, x, y, radius) {
  cnv.beginShape();
  cnv.arc(x, y, radius * 2, radius * 2, PI / 4, PI * 1.25);
  cnv.arc(x + radius / 2, y, radius * 1.5, radius * 1.5, PI * 1.25, PI / 4);
  cnv.endShape(CLOSE);
}

function drawEarth(cnv, x, y, radius) {
  cnv.ellipse(x, y, radius * 2);
}
