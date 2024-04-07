import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    exclude: ['**/node_modules/**', 'src/**/*.int.*'],
    setupFiles: ['test-setup.tsx'],
    environment: 'jsdom',
    root: '.',
    clearMocks: true,
    globals: true,
    threads: true,
    testTimeout: 5000,
    mockReset: true,
    coverage: {
      provider: 'v8',
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
      reporter: ['text', 'lcov'],
      exclude: ['test', '**/*.test.ts', '**/*.test.tsx', 'generated', 'lib/graphql']
    }
  }
});
