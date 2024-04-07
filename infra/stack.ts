import { StackContext, NextjsSite, Table } from 'sst/constructs';

export default function Stack({ stack }: StackContext) {
  const table = new Table(stack, 'Task', {
    stream: true,
    fields: {
      pk: 'string',
      sk: 'string'
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' }
  });

  const site = new NextjsSite(stack, 'HiringExercise', {
    bind: [table],
    warm: 1,
    environment: {
      NEXT_PUBLIC_SITE_URL: String(process.env.NEXT_PUBLIC_SITE_URL)
    }
  });

  stack.addOutputs({
    SiteUrl: site.url
  });
}
