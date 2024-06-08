let table;

function preload() {
  table = loadTable("Watches Sales.csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 600);
  noStroke();
}

function draw() {
  background("#F8F4E1");
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);
  text('WATCHES SALES IN A MONTH', width / 2, 30);
  textSize(14);
  textAlign(LEFT);

  // Extract data from the table
  let months = table.getColumn("Month");
  let sales = table.getColumn("Sales").map(Number);
  let profits = table.getColumn("Profit").map(Number);

  let maxSales = max(sales);
  let maxProfit = max(profits);

  let barWidth = 50;
  let barSpacing = 20;
  let chartHeight = height - 100;

  // Draw Sales Bar Chart
  textAlign(CENTER);
  fill(0);
  text("Sales", width / 4, chartHeight + 40);

  for (let i = 0; i < sales.length; i++) {
    let barHeight = map(sales[i], 0, maxSales, 0, chartHeight);
    fill(100, 150, 255);
    rect((barWidth + barSpacing) * i + 60, chartHeight - barHeight + 50, barWidth, barHeight);

    fill(0);
    text(months[i], (barWidth + barSpacing) * i + 85, chartHeight + 65);
  }

  // Draw Profit Line Chart
  text("Profit", (3 * width) / 4, chartHeight + 40);

  stroke(255, 100, 100);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let i = 0; i < profits.length; i++) {
    let x = (barWidth + barSpacing) * i + 560;
    let y = chartHeight - map(profits[i], 0, maxProfit, 0, chartHeight) + 50;
    vertex(x, y);
    fill(255, 100, 100);
    ellipse(x, y, 8, 8);
  }
  endShape();

  // Draw Profit Labels
  noStroke();
  for (let i = 0; i < profits.length; i++) {
    let x = (barWidth + barSpacing) * i + 560;
    let y = chartHeight - map(profits[i], 0, maxProfit, 0, chartHeight) + 50;
    fill(0);
    textAlign(LEFT, BOTTOM);
    text(profits[i], x + 10, y - 10);
  }
}
