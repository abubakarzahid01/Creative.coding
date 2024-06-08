let rocket;
let asteroids = [];
let lasers = [];
let score = 0;
let gameState = "start";
let health = 3;

function setup() {
    createCanvas(windowWidth, 600);
    rocket = new Rocket();
    for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);

    if (gameState === "start") {
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Press Enter to Start", width / 2, height / 2);
    } else if (gameState === "play") {
        rocket.show();
        rocket.move();

        for (let i = 0; i < asteroids.length; i++) {
            asteroids[i].show();
            asteroids[i].move();
            if (rocket.hits(asteroids[i])) {
                health--;
                asteroids.splice(i, 1);
                asteroids.push(new Asteroid());
                if (health <= 0) {
                    gameState = "gameOver";
                }
            }
        }

        for (let i = lasers.length - 1; i >= 0; i--) {
            lasers[i].show();
            lasers[i].move();
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    score += 10;
                    asteroids.splice(j, 1);
                    asteroids.push(new Asteroid());
                    lasers.splice(i, 1);
                    break;
                }
            }
            if (lasers[i] && lasers[i].offScreen()) {
                lasers.splice(i, 1);
            }
        }

        fill(255);
        textSize(24);
        text("Score: " + score, 50, 50);
        text("Health: " + health, 50, 80);

    } else if (gameState === "gameOver") {
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2 - 20);
        text("Score: " + score, width / 2, height / 2 + 20);
        textSize(24);
        text("Press R to Restart", width / 2, height / 2 + 60);
    }
}

function keyPressed() {
    if (keyCode === ENTER && gameState === "start") {
        gameState = "play";
    }

    if (keyCode === RIGHT_ARROW) {
        rocket.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        rocket.setDir(-1);
    }

    if (key === ' ') {
        lasers.push(new Laser(rocket.x, height));
    }

    if (key === 'r' && gameState === "gameOver") {
        resetGame();
    }
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        rocket.setDir(0);
    }
}

function resetGame() {
    score = 0;
    health = 3;
    asteroids = [];
    lasers = [];
    for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
    gameState = "start";
}

class Rocket {
    constructor() {
        this.x = width / 2;
        this.y = height - 20;
        this.xdir = 0;
    }

    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, 20, 60);
    }

    setDir(dir) {
        this.xdir = dir;
    }

    move() {
        this.x += this.xdir * 5;
    }

    hits(asteroid) {
        let d = dist(this.x, this.y, asteroid.x, asteroid.y);
        return d < asteroid.r + 10;
    }
}

class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 4;
    }

    show() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    move() {
        this.y = this.y - 10;
    }

    offScreen() {
        return this.y < 0;
    }

    hits(asteroid) {
        let d = dist(this.x, this.y, asteroid.x, asteroid.y);
        return d < this.r + asteroid.r;
    }
}

class Asteroid {
    constructor() {
        this.x = random(width);
        this.y = random(-100, -50);
        this.r = random(15, 50);
        this.speed = random(1, 3);
    }

    show() {
        fill(127);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    move() {
        this.y += this.speed;
        if (this.y > height + this.r) {
            this.y = random(-100, -50);
            this.x = random(width);
        }
    }
}
