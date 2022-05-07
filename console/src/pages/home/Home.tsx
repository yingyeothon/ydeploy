import Distribution from "../../server/distribution/Distribution";
import Project from "../../server/project/Project";
import React from "react";
import fetchDistributions from "../../server/distribution/fetchDistributions";
import fetchProjects from "../../server/project/fetchProjects";
import useAuthorization from "../../components/auth/useAuthorization";

export default function Home() {
  const authorization = useAuthorization();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [project, setProject] = React.useState<Project | null>(null);
  const [distributions, setDistributions] = React.useState<Distribution[]>([]);

  React.useEffect(() => {
    if (authorization.memberId > 0) {
      fetchProjects().then(setProjects).catch(alert);
    }
  }, [authorization.memberId]);

  React.useEffect(() => {
    if (project !== null) {
      fetchDistributions(project.projectId).then(setDistributions).catch(alert);
    }
  }, [project]);

  return (
    <div>
      <h1>Hello, {authorization.email}</h1>
      <pre>{JSON.stringify(authorization)}</pre>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li onClick={() => setProject(project)}>
            <pre>{JSON.stringify(project)}</pre>
          </li>
        ))}
      </ul>
      <h2>Distributions</h2>
      <ul>
        {distributions.map((dist) => (
          <li>
            <pre>{JSON.stringify(dist)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
