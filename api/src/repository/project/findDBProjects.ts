import DBProject from "./DBProject";
import dbFetch from "../../infra/maria/dbFetch";

export default async function findDBProjects(
  memberId: number
): Promise<DBProject[]> {
  return await dbFetch<DBProject>(
    `SELECT * FROM project WHERE member_id = ? ORDER BY created_at DESC`,
    [memberId]
  );
}
