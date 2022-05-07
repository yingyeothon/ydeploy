import DBDistribution from "./DBDistribution";
import dbQuery from "../../infra/maria/dbQuery";
import findDBDistribution from "./findDBDistribution";

export default async function updateDBDistribution(
  dist: Pick<
    DBDistribution,
    "distribution_id" | "member_id" | "name" | "version" | "description"
  >
): Promise<DBDistribution> {
  const updated = await dbQuery(
    `UPDATE distribution SET name = ?, version = ?, description = ? WHERE distribution_id = ? AND member_id = ?`,
    [
      dist.name,
      dist.version,
      dist.description,
      dist.distribution_id,
      dist.member_id,
    ]
  );
  console.info({ dist, updated }, "updateDBDistribution");
  return (await findDBDistribution(dist.distribution_id))!;
}
