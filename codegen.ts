import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './app/api/graphql/route.ts',
  overwrite: true,
  ignoreNoDocuments: true,
  documents: 'app/**/*.tsx',
  generates: {
    'generated/server/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../../app/api/graphql/route#Context'
      }
    },
    'generated/client/': {
      preset: 'client'
    }
  },
  hooks: {
    afterAllFileWrite: 'prettier --write generated'
  }
};

export default config;
