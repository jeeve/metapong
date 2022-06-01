const express = require('express');

const app = express();

app.use(express.static('public'));
app.get('/', function(request, response) {
   response.sendFile('./index.html');
 });

module.exports = app;