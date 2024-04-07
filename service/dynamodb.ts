import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({
  ...(Boolean(process.env.VITEST_WORKER_ID) && {
    endpoint: 'http://localhost:8000',
    region: 'local', // TODO - maybe have to change this to a remote endpoint
    credentials: {
      accessKeyId: String(process.env.ACCESS_KEY_ID), // TODO - are these keys being passed in correctly?
      secretAccessKey: String(process.env.SECRET_ACCESS_KEY) // TODO - are these keys being passed in correctly?
    }
  })
});

export const client = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false
  },
  unmarshallOptions: {
    wrapNumbers: false
  }
});
