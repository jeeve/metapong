let ID = 0;
let alerte = false;

document.querySelector("#bouton-init").addEventListener("click", init);

register().then((data) => {
  ID = data.id;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    document.querySelector("#nombre-ecrans").innerHTML = " / " + data;
  });
  getDecor(ID).then((data) => dessineDecor(data));
  setInterval(avanceTemps, 10);
});

function init() {
  initNbEcrans(1);
  ID = 1;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    document.querySelector("#nombre-ecrans").innerHTML = " / " + data;
  });
  afficheScore();
  getDecor(ID).then((data) => dessineDecor(data));
}

function avanceTemps() {
  getSprite(ID).then((data) => {
    deplaceBalle(data.balle);
    if (!alerte && data.alerte) {
      document.querySelector("body").style.visibility = "hidden";
    }
    if (alerte && !data.alerte) {
      document.querySelector("body").style.visibility = "visible";
    }
    alerte = data.alerte;
    if (data.briques != undefined) {
      data.briques.forEach((brique) => { creeBrique(brique.x, brique.y); });
    }
  });
  afficheScore();
}

function dessineDecor(decor) {
  if (decor != undefined) {
    efface();
    for (let i = 0; i < decor.blocs.length; i++) {
      creeBloc(decor.blocs[i].x, decor.blocs[i].y);
    }
    creeBalle(decor.balle);
    creeRaquette(decor.raquette);
  }
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
    document.querySelector("#nombre-ecrans").innerHTML = " / " + data;
  });
  idEcranAChange(ID).then((data) => {
    if (data.aChange) {
      console.log(ID);
      ID = data.id;
      document.querySelector("#numero-ecran").innerHTML = ID;
      signal(ID).then((data) => {
        document.querySelector("#nombre-ecrans").innerHTML = " / " + data;
      });
      getDecor(ID).then((data) => dessineDecor(data));
    }
  });
}

setInterval(raffraichitDecor, 5000);

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowDown") {
    if (positionRaquette() + tailleRaquette() * 5 < 95) {
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
  if (event.code == "NumpadAdd") {
    changeVitesse(1.2);
  }
  if (event.code == "NumpadSubtract") {
    changeVitesse(0.8);
  }
  if (event.code == "Space") {
    Alerte();
  }
  if (event.code == "Insert") {
    nouvelleBrique();
  }
  if (event.code == "F1") {
    event.preventDefault();
    window.open('https://github.com/jeeve/metapong', '_blank');
  }
});

document.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    if (positionRaquette() + tailleRaquette() * 5 < 95) {
      deplaceRaquette(-event.deltaY / 50);
      metAJourRaquette(ID);
    }
  }
  if (event.deltaY < 0) {
    if (positionRaquette() > 5) {
      deplaceRaquette(-event.deltaY / 50);
      metAJourRaquette(ID);
    }
  }
});
