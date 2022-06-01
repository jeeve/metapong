const express = require('express');

const app = express();

app.use(express.static('public'));
app.get('/', function(request, response) {
   response.sendFile('./index.html');
 });

const { InfosModel, infos } = require('./models/infosModel');

app.get('/init/:nbEcrans', (req, res) => {
    infos.nbEcrans = Number(req.params.nbEcrans);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get('/quisuisje/', (req, res) => {
  infos.ajouteEcran();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ nbEcrans: infos.getNbEcrans() }));
});

module.exports = app;