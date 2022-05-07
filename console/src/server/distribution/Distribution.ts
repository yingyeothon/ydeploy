export default interface Distribution {
  distributionId: number;
  name: string;
  uploadPath: string;
  version: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
