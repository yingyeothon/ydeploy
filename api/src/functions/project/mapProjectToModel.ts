import DBProject from "../../repository/project/DBProject";
import Project from "./Project";

export default function mapProjectToModel(dbProject: DBProject): Project {
  return {
    projectId: dbProject.project_id,
    codename: dbProject.codename,
    name: dbProject.name,
    description: dbProject.description,
    createdAt: dbProject.created_at,
    updatedAt: dbProject.updated_at,
  };
}
