const mysql = require("mysql2/promise");

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
};

const DB_SPECS = {
  db: "mhs_test_db_esi",
  dialect: "mysql",
};

const conn = async () => {
  const connection = await mysql.createConnection({
    ...DB_CONFIG,
    database: DB_SPECS.db,
  });
  return connection;
};

module.exports = {
  DB_CONFIG,
  DB_SPECS,
  conn,
};
