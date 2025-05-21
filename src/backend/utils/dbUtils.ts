import { Connection, Pool } from "mysql2/promise";

export const withTransaction = async (
  pool: Pool,
  callback: (conn: Connection) => Promise<void>,
) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await callback(conn);

    await conn.commit();
  } catch {
    await conn.rollback();
  } finally {
    conn.release();
  }
};
