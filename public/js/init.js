let ID = 0;
let nbEcrans = 0;
let alerte = false;

document.querySelector("#bouton-init").addEventListener("click", init);

register().then((data) => {
  ID = data.id;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    nbEcrans = data;
    document.querySelector("#nombre-ecrans").innerHTML = " / " + nbEcrans;
  });
  getDecor(ID).then((data) => dessineDecor(data));
  setInterval(avanceTemps, 10);
});

function init() {
  initNbEcrans(1);
  ID = 1;
  document.querySelector("#numero-ecran").innerHTML = ID;
  signal(ID).then((data) => {
    nbEcrans = data;
    document.querySelector("#nombre-ecrans").innerHTML = " / " + nbEcrans;
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
      data.briques.forEach((brique) => creeBloc(brique.x, brique.y, "brique"));
    }
    if (data.briquesMortes != undefined) {
      data.briquesMortes.forEach((brique) =>
        supprimeBloc(brique.x, brique.y, "brique")
      );
    }
    if (ID == 1 || ID == nbEcrans) {
      if (data.perdu == "gauche") {
        coloreMur("gauche");
      }
      if (data.perdu == "droit") {
        coloreMur("droit");
      }
    }
  });
  afficheScore();
}

function dessineDecor(decor) {
  if (decor != undefined) {
    efface();
    decor.blocs.forEach((bloc) => creeBloc(bloc.x, bloc.y, bloc.classe));
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
    nbEcrans = data;
    document.querySelector("#nombre-ecrans").innerHTML = " / " + nbEcrans;
  });
  idEcranAChange(ID).then((data) => {
    if (data.aChange) {
      console.log(ID);
      ID = data.id;
      document.querySelector("#numero-ecran").innerHTML = ID;
      signal(ID).then((data) => {
        nbEcrans = data;
        document.querySelector("#nombre-ecrans").innerHTML = " / " + nbEcrans;
      });
      getDecor(ID).then((data) => dessineDecor(data));
    }
  });
}

setInterval(raffraichitDecor, 5000);

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowDown") {
    const ymax = 95; 
    if (positionRaquette() + tailleRaquette() * 5 < ymax) {
      if (positionRaquette() + tailleRaquette() * 5 >= ymax-5) {
        deplaceRaquette(-(ymax - (positionRaquette() + tailleRaquette() * 5)));
      } else {
        deplaceRaquette(-5);
      }
      metAJourRaquette(ID);
    }
  }
  if (event.code == "ArrowUp") {
    const ymin = 5; 
    if (positionRaquette() > ymin) {
      if (positionRaquette() <= ymin+5) {
        deplaceRaquette(+(positionRaquette()-ymin));
      } else {
        deplaceRaquette(+5);
      }
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
    window.open("https://github.com/jeeve/metapong", "_blank");
  }
});

document.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    const dy = event.deltaY/50;
    const ymax = 95; 
    if (positionRaquette() + tailleRaquette() * 5 < ymax) {
      if (positionRaquette() + tailleRaquette() * 5 >= ymax-5) {
        deplaceRaquette(-(ymax - (positionRaquette() + tailleRaquette() * 5)));
      } else {
        deplaceRaquette(-dy);
      }
      metAJourRaquette(ID);
    }
  }
  if (event.deltaY < 0) {
    const ymin = 5; 
    const dy = event.deltaY/50;
    if (positionRaquette() > ymin) {
      if (positionRaquette() <= ymin+5) {
        deplaceRaquette(+(positionRaquette()-ymin));
      } else {
        deplaceRaquette(-dy);
      }
      metAJourRaquette(ID);
    }
  }
});
