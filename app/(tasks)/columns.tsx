'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from 'generated/client/graphql';
import RowActions from './actions';
import { Badge } from 'ui/badge';
import { cn } from 'lib/utils';
import { Icons } from 'ui/icons';
import { TaskPriority, TaskStatus } from 'generated/server';

const statuses = [
  {
    value: TaskStatus.Todo,
    label: 'Todo',
    icon: Icons.circle
  },
  {
    value: TaskStatus.InProgress,
    label: 'In Progress',
    icon: Icons.arrowUpCircle
  },
  {
    value: TaskStatus.Done,
    label: 'Done',
    icon: Icons.checkCircle
  },
  {
    value: TaskStatus.Cancelled,
    label: 'Canceled',
    icon: Icons.crossCircle
  }
];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('title')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = statuses.find(status => status.value === row.getValue('status'));

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = Object.values(TaskPriority).find(key => key === row.getValue('priority'));

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge
            className={cn('bg-emerald-500 text-emerald-50 hover:bg-emerald-500 capitalize', {
              'bg-rose-500 text-rose-50 hover:bg-rose-500': priority === TaskPriority.High,
              'bg-amber-500 text-amber-50 hover:bg-amber-500': priority === TaskPriority.Medium
            })}
          >
            {priority}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row} />
  }
];
