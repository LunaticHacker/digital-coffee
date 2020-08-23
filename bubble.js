class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.d = r * 2;
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(2);

    ellipse(this.x, this.y, this.d);
  }
  update() {
    if (this.y <= 0) {
      this.y = random(height, height * 2);
    }
    this.y -= 0.5;
  }
}
