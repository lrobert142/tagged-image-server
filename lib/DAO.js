const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./res/db.sqlite');

let _instance;

function getInstance() {
  return _instance || (_instance = new DAO());
}

var DAO = function() {
  //Setup the table if it doesn't already exist
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS images (title TEXT, tags TEXT, url TEXT)");
  });

  return {

    insert: (data, cb) => {
      db.serialize(() => {
        db.run("INSERT INTO images VALUES($title, $tags, $url)", data, cb);
      });
    },
    get: (search, limit, cb) => {
      const anySearch = '%' + search + '%';
      db.serialize(() => {
        db.all("SELECT rowid AS id, title, tags, url FROM images WHERE title LIKE ? OR tags LIKE ? LIMIT ?", [anySearch, anySearch, limit], cb);
      });
    },
    all: (limit, cb) => {
      db.serialize(() => {
        db.all("SELECT rowid AS id, title, tags, url FROM images LIMIT ?", [limit], cb);
      });
    },
    update: (data, cb) => {
      db.serialize(() => {
        db.run("UPDATE images SET title=$title, tags=$tags, url=$url WHERE rowid=$id", data, cb);
      });
    }

  };

};

module.exports = getInstance();
