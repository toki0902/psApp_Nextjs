import mysql, { Pool } from "mysql2/promise";

let pool: Pool;

export const createConnectionPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "mysql",
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      charset: "utf8mb4",
    });
  }

  return pool;
};
