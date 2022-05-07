export default interface DBProject {
  project_id: number;
  member_id: number;
  codename: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
