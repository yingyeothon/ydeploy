import type { AWS } from "@serverless/typescript";
import functions from "./src/functions";

const config: AWS = {
  service: "ydeploy-console-api",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-2",
    environment: {
      DB_HOST: process.env.DB_HOST!,
      DB_USER: process.env.DB_USER!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
      DB_DATABASE: process.env.DB_DATABASE!,
      REDIS_HOST: process.env.REDIS_HOST!,
      REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
      ROOT_DOMAIN: process.env.ROOT_DOMAIN!,
      SUB_DOMAIN: process.env.SUB_DOMAIN!,
      DIST_BUCKET: process.env.DIST_BUCKET!,
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
            Effect: "Allow",
            Resource: `arn:aws:s3:::${process.env.DIST_BUCKET}/*`,
          },
        ],
      },
    },
    httpApi: {
      authorizers: {
        auth: {
          type: "request",
          functionName: "authorize",
          enableSimpleResponses: true,
          identitySource: ["$request.header.cookie"],
        },
      },
    },
    logs: {
      httpApi: {
        format: `$context.identity.sourceIp - - [$context.requestTime] "$context.routeKey $context.protocol" $context.status $context.responseLength $context.requestId $context.authorizer.error`,
      },
    },
  },
  functions,
  custom: {
    scripts: {
      hooks: {
        "webpack:package:packExternalModules":
          "[ -d .webpack/serveStatic ] && cp -r ../console/build .webpack/serveStatic/pages || true",
      },
    },
    "serverless-offline": {
      noPrependStageInUrl: true,
      noAuth: true,
    },
    customDomain: {
      apiType: "http",
      domainName: `${process.env.SUB_DOMAIN}.${process.env.ROOT_DOMAIN}`,
      certificateName: process.env.ROOT_DOMAIN!,
      endpointType: "regional",
      createRoute53Record: true,
    },
  },
  package: {
    individually: true,
  },
  plugins: [
    "serverless-webpack",
    "serverless-s3-local",
    "serverless-offline",
    "serverless-plugin-scripts",
    "serverless-domain-manager",
  ],
};

export = config;
