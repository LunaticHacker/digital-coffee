class Fish {
  constructor(text) {
    this.x = random(width);
    this.y = random(height);
    this.text = "On this day " + text;
    this.velocity = p5.Vector.random2D();
    this.dir = this.velocity.x > 0 ? 1 : -1;
    this.state = analysis(this.text) >= 0 ? color(255, 0, 0) : color(0, 0, 0);
    this.r = 15;
  }

  show() {
    stroke(this.state);
    fill(this.state);
    push();
    translate(this.x, this.y);
    beginShape();
    for (let i = 0; i <= 30; i += 0.1) {
      //Fish Curve -> https://mathworld.wolfram.com/FishCurve.html
      curveVertex(
        this.dir * (this.r * cos(i) - this.r * Math.pow(sin(i), 2)),
        this.r * cos(i) * sin(i)
      );
    }
    endShape();
    pop();
  }
  update() {
    if (this.x < 0 || this.x > width) {
      this.velocity.x *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.velocity.y *= -1;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (random() < 0.01) {
      this.velocity = p5.Vector.random2D();
    }
    this.dir = this.velocity.x > 0 ? 1 : -1;
  }

  intersects(x, y) {
    return dist(this.x, this.y, x, y) < this.r * 2;
  }
}
