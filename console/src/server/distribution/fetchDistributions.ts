import Distribution from "./Distribution";

export default async function fetchDistributions(
  projectId: number
): Promise<Distribution[]> {
  return fetch(`/api/project/${projectId}/distribution`, {
    method: "GET",
  }).then((r) => r.json());
}
