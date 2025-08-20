const { DB_CONFIG, DB_SPECS } = require("../config/MahasiswaDB");
const mysql = require("mysql2/promise");
const randomName = require("@scaleway/random-name");

const mahasiswaCrud = async () => {
  const dt = new Date();
  const present_dt = dt.toISOString();

  const connection = await mysql.createConnection({
    ...DB_CONFIG,
    database: DB_SPECS.db,
  });

  const fake_mhs = {
    id: crypto.randomUUID(),
    nama: randomName(),
    jml_keluarga: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
    join_date: present_dt.slice(0, 19).replace("T", " "),
  };

  const store = await connection.query(
    `INSERT INTO mhs (id, nama, jml_keluarga, join_date) values ("${fake_mhs.id}", "${fake_mhs.nama}", ${fake_mhs.jml_keluarga}, "${fake_mhs.join_date}")`
  );

  const [results, fields] = await connection.query(
    "SELECT * FROM mhs order by mhs.join_date desc limit 1"
  );
  console.log(results);
  console.log(fields);

  process.exit(0);
};

mahasiswaCrud();

module.exports = {
  mahasiswaCrud,
};
