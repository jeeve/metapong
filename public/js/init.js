//const ID = generateUUID();

const numeroEcran = 0;

register().then((data) => dessine(data.id));

function dessine(id) {
  console.log(id);
  getDecor(id).then((data) => dessineDecor(data));
}

function dessineDecor(decor) {
  console.log(decor);

  for (let i = 0; i < decor.blocs.length; i++) {
    creeBloc(decor.blocs[i].x, decor.blocs[i].y);
  }
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
