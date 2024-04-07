import TasksTable from 'app/(tasks)/table';
import { Suspense } from 'react';
import AddTaskButton from 'app/(tasks)/add';
import { Icons } from 'ui/icons';

const Loading = () => (
  <div className="flex justify-center p-8">
    <Icons.spinner />
  </div>
);

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main className="container mt-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Task List</h2>
        <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <AddTaskButton />
        </div>
        <div className="rounded-md border min-h-38">
          <Suspense fallback={<Loading />}>
            <TasksTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
