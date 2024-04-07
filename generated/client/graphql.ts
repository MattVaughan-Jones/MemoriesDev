/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddTaskInput = {
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
};

export type EditTaskInput = {
  id: Scalars['ID']['input'];
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask?: Maybe<Task>;
  editTask?: Maybe<Task>;
};

export type MutationAddTaskArgs = {
  input: AddTaskInput;
};

export type MutationEditTaskArgs = {
  input: EditTaskInput;
};

export type Query = {
  __typename?: 'Query';
  all?: Maybe<Array<Task>>;
  healthcheck?: Maybe<Scalars['Boolean']['output']>;
};

export type Task = {
  __typename?: 'Task';
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modified: Scalars['String']['output'];
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars['String']['output'];
};

export enum TaskPriority {
  High = 'high',
  Low = 'low',
  Medium = 'medium'
}

export enum TaskStatus {
  Cancelled = 'cancelled',
  Done = 'done',
  InProgress = 'in_progress',
  Todo = 'todo'
}

export type AddTaskMutationVariables = Exact<{
  input: AddTaskInput;
}>;

export type AddTaskMutation = {
  __typename?: 'Mutation';
  addTask?: { __typename?: 'Task'; id: string; title: string; priority: TaskPriority; status: TaskStatus } | null;
};

export type NewTaskFragment = {
  __typename?: 'Task';
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
} & { ' $fragmentName'?: 'NewTaskFragment' };

export type AllTasksQueryVariables = Exact<{ [key: string]: never }>;

export type AllTasksQuery = {
  __typename?: 'Query';
  all?: Array<{
    __typename?: 'Task';
    id: string;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    created: string;
    modified: string;
  }> | null;
};

export const NewTaskFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NewTask' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Task' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<NewTaskFragment, unknown>;
export const AddTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddTaskInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddTaskMutation, AddTaskMutationVariables>;
export const AllTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'all' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created' } },
                { kind: 'Field', name: { kind: 'Name', value: 'modified' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AllTasksQuery, AllTasksQueryVariables>;
