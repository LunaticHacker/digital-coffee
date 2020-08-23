class Fish {
  constructor(text) {
    this.x = random(width);
    this.y = random(height);
    this.text = text;
    this.velocity = p5.Vector.random2D();
    this.right = this.velocity.x > 0;
    this.r = 15;
  }

  show() {
    fill(255);
    imageMode(CENTER);
    if (this.right) image(guppy_right, this.x, this.y, this.r * 2, this.r * 2);
    else image(guppy_left, this.x, this.y, this.r * 2, this.r * 2);
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
    this.right = this.velocity.x > 0;
  }

  intersects(x, y) {
    return dist(this.x, this.y, x, y) < this.r * 2;
  }
}
