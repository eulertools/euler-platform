import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { success, failure } from './response';
import {TableNames} from "reactshoppe-database/DDBTable";

export default async (event: APIGatewayProxyEvent) => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  let newOrder = {};
  // NOTE: in a real application, we’d do more to validate input
  if (event.body != null) {
    const { products, userId } = JSON.parse(event.body);
    const ddb = new AWS.DynamoDB.DocumentClient();
    newOrder = {
      id: uuidv4(),
      products,
      userId,
    };
    try {
      await ddb.put({
        TableName: TableNames.Order,
        Item: newOrder
      }).promise();

      return success(JSON.stringify(newOrder));

    } catch (error) {
      const body = error.stack || JSON.stringify(error, null, 2);
      return failure(body);
    }
  }

  return success(JSON.stringify(newOrder));
};
