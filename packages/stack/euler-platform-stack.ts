import {App, Stack, StackProps} from 'aws-cdk-lib';
import { ReactshoppeDatabase} from "reactshoppe-database/DDBTable";
import { ReactshoppeApi} from "reactshoppe-api/ApiGateway";

export class EulerPlatformStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new ReactshoppeApi(this, 'ReactshoppeApi');
    const db = new ReactshoppeDatabase(this, 'Database');

    db.allowCrud(api.handler);
  }
};
