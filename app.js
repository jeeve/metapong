const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", function (request, response) {
  response.sendFile("./index.html");
});

const { infos } = require("./models/infosModel");

app.get("/init/:nbEcrans", (req, res) => {
  infos.nbEcrans = Number(req.params.nbEcrans) - 1;
  console.log(Date() + " - Init");
  infos.tagDecorEstModifie = [false];
  infos.score = { a: 0, b: 0 };
  infos.tempoScore = 0;
  infos.signaux = [];
  infos.idEcransModifies = [];
  infos.ajouteEcran();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get("/register/", (req, res) => {
  infos.ajouteEcran();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ id: infos.nbEcrans }));
});

app.post("/render/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(infos.render(req.body.id)));
});

app.post("/sprite/", (req, res) => {
  let id = req.body.id;
  let b = [];
  let nouvellesBriques = [];
  infos.nouvellesBriques.forEach((brique) => {
    if (infos.blocEstDansDecor(brique, id)) {
      b.push({
        x: brique.x - (id - 1) * 100,
        y: brique.y,
        classe: brique.classe,
      });
    } else {
      nouvellesBriques.push({
        x: brique.x,
        y: brique.y,
        classe: brique.classe,
      });
    }
  });
  infos.nouvellesBriques = nouvellesBriques;

  let bMortes = [];
  let briquesMortes = [];
  infos.briquesMortes.forEach((brique) => {
    if (infos.blocEstDansDecor(brique, id)) {
      bMortes.push({
        x: brique.x - (id - 1) * 100,
        y: brique.y,
        classe: brique.classe,
      });
    } else {
      briquesMortes.push({ x: brique.x, y: brique.y, classe: brique.classe });
    }
  });
  infos.briquesMortes = briquesMortes;

  let aPerdu = "";
  if (infos.nbEcrans == 1) {
    if (id == 1 || id == infos.nbEcrans) {
      if (infos.perduGauche) {
        aPerdu = "gauche";
        infos.perduGauche = false;
      }
      if (infos.perduDroit) {
        aPerdu = "droit";
        infos.perduDroit = false;
      }
    }
  } else {
    if (id == 1) {
      if (infos.perduGauche) {
        aPerdu = "gauche";
        infos.perduGauche = false;
      }
    }
    if (id == infos.nbEcrans) {
      if (infos.perduDroit) {
        aPerdu = "droit";
        infos.perduDroit = false;
      }
    }
  }

  let sprite = {
    balle: infos.getBalle(id),
    alerte: infos.alerte,
    briques: b,
    briquesMortes: bMortes,
    perdu: aPerdu,
  };

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(sprite));
});

app.get("/nouvellebrique/", (req, res) => {
  let brique = infos.creeBrique();
  if (brique != undefined) {
    infos.nouvellesBriques.push(brique);
  }
  res.end();
});

app.post("/metajourraquette/", (req, res) => {
  let id = req.body.id;
  let raquette = req.body.raquette;
  infos.decor.raquettes[id - 1] = [];
  raquette.forEach(function (blocRaquette) {
    infos.decor.raquettes[id - 1].push({
      x: blocRaquette.x,
      y: blocRaquette.y,
    });
  });
  res.end();
});

app.get("/decorestmodifie/:numeroEcran", (req, res) => {
  let numeroEcran = Number(req.params.numeroEcran);
  let estModifie = infos.getTagDecorEstModifie(numeroEcran);
  infos.setTagDecorEstModifie(numeroEcran, false);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ tag: estModifie }));
});

app.get("/score/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(infos.getScore()));
});

app.get("/signal/:numeroEcran", (req, res) => {
  if (infos.nbEcrans > 0) {
    let numeroEcran = Number(req.params.numeroEcran);
    let idEcran = numeroEcran;
    if (numeroEcran <= infos.signaux.length) {
      infos.signaux[idEcran - 1].temps = Date.now();
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
  } else {
    res.end(JSON.stringify({ nbEcrans: 0 }));
  }
});

app.get("/idecranachange/:numeroEcran", (req, res) => {
  let numeroEcran = Number(req.params.numeroEcran);
  let nouvelIdEcran = numeroEcran;
  let aChange = false;
  let i = infos.idEcransModifies.findIndex((elt) => elt.id == numeroEcran);
  if (i != -1) {
    nouvelIdEcran = infos.idEcransModifies[i].nouvelId;
    infos.idEcransModifies.splice(i, 1);
    infos.signaux = [];
    for (let i = 0; i < infos.nbEcrans; i++) {
      infos.signaux.push({ id: i + 1, temps: Date.now() });
    }
  }
  if (nouvelIdEcran != numeroEcran) {
    aChange = true;
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ aChange: aChange, id: nouvelIdEcran }));
});

app.get("/alerte/", (req, res) => {
  infos.alerte = !infos.alerte;
  res.end();
});

app.post("/vitesse/", (req, res) => {
  if (infos.nbEcrans > 0) {
    let id = req.body.id;
    let dv = req.body.dv;

    if (
      Math.abs(infos.decor.balle.vx * dv) < 3 &&
      Math.abs(infos.decor.balle.vy * dv < 2)
    ) {
      infos.decor.balle.vx = infos.decor.balle.vx * dv;
      infos.decor.balle.vy = infos.decor.balle.vy * dv;
    }
  }
  res.end();
});

module.exports = app;
