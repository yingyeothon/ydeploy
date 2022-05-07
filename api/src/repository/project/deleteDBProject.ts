import dbQuery from "../../infra/maria/dbQuery";

export default async function deleteDBProject(
  memberId: number,
  projectId: number
): Promise<boolean> {
  const result = await dbQuery(
    `DELETE FROM project WHERE project_id = ? AND member_id = ?`,
    [projectId, memberId]
  );
  console.info({ memberId, projectId, result }, "deleteDBProject");
  return result.affectedRows > 0;
}
