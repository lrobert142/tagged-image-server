var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/', (req, res) => {
  res.status(500).send("Not Yet Implemented");
});

app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});

module.exports = app;
