import DBMember from "./DBMember";
import dbFetch from "../../infra/maria/dbFetch";

export default async function findDBMemberId(
  email: string
): Promise<number | null> {
  const rows = await dbFetch<Pick<DBMember, "member_id">>(
    `SELECT member_id FROM member WHERE email = ?`,
    [email]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  return rows[0].member_id;
}
