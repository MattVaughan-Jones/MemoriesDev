import { vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' })
}));

vi.mock('sst/node/table', () => ({
  Table: {
    Task: {
      tableName: 'task-table'
    }
  }
}));
