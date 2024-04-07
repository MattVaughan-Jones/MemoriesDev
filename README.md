### ------------------------------
###
### See notes.md for how to access CLI
###
### ------------------------------



## About the Exercise

The Exercise Application is a Basic Todo App with List, Create, Update and Remove functionality. You can view the completed application [here](https://exercise.develop.memories.net).
Following is the details of the application stack:

1. [Nextjs](https://nextjs.org/docs): The frontend and backend of the application is built using Nextjs.
2. [SST](https://serverless-stack.com/): The application is deployed to AWS using SST. It uses AWS CDK under the hood and adds constructs to make it easier to create AWS resources.
3. [Apollo Server](https://www.apollographql.com/docs/apollo-server/): Frontend communicates to backend using GraphQL. Server is implemented using Apollo Server.
4. [Apollo Client](https://www.apollographql.com/docs/react/): Frontend uses Apollo Client to send GraphQL queries. It uses [normalised cache](https://www.apollographql.com/docs/react/caching/overview) for React's state management.
5. [GraphQL Codegen](https://the-guild.dev/graphql/codegen): For typescript code generation for GraphQL
6. [Shadcn UI](https://ui.shadcn.com/docs): Component library that uses Radix UI under the hood
7. [Radix UI](https://www.radix-ui.com/): Component library

The goal of this exercise is to evaluate

1. Your understanding of AWS and ability to work with infrastructure.
2. Your understanding of Frontend concepts and React.
3. You understanding of Backend and AWS.
4. Your ability to research, figure out things and complete the given task.

The exercise is broken down into 4 parts.

1. Setup local dev environment
2. Add ability to edit task
3. Add ability to delete task
4. Deploy the final application to AWS

This boilerplate repo already has everything implemented other than "edit task" and "delete task". You can check out the [example application](https://exercise.develop.memories.net) to see what the expected end result looks like.
AlThough not necessary, feel free to make changes where you think is appropriate.

All of the necessary frontend components are already built and are available in `components/ui` directory.

This exercise should take you approximately between 1 - 2 hours depending your familarity with the technologies used. Though time taken is not factored towards the evaluation, we encourage you not to spend crazy hours.

## Prerequisite

1. AWS Account
2. AWS CLI configured

You are required to have an AWS Account where you can do the development work and deploy the final result. Before you can work on the application, you would also need you AWS CLI configured.
Though not required, we encourage you to use [AWS Vault](https://github.com/99designs/aws-vault) for logging into your AWS account from CLI.

If you are using `aws-vault` you will need to prefix all the commands in the examples with:

```
aws-vault exec <your-profile> -- command to run
```

## Part 1: Set up local dev environment

Firstly, create a file called `.env` at the root of the application and add `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

Then, run sst development server

```bash
yarn sst:dev
```

Once `sst:dev` is ready, then in another window, run the nextjs development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You can access the GraphQL playground at `http://localhost:3000/api/graphql`.

**Approximate time:** 15 - 30 mins

## Part 2: Ability to Edit Task

To add ability to edit a task you will need to add a GraphQL Mutation in `app/api/graphql/route.ts`. The mutation will be

```graphql
editTask(input: EditTaskInput!): Task
```

Once you have added the GraphQL query, generate the Typescript types.

```bash
yarn generate
```

Add the resolver for the mutation. The resolver should modify the record in dynamodb and return the updated Task. Once you have done this, add the UI in the frontend to complete the feature.
Only specified properties of the Task should be updated. For example, if I specify only `priority` to be updated, everything else should remain the same and priority should be updated.

**Approximate time:** 30 - 45 mins

## Part 3: Ability to Delete Task

To add ability to delete a task you will need to add a GraphQL Mutation in `app/api/graphql/route.ts`. The mutation will be

```graphql
removeTask(taskId: ID!): Boolean
```

Add the resolver for the mutation. The resolver should delete the record in dynamodb and return boolean value. Refer to the example site to see how the UI should look.

**Approximate time:** 30 mins

## Part 4: Deploy the final application

Finally, its time to deploy the final application with the new features. This time we will deploy the application to production variant.

```bash
yarn deploy --stage production
```

Once the deployment is completed, it will present you with the Cloudfront URL in the console. Copy the url and update the `NEXT_PUBLIC_SITE_URL` to the new URL.

```
## .env
## replace the url to your own url
NEXT_PUBLIC_SITE_URL=https://dq6bjiltj7hga.cloudfront.net
```

Then, deploy the application again using the same command.

Once the deployment is completed, visit the url, and the application should now be accessible. Test the application to make sure everything is working as expected.

**Approximate time:** 15 mins

## Submission

You will need to submit the url to the deployed application and the code.

1. Create a private Github Repo then push your code. Grant permissions to:

   - Brenton Worley: [brentonworley](https://github.com/brentonworley)
   - Subash Adhikari: [adikari](https://github.com/adikari)

2. Send an email to the Memories HR or Hiring representative that you have been in touch with and provide the following information:
   - URL for the deployed application
   - URL for your Github Repo
