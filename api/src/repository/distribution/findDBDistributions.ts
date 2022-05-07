import DBDistribution from "./DBDistribution";
import dbFetch from "../../infra/maria/dbFetch";

export default async function findDBDistributions(
  memberId: number,
  projectId: number
): Promise<DBDistribution[]> {
  return await dbFetch<DBDistribution>(
    `SELECT * FROM distribution WHERE member_id = ? AND project_id = ? ORDER BY created_at DESC`,
    [memberId, projectId]
  );
}
