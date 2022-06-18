let ID = 0;
let nbEcrans = 0;
let alerte = false;
let autoMode = false;

document.querySelector("#bouton-init").addEventListener("click", init);
document.querySelector("#bouton-moins").addEventListener("click", changeVitesseMoins);
document.querySelector("#bouton-plus").addEventListener("click", changeVitessePlus);
document.querySelector("#bouton-insert").addEventListener("click", nouvelleBrique);
document.querySelector("#bouton-alerte").addEventListener("click", goAlerte);
document.querySelector("#bouton-auto").addEventListener("click", toggleModeAuto);

function changeVitesseMoins() {
  changeVitesse(0.8);
}

function changeVitessePlus() {
  changeVitesse(1.2);
}

function toggleModeAuto() {
  autoMode = ! autoMode;
  if (autoMode) {
    document.querySelector("#bouton-auto").innerHTML = 'auto OFF'; 
  }
  else {
    document.querySelector("#bouton-auto").innerHTML = 'auto ON'; 
  }
}

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
    bougeRaquette(-5);
  }
  if (event.code == "ArrowUp") {
    bougeRaquette(+5);
  }
  if (event.code == "NumpadAdd") {
    changeVitesse(1.2);
  }
  if (event.code == "NumpadSubtract") {
    changeVitesse(0.8);
  }
  if (event.code == "Space") {
    goAlerte();
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
  bougeRaquette(-event.deltaY/50); 
});

setInterval(raquetteAuto, 100);
