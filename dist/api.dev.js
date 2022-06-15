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
  console.log(req.body); // console.log(req.body.description);
  // console.log(req.body.drugCode);
  // console.log(req.body.diseaseCode);

  var interact = req.body;
  var selectQuery = "select * from interactions where \n     drug_code = '".concat(interact.drugCode, "' \n    and disease_code = '").concat(interact.diseaseCode, "' and type = '").concat(interact.type, "'");
  var x2js = new X2JS();
  var new_xml = x2js.json2xml_str(JSON.parse(result));
  vkbeautify.xml(new_xml, 4);
  client.query(selectQuery, function (err, result) {
    if (!err) {
      if (result.rowCount == 0) {
        console.log("not found");
        res.send("not found");
      } else {
        // console.log(result.rows);
        res.send(result.rows);
      }
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
//# sourceMappingURL=api.dev.js.map
