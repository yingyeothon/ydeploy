export default interface Authorization {
  memberId: number;
  email: string;
}

export const invalidAuthorization: Authorization = {
  memberId: -1,
  email: "",
};
