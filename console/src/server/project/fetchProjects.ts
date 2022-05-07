import Project from "./Project";

export default async function fetchProjects(): Promise<Project[]> {
  return fetch(`/api/project`, {
    method: "GET",
  }).then((r) => r.json());
}
