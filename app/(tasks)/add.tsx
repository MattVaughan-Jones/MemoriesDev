'use client';
import { Button } from 'ui/button';
import { graphql } from 'generated/client';
import { gql, useMutation } from '@apollo/client';
import { Input } from 'ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'ui/form';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from 'ui/sheet';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskPriority } from 'generated/server';
import { RadioGroup, RadioGroupItem } from 'ui/radio-group';
import { useToast } from 'ui/use-toast';
import { useState } from 'react';
import { Icons } from 'ui/icons';

const addTaskDocument = graphql(`
  mutation AddTask($input: AddTaskInput!) {
    addTask(input: $input) {
      id
      title
      priority
      status
    }
  }
`);

const formSchema = z.object({
  title: z.string().min(2).max(50),
  priority: z.nativeEnum(TaskPriority)
});

export default function AddTaskButton() {
  const [addTask, { loading }] = useMutation(addTaskDocument, {
    update(cache, { data: result }) {
      cache.modify({
        fields: {
          all(existingTasks = []) {
            const tasksRef = cache.writeFragment({
              data: result?.addTask,
              fragment: gql`
                fragment NewTask on Task {
                  id
                  title
                  priority
                  status
                }
              `
            });
            return [...existingTasks, tasksRef];
          }
        }
      });
    }
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      priority: TaskPriority.Low
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addTask({ variables: { input: values } });

    setOpen(false);
    toast({ description: 'Your task is added' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Icons.plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </SheetTrigger>
      <SheetContent position="right">
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
          <SheetDescription>Add your task description.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="get groceries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <RadioGroup
                      className="grid grid-cols-3 gap-4"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      {Object.entries(TaskPriority).map(([value, key]) => {
                        return (
                          <FormItem key={key}>
                            <FormLabel
                              htmlFor={key}
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            >
                              <FormControl>
                                <RadioGroupItem value={key} id={key} className="sr-only" />
                              </FormControl>
                              {value}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                Add Task
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
