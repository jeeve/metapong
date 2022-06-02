//const ID = generateUUID();

const numeroEcran = 0;

register().then((data) => dessine(data.id));

function dessine(id) {
  getDecor(id).then((data) => dessineDecor(data));
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

  await fetch("http://localhost:5500/decor/", init)
    .then((response) => response.json())
    .then((response) => {
      decor = JSON.stringify(response);
    });

  return decor;
}

function dessineDecor(decor) {
  document.querySelector("#ecran").innerHTML = decor;
}

/*
notifieServeur("init");

creeMurHorizontal(0);
creeMurHorizontal(95);
creeMurVertical(0);
creeMurVertical(95);
creeBloc(60, 50);

setInterval(avanceTemps, 10);
*/
