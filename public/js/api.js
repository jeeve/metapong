async function register() {

  let id = 0;

  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("http://localhost:5500/register/", init).then(response => response.json())
  .then(response => { id = response });

  return id;
}

function initNbEcrans(nbEcrans) {
  const init = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  };
  fetch("http://localhost:5500/init/" + nbEcrans, init);
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

  await fetch("http://localhost:5500/render/", init)
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

  await fetch("http://localhost:5500/balle/", init)
    .then((response) => response.json())
    .then((response) => {
      balle = response;
    });

  return balle;
}


