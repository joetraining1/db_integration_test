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

const mhsTable = async () => {
  console.time("initTable");
  const connection = await mysql.createConnection({
    ...DB_CONFIG,
    database: DB_SPECS.db,
  });

  try {
    const [results, fields] = await connection.query(
      "CREATE TABLE mhs (id VARCHAR(36) PRIMARY KEY, nama VARCHAR(50), jml_keluarga INT(3), join_date DATETIME)"
    );
    console.log("TABLE RESULTS: ", results);
    console.log("TABLE FIELDS: ", fields);
  } catch (error) {
    if (error instanceof Error) {
      console.log("DB_ERROR :", error);
      process.exit(0);
    }
  } finally {
    connection.release();
  }

  console.timeEnd("initTable");
  process.exit(0);
};

mhsTable();

module.exports = {
  mhsTable,
};
