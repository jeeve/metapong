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
    infos.nbEcrans = Number(req.params.nbEcrans);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ nbEcrans: infos.nbEcrans }));
});

app.get('/register/', (req, res) => {
  infos.ajouteEcran();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id: infos.getNbEcrans() }));
});

module.exports = app;