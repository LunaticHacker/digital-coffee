let bubbles = [];
let fishes = [];
let guppy_right;
let guppy_left;
let p;
let index = null;

function preload() {
  guppy_right = loadImage("guppy_right.png");
  guppy_left = loadImage("guppy_left.png");
}

async function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  p = createP("On this day");
  p.position(width / 2, height / 2);
  p.addClass("thought");
  p.addClass("bubble");
  p.id("p");
  p.hide();
  for (let i = 0; i < 100; i++) {
    bubbles.push(
      new Bubble(random(width), random(height, height * 2), random(10))
    );
  }
  let response = await fetch(
    "https://en.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&origin=*"
  );
  let str = await response.text();
  let xml = new window.DOMParser().parseFromString(str, "text/xml");
  let fdoc = new window.DOMParser().parseFromString(
    xml.childNodes[0].textContent,
    "text/html"
  );
  let divs = fdoc.getElementsByClassName("mw-parser-output");
  let doc = new window.DOMParser().parseFromString(
    divs[divs.length - 1].innerHTML,
    "text/html"
  );
  let items = doc.getElementsByTagName("li");
  //fishes.push(doc)
  //console.log(doc.getElementsByTagName("li"));
  for (let i = 0; i < items.length - 6; i++) {
    fishes.push(new Fish(items[i].textContent));
  }
}

function draw() {
  background(0, 255, 255);
  for (bubble of bubbles) {
    bubble.show();
    bubble.update();
  }
  for (let fish of fishes) {
    fish.show();
    fish.update();
    if (fishes.indexOf(fish) == index)
      p.position(
        fish.x,
        fish.y - document.getElementById("p").clientHeight - 80
      );
  }
  fill(255, 0, 0);
}
function mousePressed() {
  for (let fish of fishes) {
    if (fish.intersects(mouseX, mouseY)) {
      p.html(fish.text);
      p.show();
      index = fishes.indexOf(fish);
      break;
    }
  }
}
