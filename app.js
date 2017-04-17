const express = require('express');
const app = express();
const dao = require('./lib/DAO');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './res/uploads/' })

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/:search', (req, res) => {
  let search = req.params.search;
  let limit = req.params.limit || 20;

  dao.get(search, limit, (err, rows) => {
    res.status(200).json({images: rows});
  })
});

app.post('/', upload.single('image'), (req, res) => {
  let title = req.body.title;
  let tags = req.body.tags;
  let file = req.file;

  if (!title || !tags || !file) {
    res.status(400).send("Missing some properties.");
  } else {
    let insertData = {
      $title: title,
      $tags: tags.join(),
      $url: file.path
    }

    dao.insert(insertData, (err) => {
      if (err) {
        console.log("ERR:", err);
        res.status(500).send("An unexpected error occurred.");
      } else {
        res.status(201).send();
      }
    });
  }

});

app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});

module.exports = app;
