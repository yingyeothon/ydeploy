import mariadb from "mariadb";

const dbPool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 2,
  insertIdAsNumber: true,
});

export default dbPool;
