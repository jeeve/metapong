//const ID = generateUUID();

let ID = 0;

register().then((data) => { 
  ID = data.id;
  setInterval(dessine, 1000);
});

function dessine() {
  console.log(ID);
  efface();
  getDecor(ID).then((data) => dessineDecor(data));
}

function dessineDecor(decor) {
  console.log(decor);

  for (let i = 0; i < decor.blocs.length; i++) {
    creeBloc(decor.blocs[i].x, decor.blocs[i].y);
  }

  creeBalle(decor.balle);
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
