import DBProject from "./DBProject";
import dbFetch from "../../infra/maria/dbFetch";

export default async function findDBProject(
  projectId: number
): Promise<DBProject | null> {
  const rows = await dbFetch<DBProject>(
    `SELECT * FROM project WHERE project_id = ?`,
    [projectId]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  return rows[0];
}
