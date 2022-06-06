const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', function(request, response) {
   response.sendFile('./index.html');
 });

const { infos } = require('./models/infosModel');

app.get('/init/:nbEcrans', (req, res) => {
    infos.nbEcrans = Number(req.params.nbEcrans)-1;
    infos.ajouteEcran();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get('/register/', (req, res) => {
  infos.ajouteEcran();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id: infos.getNbEcrans() }));
});

app.post('/render/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(infos.render(req.body.id)));
});

app.post('/balle/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(infos.balle(req.body.id)));
});

app.post('/raquette/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(infos.decor.raquettes[req.body.id-1]));
});

app.get('/decorestmodifie/:numeroEcran', (req, res) => {
  let numeroEcran = Number(req.params.numeroEcran);
  let estModifie = infos.getTagDecorEstModifie(numeroEcran);
  infos.setTagDecorEstModifie(numeroEcran, false);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ tag: estModifie }));
});

module.exports = app;