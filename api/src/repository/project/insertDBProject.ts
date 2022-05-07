import DBProject from "./DBProject";
import dbQuery from "../../infra/maria/dbQuery";
import findDBProject from "./findDBProject";

export default async function insertDBProject(
  project: Pick<DBProject, "member_id" | "codename" | "name" | "description">
): Promise<DBProject> {
  const inserted = await dbQuery(
    `INSERT project (member_id, codename, name, description) VALUES (?, ?, ?, ?)`,
    [project.member_id, project.codename, project.name, project.description]
  );
  return (await findDBProject(inserted.insertId))!;
}
