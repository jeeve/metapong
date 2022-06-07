async function register() {

  let id = 0;

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/register/", init).then(response => response.json())
  .then(response => { id = response });

  return id;
}

function initNbEcrans(nbEcrans) {
  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };
  fetch("/init/" + nbEcrans, init);
}

async function getDecor(id) {
  decor = {};

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/render/", init)
    .then((response) => response.json())
    .then((response) => {
      decor = response;
    });

  return decor;
}

async function getBalle(id) {
  balle = {};

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/balle/", init)
    .then((response) => response.json())
    .then((response) => {
      balle = response;
    });

  return balle;
}

function metAJourRaquette(id) {
  let raquette = []; 
  let blocsRaquette = document.querySelectorAll('.raquette');
  blocsRaquette.forEach(function (bloc) {
    let x = Number(bloc.getAttribute('x').replace('%', ''));
    let y = Number(bloc.getAttribute('y').replace('%', ''));
    raquette.push( {x: x + (id-1) * 100, y: y} );    
  });

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      raquette: raquette
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("/metajourraquette/", init);
}

async function tagDecorEstModifie(id) {
  let estModifie = { tag: false };

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/decorestmodifie/" + id, init)
  .then((response) => response.json())
  .then((response) => {
    estModifie.tag = response.tag;
  });

  return estModifie;
}

async function getScore() {

  let score = {};

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/score/", init).then(response => response.json())
  .then(response => score = response );

  return score;
}

function signal(id) {

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

   fetch("/signal/" + id, init);
}

async function idEcranAChange(id) {

  let etat = {};

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("/idecranachange/" + id , init).then(response => response.json())
  .then(response => etat = response );

  return etat;
}


