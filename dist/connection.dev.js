"use strict";

var _require = require('pg'),
    Client = _require.Client;

var client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres123",
  database: "postgres"
});
module.exports = client;
//# sourceMappingURL=connection.dev.js.map
