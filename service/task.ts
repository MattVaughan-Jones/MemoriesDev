import { AddTaskInput, EditTaskInput, Task, TaskPriority, TaskStatus } from 'generated/server';
import { client } from 'service/dynamodb';
import { PutCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { randomUUID } from 'crypto';

type DynamodbTask = {
  pk: string; // always "task"
  sk: string; // task id
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  created: string;
  modified: string;
};

enum ExpressionAttributeNames {
  priority = '#P',
  title = '#T',
  status = '#S',
  modified = '#M'
}

enum ExpressionAttributeValuePlaceholders {
  id = ':id',
  priority = ':p',
  title = ':t',
  status = ':s',
  modified = ':m'
}

type ExpressionAttributeValues = {
  ':p': {[key: string]: TaskPriority};
  ':t': {[key: string]: string};
  ':s': {[key: string]: TaskStatus};
  ':m': {[key: string]: string};
}

const expressionAttributeNames = {
  '#id':'id',
  '#p':'priority',
  '#t':'title',
  '#s':'status',
  '#c':'created',
  '#m':'modified'
}

const taskToDynamodb = (task: Task): DynamodbTask => ({
  pk: 'task',
  sk: task.id,
  priority: task.priority,
  title: task.title,
  status: task.status,
  created: task.created,
  modified: task.modified
});

const dynamodbToTask = (task: DynamodbTask): Task => ({
  id: task.sk,
  priority: task.priority,
  title: task.title,
  status: task.status,
  created: task.created,
  modified: task.modified
});

const all = async () => {
  const command = new QueryCommand({
    TableName: Table.Task.tableName,
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'pk' },
    ExpressionAttributeValues: { ':pk': 'task' }
  });

  const result = await client.send(command);

  return result.Items?.map(i => dynamodbToTask(i as DynamodbTask)) ?? [];
};

const add = async (input: AddTaskInput) => {
  const now = new Date().toISOString();

  // TODO - use attribute value placeholder in case the value is a reserved keyword
  const task = {
    id: randomUUID(),
    priority: input.priority ?? TaskPriority.Low,
    title: input.title,
    status: input.status ?? TaskStatus.Todo,
    created: now,
    modified: now
  };

  await client.send(
    new PutCommand({
      TableName: Table.Task.tableName,
      Item: taskToDynamodb(task)
    })
  );

  return task;
};

// TODO - does this correctly edit a task?
const edit = async (input: EditTaskInput) => {
  const now = new Date().toISOString();

  let expressionAttributeValues = {} as ExpressionAttributeValues;

  if (input.priority) expressionAttributeValues[':p'] = {'S': input.priority};
  if (input.title) expressionAttributeValues[':t'] = {'S': input.title};
  if (input.status) expressionAttributeValues[':s'] = {'S': input.status};
  expressionAttributeValues[':m'] = {'S': now};

  let expressions = [];
  for (const key in input) {
    if (key !== 'id') {
      // TODO - use attribute value placeholder in case the value is a reserved keyword
      expressions.push(`${ExpressionAttributeNames[key as keyof typeof ExpressionAttributeNames]} = ${ExpressionAttributeValuePlaceholders[key as keyof typeof input]}`);
    }
  }
  expressions.push('#M = :m');

  const updateExpression = 'SET ' + expressions.join(', ')

  const response = await client.send(
    new UpdateCommand({
      TableName: Table.Task.tableName,
      Key: { id: input.id },
      ExpressionAttributeNames: expressionAttributeNames,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  );

  // TODO - make sure this returns the updated task
  return response.Attributes;
};

const task = { all, add, edit};

export default task;
