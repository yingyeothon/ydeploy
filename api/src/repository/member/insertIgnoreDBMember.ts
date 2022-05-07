import dbQuery from "../../infra/maria/dbQuery";

export default async function insertIgnoreDBMember(
  email: string
): Promise<number> {
  const result = await dbQuery(`INSERT IGNORE INTO member (email) VALUES (?)`, [
    email,
  ]);
  console.info({ result }, "insertNewMember");
  return result.insertId;
}
