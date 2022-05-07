import dbQuery from "../../infra/maria/dbQuery";

export default async function deleteDBDistribution(
  memberId: number,
  distributionId: number
): Promise<boolean> {
  const result = await dbQuery(
    `DELETE FROM distribution WHERE distribution_id = ? AND member_id = ?`,
    [distributionId, memberId]
  );
  console.info({ memberId, distributionId, result }, "deleteDBDistribution");
  return result.affectedRows > 0;
}
