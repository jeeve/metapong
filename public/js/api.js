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

async function getSprite(id) {
  sprite = {};

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

  await fetch("/sprite/", init)
    .then((response) => response.json())
    .then((response) => {
      sprite = response;
    });

  return sprite;
}

function nouvelleBrique() {
 
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("/nouvellebrique/", init)
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

async function signal(id) {

  let nbEcrans = 0;

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

   await fetch("/signal/" + id, init).then(response => response.json())
   .then(response => nbEcrans = response.nbEcrans);

   return nbEcrans;
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

function Alerte() {

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("/alerte/", init);
}

function changeVitesse(dv) {

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ID,
      dv: dv
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("/vitesse/", init);
}

