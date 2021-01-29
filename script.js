let bubbles = [];
let fishes = [];
let p;
let index = null;
let afinn;
let canvas;
let isg = false;
function preload() {
  afinn = loadJSON("afinn.json");
}

async function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  p = createP("On this day");
  p.position(width / 2, height / 2);
  p.addClass("thought");
  p.addClass("bubble");
  p.id("p");
  p.hide();
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
  for (let i = 0; i < items.length - 6; i++) {
    let darray = items[i].textContent.split(/(\(d\.\s\d{4}\))/);
    let barray = items[i].textContent.split(/(\(b\.\s\d{4}\))/);
    if (darray.length > 1) items[i].textContent = darray[0] + "Died";
    if (barray.length > 1) items[i].textContent = barray[0] + "was Born";
    fishes.push(new Fish(items[i].textContent));
  }
}

function draw() {
  background(0, 255, 255);
  for (let fish of fishes) {
    fish.show();
    fish.update();
    if (fishes.indexOf(fish) == index)
      p.position(
        fish.x,
        fish.y - document.getElementById("p").clientHeight - 80
      );
  }
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
function grdFill(x1, y1, x2, y2, state) {
  //I have no idea how this works the line was supposed to be used as a debug tool, now it won't work without it :)
  let ctx = canvas.canvas.getContext("2d");
  let grd = ctx.createLinearGradient(x1, y1, x2, y2);
  strokeWeight(0);
  stroke(0);
  line(x1, y1, x2, y2);
  switch (state) {
    case "p":
      grd.addColorStop(1, "violet");
      grd.addColorStop(0.9, "indigo");
      grd.addColorStop(0.7, "blue");
      grd.addColorStop(0.5, "green");
      grd.addColorStop(0.4, "yellow");
      grd.addColorStop(0.2, "orange");
      grd.addColorStop(0, "red");

      break;
    case "s":
      grd.addColorStop(0, "violet");
      grd.addColorStop(0.2, "indigo");
      grd.addColorStop(0.4, "blue");
      grd.addColorStop(0.5, "green");
      grd.addColorStop(0.7, "yellow");
      grd.addColorStop(0.9, "orange");
      grd.addColorStop(1, "red");
      break;
  }

  ctx.fillStyle = grd;
  ctx.fill();
}
