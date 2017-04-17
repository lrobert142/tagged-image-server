const express = require('express');
var cors = require('cors')
const dao = require('./lib/DAO');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './res/uploads/' })
const path = require('path');
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
app.use('/res/uploads', express.static(path.join(__dirname, 'res/uploads')));

// Create new entry
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

// Get all entries
app.get('/all', (req, res) => {
  let limit = req.params.limit || 20;

  dao.all(limit, (err, rows) => {
    //TODO Transform tags back to arrays
    res.status(200).json({images: rows});
  })
});

// Find all entries matching search
app.get('/search/:search', (req, res) => {
  let search = req.params.search;
  let limit = req.params.limit || 20;

  dao.get(search, limit, (err, rows) => {
    //TODO Transform tags back to arrays
    res.status(200).json({images: rows});
  })
});

// Update entry with ID
app.put('/:id', upload.single('image'), (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let tags = req.body.tags;
  let file = req.file;

  if (!title || !tags || !file) {
    res.status(400).send("Missing some properties.");
  } else {
    let updateData = {
      $id: id,
      $title: title,
      $tags: tags.join(),
      $url: file.path
    }

    dao.update(updateData, (err) => {
      if (err) {
        console.log("ERR:", err);
        res.status(500).send("An unexpected error occurred.");
      } else {
        res.status(200).send();
      }
    });
  }
});

app.listen(2000, function () {
  console.log('Server listening on port 2000');
});

module.exports = app;
