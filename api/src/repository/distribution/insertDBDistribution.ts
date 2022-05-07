import DBDistribution from "./DBDistribution";
import dbQuery from "../../infra/maria/dbQuery";
import findDBDistribution from "./findDBDistribution";

export default async function insertDBDistribution(
  dist: Pick<
    DBDistribution,
    | "member_id"
    | "project_id"
    | "name"
    | "version"
    | "description"
    | "upload_path"
  >
): Promise<DBDistribution> {
  const inserted = await dbQuery(
    `INSERT distribution (member_id, project_id, name, version, description, upload_path) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      dist.member_id,
      dist.project_id,
      dist.name,
      dist.version,
      dist.description,
      dist.upload_path,
    ]
  );
  return (await findDBDistribution(inserted.insertId))!;
}
