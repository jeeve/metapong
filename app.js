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
  infos.score = { a: 0, b: 0 };
  infos.ajouteEcran();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get("/register/", (req, res) => {
  infos.ajouteEcran();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ id: infos.getNbEcrans() }));
});

app.post("/render/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(infos.render(req.body.id)));
});

app.post("/balle/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(infos.balle(req.body.id)));
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
  let numeroEcran = Number(req.params.numeroEcran);
  let idEcran = numeroEcran;
  if (numeroEcran <= infos.signaux.length) {
    infos.signaux[idEcran-1].temps = Date.now();
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get("/idecranachange/:numeroEcran", (req, res) => {
  let numeroEcran = Number(req.params.numeroEcran);
  let nouvelIdEcran = numeroEcran;
  let aChange = false;
  let i = infos.idEcransModifies.findIndex((elt) => elt.id == numeroEcran);
  if (i != -1) {
    nouvelIdEcran = infos.idEcransModifies[i].nouvelId;
    infos.idEcransModifies.splice(i, 1);
  }
  if (nouvelIdEcran != numeroEcran) {
    aChange = true;
  }
  res.setHeader("Content-Type", "application/json");
  //console.log('id a change : ' + aChange +  ' - ' + nouvelIdEcran );
  res.end(JSON.stringify({ aChange: aChange, id: nouvelIdEcran }));
});

module.exports = app;
