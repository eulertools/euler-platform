#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EulerPlatformStack} from "../euler-platform-stack";

const app = new cdk.App();
new EulerPlatformStack(app, 'EulerPlatform', {
  description: 'ECR Repositories and pipelines for the clients',
  tags: {usage: 'data-collector'},
  env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION},
});
