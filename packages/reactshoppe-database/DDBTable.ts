import {RemovalPolicy} from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class ReactshoppeDatabase extends Construct {
  private orderTable: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.orderTable = new dynamodb.Table(this, TableNames.Order, {
      partitionKey: {name: 'id', type: dynamodb.AttributeType.STRING},
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }

  allowCrud(grantee: iam.IGrantable) {
    this.orderTable.grantReadWriteData(grantee);
  }
};

export enum TableNames {
  Order = 'Order'
};
