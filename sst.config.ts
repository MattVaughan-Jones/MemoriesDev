import { SSTConfig } from 'sst';
import stack from 'infra/stack';

export default {
  config: () => ({
    name: 'hiring-exercise',
    region: 'us-east-1'
  }),
  stacks(app) {
    app.stack(stack);
  }
} satisfies SSTConfig;
