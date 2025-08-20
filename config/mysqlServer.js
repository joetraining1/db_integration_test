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
const CB_CONSTRAINT = {
  retries: 10,
};
const MYSQL_POOL = mysql.createPool({
  ...DB_CONFIG,
  maxIdle: 10,
  enableKeepAlive: true,
  connectionLimit: 10,
  waitForConnections: true,
  idleTimeout: 60000,
  // queueLimit: 0,
  keepAliveInitialDelay: 0,
});

const startDB = async () => {
  console.time("initDB");
  const connection = await MYSQL_POOL.getConnection();

  for (i = 1; i <= CB_CONSTRAINT.retries; i++) {
    console.log(`DATABASE CONNECTION : ${i} tries.`);
    try {
      const [results, fields] = await connection.query(
        `SHOW DATABASES LIKE '${DB_SPECS.db}'`
      );

      if (results.length === 0) {
        console.log("DATABASE IS NOT AVAILABLE.");
        console.log(`Initializing ${DB_SPECS.db} Database...`);

        const [results, fields] = await connection.execute(
          `CREATE DATABASE IF NOT EXISTS ${DB_SPECS.db}`
        );
        console.log("INIT DB RESULTS: ", results);
        console.log("INIT DB FIELDS: ", fields);

        continue;
      }

      const [useRes, useField] = await connection.query(`USE ${DB_SPECS.db}`);

      console.log("USING DATABASE :", useRes?.stateChanges?.schema);
      console.log("USE DATABASE FIELDS :", useField);

      console.log("DATABASE IS CONNECTED.");
      break;
    } catch (error) {
      if (error instanceof Error) {
        console.log("DB_ERROR :", error);
        process.exit(0);
      }
    } finally {
      connection.release();
    }
  }

  console.timeEnd("initDB");
  process.exit(0);
};

startDB();

module.exports = {
  startDB,
  DB_CONFIG,
  DB_SPECS,
};
