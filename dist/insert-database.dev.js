"use strict";

var client = require('./connection.js');

var express = require('express');

var cors = require("cors");

var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.listen(3300, function () {
  console.log("Sever is now listening at port 3300");
});
client.connect();
app.post('/interaction', function (req, res) {
  var insertQuery = "insert into interaction(description, drug_code, disease_code, type)\n    select md5(random()::text),\n           (random() * 999 + 1)::int,\n           (random() * 49 + 1)::int, \n           (random() + 1)::int\n    from generate_series(1,500000)";
  client.query(insertQuery, function (err, result) {
    if (!err) {
      res.send('Insertion was successful');
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
//# sourceMappingURL=insert-database.dev.js.map
