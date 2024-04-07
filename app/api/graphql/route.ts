import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { Resolvers } from 'generated/server';
import gql from 'graphql-tag';
import task from 'service/task';

export type Context = {
  task: typeof task;
};

// TODO - add ui and schema for bulk-update of status of tasks

const typeDefs = gql`
  type Query {
    healthcheck: Boolean
    all: [Task!]
  }

  type Mutation {
    addTask(input: AddTaskInput!): Task
    editTask(input: EditTaskInput!): Task
  }

  input AddTaskInput {
    title: String!
    status: TaskStatus
    priority: TaskPriority
  }

  input EditTaskInput {
    id: ID!
    title: String
    status: TaskStatus
    priority: TaskPriority
  }

  enum TaskStatus {
    todo
    in_progress
    done
    cancelled
  }

  enum TaskPriority {
    low
    medium
    high
  }

  type Task {
    id: ID!
    title: String!
    status: TaskStatus!
    priority: TaskPriority!
    created: String!
    modified: String!
  }
`;

const resolvers: Resolvers = {
  Query: {
    healthcheck: (_parent, _args, _context) => true,
    all: (_parent, _args, context) => context.task.all()
  },
  Mutation: {
    addTask: (_parent, args, context) => context.task.add(args.input),
    editTask: (_parent, args, context) => context.task.edit(args.input)
  }
};

const server = new ApolloServer<Context>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ task })
});

export async function POST(request: Request) {
  return handler(request);
}

export async function GET(request: Request) {
  return handler(request);
}
