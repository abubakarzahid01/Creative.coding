var img, x, y;

function preload() {

img = loadImage("leaf.png")

}



function setup() {

createCanvas (400, 400);

background(0);

noStroke();

}



function draw() {

background(0);

x = mouseX;

y = mouseY;

image( img, 0, 0);

var c = get(x, y);

fill(c);
let size = 100;
  triangle(x, y - size / 2, x - size / 2, y + size / 2, x + size / 2, y + size / 2);


}