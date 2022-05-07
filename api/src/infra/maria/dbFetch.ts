import dbPool from "./dbPool";

export default async function dbFetch<T>(
  query: string,
  values?: any[]
): Promise<T[]> {
  const connection = await dbPool.getConnection();
  try {
    return await connection.query(query, values);
  } finally {
    connection.release();
  }
}
