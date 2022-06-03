//setInterval(avanceTemps, 10);

function blocEn(x, y) {
  let OK = false;
  const blocs = document.querySelectorAll("rect");
  blocs.forEach(function (bloc) {
    let xb = parseFloat(bloc.getAttribute("x"));
    let yb = parseFloat(bloc.getAttribute("y"));
    if (distance(xb + 5 / 2, yb + 5 / 2, x, y) <= 5 / 2) {
      OK = true;
      return;
    }
  });
  return OK;
}
/*
function avanceTemps() {
  const balle = document.querySelector("circle");
  let vx = parseFloat(balle.getAttribute("vx"));
  let vy = parseFloat(balle.getAttribute("vy"));

  let x1 = parseFloat(balle.getAttribute("cx"));
  let y1 = parseFloat(balle.getAttribute("cy"));

  if (blocEn(x1 + 1 / 2 + vx, y1 + 1 / 2)) {
    vx = -vx;
  } else {
    if (blocEn(x1 + 1 / 2, y1 + 1 / 2 + vy)) {
      vy = -vy;
    }
  }

  let x2 = x1 + vx;
  let y2 = y1 + vy;
  balle.setAttribute("cx", x2 + "%");
  balle.setAttribute("cy", y2 + "%");
  balle.setAttribute("vx", vx);
  balle.setAttribute("vy", vy);
}
*/
function creeBloc(x, y) {
  var svg = document.getElementsByTagName("svg")[0];

  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x + "%");
  rect.setAttribute("y", y + "%");
  rect.setAttribute("width", "5%");
  rect.setAttribute("height", "5%");
  rect.setAttribute("fill", "white");
  rect.setAttribute("stroke", "white");

  svg.appendChild(rect);
}

function creeBalle(balle) {
  let svg = document.getElementsByTagName("svg")[0];

  let cercle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  cercle.setAttribute("cx", balle.cx + "%");
  cercle.setAttribute("cy", balle.cy + "%");
  cercle.setAttribute("r", "1%");
  cercle.setAttribute("fill", "white");

  svg.appendChild(cercle);
}

function creeMurHorizontal(y) {
  for (let i = 0; i < 20; i++) {
    creeBloc(i * 5, y);
  }
}

function creeMurVertical(x) {
  for (let i = 0; i < 20; i++) {
    creeBloc(x, i * 5);
  }
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
