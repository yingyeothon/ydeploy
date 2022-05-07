import findDBMemberId from "./findDBMemberId";
import insertIgnoreDBMember from "./insertIgnoreDBMember";

export default async function findOrInsertDBMemberId(
  email: string
): Promise<number> {
  const firstTry = await findDBMemberId(email);
  if (firstTry) {
    return firstTry;
  }
  const secondTry = await insertIgnoreDBMember(email);
  if (secondTry) {
    return secondTry;
  }
  const finalTry = await findDBMemberId(email);
  if (finalTry) {
    return finalTry;
  }
  throw new Error(`Cannot insert a new member[${email}]`);
}
