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

function deplaceBalle(balle) {
  let cercle = document.getElementsByTagName("circle")[0];

  cercle.setAttribute("cx", balle.cx + "%");
  cercle.setAttribute("cy", balle.cy + "%");
}

function efface() {
  let svg = document.getElementsByTagName("svg")[0];  
  svg.innerHTML = '';
}
