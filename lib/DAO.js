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
    close: () => {
      db.close();
    }
  };

};

module.exports = getInstance();
