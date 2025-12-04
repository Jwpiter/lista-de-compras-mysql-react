const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lista_compras_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
