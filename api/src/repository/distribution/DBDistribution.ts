export default interface DBDistribution {
  distribution_id: number;
  member_id: number;
  project_id: number;
  name: string;
  upload_path: string;
  version: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
