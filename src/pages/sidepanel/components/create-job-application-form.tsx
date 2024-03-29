import { useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';
import { useGetJobBoardLists } from '@/shared/hooks/useGetJobBoardLists';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';
import { Textarea } from '../../../components/ui/textarea';
import { useCreateJobApplication } from '@/shared/hooks/useCreateJobApplication';

export default function CreateJobApplicationForm() {
  const { data: jobBoards, isLoading: isJobBoardsLoading } = useGetJobBoards();
  const { mutate: createJobApplication, isPending } = useCreateJobApplication();

  const form = useForm<z.output<typeof JobApplicationFormSchema>>({
    resolver: zodResolver(JobApplicationFormSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      jobBoardId: jobBoards?.[jobBoards.length - 1]?.id ?? '',
      jobBoardListId: '',
    },
  });

  const selectedJobBoardId = form.watch('jobBoardId');

  const { data: jobBoardLists, isLoading: jobBoardListsLoading } = useGetJobBoardLists({
    isEnabled: !!jobBoards,
    jobBoardId: selectedJobBoardId,
  });

  useEffect(() => {
    form.setValue('jobBoardListId', jobBoardLists?.[0]?.id ?? '');
  }, [selectedJobBoardId, jobBoardLists]);

  const onSubmit = (values: z.output<typeof JobApplicationFormSchema>) => {
    createJobApplication(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col min-h-full flex-grow space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="Company name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="Job title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-grow space-y-2">
              <FormLabel>Job description</FormLabel>
              <FormControl className="flex-grow">
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="Job description"
                  className="resize-none h-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="jobBoardId"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <DropdownMenuRadioMenu
                    triggerClassName="w-full"
                    selectedValue={field.value}
                    onHandleChange={(value: string) => {
                      field.onChange(value);
                      form.setValue('jobBoardListId', '');
                    }}
                    buttonLabel={jobBoards?.find(jobBoard => jobBoard.id === field.value)?.name ?? 'Select job board'}
                    label="Select job board"
                    options={
                      jobBoards?.map(jobBoard => ({
                        value: jobBoard.id,
                        label: jobBoard.name,
                      })) ?? []
                    }
                    isLoading={isJobBoardsLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobBoardListId"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <DropdownMenuRadioMenu
                    triggerClassName="w-full"
                    selectedValue={field.value}
                    onHandleChange={field.onChange}
                    buttonLabel={jobBoardLists?.find(list => list.id === field.value)?.name ?? 'Select job list'}
                    label="Select job list"
                    options={
                      jobBoardLists?.map(list => ({
                        value: list.id,
                        label: list.name,
                      })) ?? []
                    }
                    isLoading={jobBoardListsLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} type="submit">
          Create job application
        </Button>
      </form>
    </Form>
  );
}
