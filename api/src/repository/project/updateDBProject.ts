import DBProject from "./DBProject";
import dbQuery from "../../infra/maria/dbQuery";
import findDBProject from "./findDBProject";

export default async function updateDBProject(
  project: Pick<
    DBProject,
    "project_id" | "member_id" | "codename" | "name" | "description"
  >
): Promise<DBProject> {
  const updated = await dbQuery(
    `UPDATE project SET codename = ?, name = ?, description = ?, updated_at = NOW() WHERE project_id = ? AND member_id = ?`,
    [
      project.codename,
      project.name,
      project.description,
      project.project_id,
      project.member_id,
    ]
  );
  console.info({ project, updated }, "updateDBProject");
  return (await findDBProject(project.project_id))!;
}
