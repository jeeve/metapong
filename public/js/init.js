let ID = 0;console

document.querySelector("#bouton-init").addEventListener("click", init);

register().then((data) => {
  ID = data.id;
  document.querySelector("#numero-ecran").innerHTML = ID;
  getDecor(ID).then((data) => dessineDecor(data));
  setInterval(avanceTemps, 10);
});

function init() {
  initNbEcrans(1);
  ID = 1;
  document.querySelector("#numero-ecran").innerHTML = ID;
  getDecor(ID).then((data) => dessineDecor(data));
}

function avanceTemps() {
  getBalle(ID).then((data) => deplaceBalle(data));
  afficheScore();
}

function dessineDecor(decor) {
  efface();
  for (let i = 0; i < decor.blocs.length; i++) {
    creeBloc(decor.blocs[i].x, decor.blocs[i].y);
  }
  creeBalle(decor.balle);
  creeRaquette(decor.raquette);
}

function creeRaquette(raquette) {
  raquette.forEach(function (blocRaquette) {
    creeBlocRaquette(blocRaquette.x, blocRaquette.y);
  });
}

function raffraichitDecor() {
  tagDecorEstModifie(ID).then((data) => {
    if (data.tag) {
      getDecor(ID).then((data) => dessineDecor(data));
    }
  });
  signal(ID);
  idEcranAChange(ID).then((data) => {
    if (data.aChange) {
      console.log(ID);
      ID = data.nouvelIdEcran;
    }
  });
}

setInterval(raffraichitDecor, 5000);

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowDown") {
    deplaceRaquette(-5);
    metAJourRaquette(ID);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowUp") {
    deplaceRaquette(+5);
    metAJourRaquette(ID);
  }
});
