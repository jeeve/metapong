function creeBloc(x, y, classe) {
  var svg = document.getElementsByTagName("svg")[0];

  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("class", classe);
  rect.setAttribute("x", x + "%");
  rect.setAttribute("y", y + "%");
  rect.setAttribute("width", "5%");
  rect.setAttribute("height", "5%");
  rect.setAttribute("fill", "white");
  rect.setAttribute("stroke", "white");

  svg.appendChild(rect);
}

function creeBlocRaquette(x, y) {
  var svg = document.getElementsByTagName("svg")[0];

  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("class", "raquette");
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
  cercle.setAttribute("class", "balle");
  cercle.setAttribute("cx", balle.cx + "%");
  cercle.setAttribute("cy", balle.cy + "%");
  cercle.setAttribute("r", "1%");
  cercle.setAttribute("fill", "white");

  svg.appendChild(cercle);
}

function deplaceBalle(balle) {
  if (balle != undefined) {
    let cercle = document.getElementsByTagName("circle")[0];

    cercle.setAttribute("cx", balle.cx + "%");
    cercle.setAttribute("cy", balle.cy + "%");
  }
}

function deplaceRaquette(dy) {
  let blocsRaquette = document.querySelectorAll(".raquette");
  blocsRaquette.forEach(function (bloc) {
    let y = Number(bloc.getAttribute("y").replace("%", ""));
    bloc.setAttribute("y", y - dy + "%");
  });
}

function efface() {
  let svg = document.getElementsByTagName("svg")[0];
  svg.innerHTML = "";
}

function afficheScore() {
  getScore().then(function (score) {
    document.querySelector("#score").innerHTML = score.a + " - " + score.b;
  });
}

function tailleRaquette() {
  return document.querySelectorAll(".raquette").length;
}

function positionRaquette() {
  let ymin = Infinity;
  let blocsRaquette = document.querySelectorAll(".raquette");
  blocsRaquette.forEach(function (bloc) {
    let y = Number(bloc.getAttribute("y").replace("%", ""));
    if (y < ymin) {
      ymin = y;
    }
  });
  return ymin;
}

function supprimeBloc(x, y, classe) {
  document.querySelectorAll('.' + classe).forEach(e => {
    let bx = Number(e.getAttribute('x').replace("%", ""));
    let by = Number(e.getAttribute('y').replace("%", ""));
    if (bx == x && by == y) {
      e.remove();
    }
  });
}