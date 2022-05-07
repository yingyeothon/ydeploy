import DBAffected from "./DBAffected";
import dbPool from "./dbPool";

export default async function dbQuery(
  query: string,
  values?: any[]
): Promise<DBAffected> {
  const connection = await dbPool.getConnection();
  try {
    return await connection.query(query, values);
  } finally {
    connection.release();
  }
}
