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

  console.log(estModifie);
  return estModifie;
}


