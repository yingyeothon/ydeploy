import DBDistribution from "./DBDistribution";
import dbFetch from "../../infra/maria/dbFetch";

export default async function findDBDistribution(
  distributionId: number
): Promise<DBDistribution | null> {
  const rows = await dbFetch<DBDistribution>(
    `SELECT * FROM distribution WHERE distribution_id = ?`,
    [distributionId]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  return rows[0];
}
