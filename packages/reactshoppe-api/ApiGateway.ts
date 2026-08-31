import { Cors, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class ReactshoppeApi extends Construct {
  private _handler: lambda.Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._handler = new lambda.Function(this, 'ApiHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('./packages/functions'), // this path is relative to the project root
      handler: 'entrypoint.main',
    });

    new LambdaRestApi(this, 'reactshoppe-api',  {
      restApiName: 'Reactshoppe',
      handler: this._handler,
      defaultCorsPreflightOptions: {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
      }
    });
  }

  get handler(): lambda.Function {
    return this._handler;
  }
}
