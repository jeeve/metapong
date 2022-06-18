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

function creeRaquette(raquette) {
  raquette.forEach(function (blocRaquette) {
    creeBlocRaquette(blocRaquette.x, blocRaquette.y);
  });
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
  return document.querySelectorAll(".raquette").length + 4;
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
  document.querySelectorAll("." + classe).forEach((e) => {
    let bx = Number(e.getAttribute("x").replace("%", ""));
    let by = Number(e.getAttribute("y").replace("%", ""));
    if (bx == x && by == y) {
      e.remove();
    }
  });
}

function coloreMur(classe) {
  document.querySelectorAll("." + classe).forEach((elt) => {
    elt.classList.add("touche");
  });
  if (classe == "gauche") {
    setTimeout(initCouleurMurGauche, 100);
  }
  if (classe == "droit") {
    setTimeout(initCouleurMurDroit, 100);
  }
}

function initCouleurMurGauche() {
  document.querySelectorAll(".gauche").forEach((elt) => {
    elt.classList.remove("touche");
  });
}

function initCouleurMurDroit() {
  document.querySelectorAll(".droit").forEach((elt) => {
    elt.classList.remove("touche");
  });
}

function bougeRaquette(dy) {
  if (dy < 0) {
    const ymax = 95;
    if (positionRaquette() + tailleRaquette() < ymax) {
      if (positionRaquette() + tailleRaquette() >= ymax - 5) {
        deplaceRaquette(-(ymax - (positionRaquette() + tailleRaquette())));
      } else {
        deplaceRaquette(dy);
      }
      metAJourRaquette(ID);
    }
  }
  if (dy > 0) {
    const ymin = 5;
    if (positionRaquette() > ymin) {
      if (positionRaquette() <= ymin + 5) {
        deplaceRaquette(+(positionRaquette() - ymin));
      } else {
        deplaceRaquette(dy);
      }
      metAJourRaquette(ID);
    }
  }
}

function positionBalle() {
  let cercle = document.querySelector("circle");
  let x = Number(cercle.getAttribute("cx").replace("%", ""));
  let y = Number(cercle.getAttribute("cy").replace("%", ""));
  return { x: x, y: y };
}

function raquetteAuto() {
  if (document.querySelector("#auto-mode").checked) {
    let b = positionBalle();
    let xb = b.x;
    if (Math.abs(xb - 50) < 20) {
      let yb = b.y;
      let yr = positionRaquette() + tailleRaquette() / 2;

      if (yr < yb) {
        bougeRaquette(-5);
      }
      if (yr > yb) {
        bougeRaquette(+5);
      }
    }
  }
}
