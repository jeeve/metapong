let ID = 0;

document.querySelector("#bouton-init").addEventListener("click", init);

register().then((data) => {
  ID = data.id;
  document.querySelector('#numero-ecran').innerHTML = ID;
  getDecor(ID).then((data) => dessineDecor(data));
  setInterval(avanceTemps, 10);
});

function init() {
  initNbEcrans(1);
  ID = 1;
  document.querySelector('#numero-ecran').innerHTML = ID;
  document.querySelector('svg').innerHTML = '';
  getDecor(ID).then((data) => dessineDecor(data));
}

function avanceTemps() {
  let balle = {};
  getBalle(ID).then((data) => deplaceBalle(data));
}

function dessineDecor(decor) {
  for (let i = 0; i < decor.blocs.length; i++) {
    creeBloc(decor.blocs[i].x, decor.blocs[i].y);
  }
  creeBalle(decor.balle);
}
