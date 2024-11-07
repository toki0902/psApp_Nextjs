import mysql, { Pool } from "mysql2/promise";
import { root } from "postcss";

let pool: Pool;

export const createConnectionPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  return pool;
};
