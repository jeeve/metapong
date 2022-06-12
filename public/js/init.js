let ID = 0;
let alerte = false;

document.querySelector("#bouton-init").addEventListener("click", init);

register().then((data) => {
  ID = data.id;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    document.querySelector("#nombre-ecrans").innerHTML = ' / ' + data;
  });
  getDecor(ID).then((data) => dessineDecor(data));
  setInterval(avanceTemps, 10);
});

function init() {
  initNbEcrans(1);
  ID = 1;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    document.querySelector("#nombre-ecrans").innerHTML = ' / ' + data;
  });
  afficheScore();
  getDecor(ID).then((data) => dessineDecor(data));
}

function avanceTemps() {
  getBalle(ID).then((data) => {
    deplaceBalle(data);
    if (!alerte && data.alerte) {
      document.querySelector('body').style.visibility = 'hidden';
    }
    if (alerte && !data.alerte) {
      document.querySelector('body').style.visibility = 'visible';
    }
    alerte = data.alerte;
  });
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
  signal(ID).then((data) => {
    document.querySelector("#nombre-ecrans").innerHTML = ' / ' + data;
  });
  idEcranAChange(ID).then((data) => {
    if (data.aChange) {
      console.log(ID);
      ID = data.id;
      document.querySelector("#numero-ecran").innerHTML = ID;
      signal(ID).then((data) => {
        document.querySelector("#nombre-ecrans").innerHTML = ' / ' + data;
      });
      getDecor(ID).then((data) => dessineDecor(data));
    }
  });
}

setInterval(raffraichitDecor, 5000);

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowDown") {
    if (positionRaquette() + tailleRaquette()*5 < 95) {
      deplaceRaquette(-5);
      metAJourRaquette(ID);
    }
  }
  if (event.code == "ArrowUp") {
    if (positionRaquette() > 5) {
      deplaceRaquette(+5);
      metAJourRaquette(ID);
    }
  }
  if (event.code == "Space") {
    Alerte();
  }
});


document.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    if (positionRaquette() + tailleRaquette()*5 < 95) {   
      deplaceRaquette(-event.deltaY / 50);
      metAJourRaquette(ID);
    }
  }
  if (event.deltaY < 0) {
    if (positionRaquette() > 5)  {   
      deplaceRaquette(-event.deltaY / 50);
      metAJourRaquette(ID);
    }
  }
});
