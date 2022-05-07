import { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  serveStatic: {
    handler: "src/functions/static/serve.handle",
    events: [
      { httpApi: { path: "/", method: "get" } },
      { httpApi: { path: "/{fileName}", method: "get" } },
      { httpApi: { path: "/static/{type}/{fileName}", method: "get" } },
    ],
  },
  authorize: {
    handler: "src/functions/authorization/authorize.handle",
  },
  grant: {
    handler: "src/functions/authorization/grant.handle",
    events: [{ httpApi: { path: "/api/auth/grant", method: "post" } }],
  },
  loginGoogle: {
    handler: "src/functions/authorization/loginGoogle.handle",
    events: [{ httpApi: { path: "/api/auth/login-google", method: "post" } }],
  },
  logout: {
    handler: "src/functions/authorization/logout.handle",
    events: [
      {
        httpApi: {
          path: "/api/auth/logout",
          method: "post",
          authorizer: "auth",
        },
      },
    ],
  },

  createProject: {
    handler: "src/functions/project/createProject.handle",
    events: [
      { httpApi: { path: "/api/project", method: "post", authorizer: "auth" } },
    ],
  },
  updateProject: {
    handler: "src/functions/project/updateProject.handle",
    events: [
      {
        httpApi: {
          path: "/api/project/{projectId}",
          method: "put",
          authorizer: "auth",
        },
      },
    ],
  },
  deleteProject: {
    handler: "src/functions/project/deleteProject.handle",
    events: [
      {
        httpApi: {
          path: "/api/project/{projectId}",
          method: "delete",
          authorizer: "auth",
        },
      },
    ],
  },
  listProjects: {
    handler: "src/functions/project/listProjects.handle",
    events: [
      { httpApi: { path: "/api/project", method: "get", authorizer: "auth" } },
    ],
  },
  getProject: {
    handler: "src/functions/project/getProject.handle",
    events: [{ httpApi: { path: "/api/project/{projectId}", method: "get" } }],
  },

  createDistribution: {
    handler: "src/functions/distribution/createDistribution.handle",
    events: [
      {
        httpApi: {
          path: "/api/project/{projectId}/distribution",
          method: "post",
          authorizer: "auth",
        },
      },
    ],
  },
  updateDistribution: {
    handler: "src/functions/distribution/updateDistribution.handle",
    events: [
      {
        httpApi: {
          path: "/api/distribution/{distributionId}",
          method: "put",
          authorizer: "auth",
        },
      },
    ],
  },
  deleteDistribution: {
    handler: "src/functions/distribution/deleteDistribution.handle",
    events: [
      {
        httpApi: {
          path: "/api/distribution/{distributionId}",
          method: "delete",
          authorizer: "auth",
        },
      },
    ],
  },
  listDistributions: {
    handler: "src/functions/distribution/listDistributions.handle",
    events: [
      {
        httpApi: {
          path: "/api/project/{projectId}/distribution",
          method: "get",
          authorizer: "auth",
        },
      },
    ],
  },
  getDistribution: {
    handler: "src/functions/distribution/getDistribution.handle",
    events: [
      {
        httpApi: { path: "/api/distribution/{distributionId}", method: "get" },
      },
    ],
  },
};

export default functions;
