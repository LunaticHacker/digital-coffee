class Fish {
  constructor(text) {
    this.x = random(width);
    this.y = random(height);
    this.text = "On this day " + text;
    this.velocity = p5.Vector.random2D();
    this.dir = this.velocity.x > 0 ? "right" : "left";
    this.state = analysis(this.text) >= 0 ? "normal" : "sick";
    this.r = 15;
  }

  show() {
    fill(255);
    imageMode(CENTER);
    image(
      guppy,
      this.x,
      this.y,
      this.r * 2,
      this.r * 2,
      guppy_json[this.state][this.dir],
      0,
      this.r * 2,
      this.r * 2
    );
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
    this.dir = this.velocity.x > 0 ? "right" : "left";
  }

  intersects(x, y) {
    return dist(this.x, this.y, x, y) < this.r * 2;
  }
}
