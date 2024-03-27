import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';

export default function CreateJobApplicationForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedJobList, setSelectedJobList] = useState<string | null>('clu9h5w33004f3plbp8pjprz9');
  const { data: jobBoards, isLoading } = useGetJobBoards();

  const createJobApplication = async (values: z.output<typeof JobApplicationFormSchema>) => {
    console.log({ values });
  };

  const form = useForm<z.output<typeof JobApplicationFormSchema>>({
    resolver: zodResolver(JobApplicationFormSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      jobBoardId: jobBoards?.[jobBoards.length - 1]?.id ?? '',
      jobBoardListId: selectedJobList ?? '',
    },
  });

  const onSubmit = (values: z.output<typeof JobApplicationFormSchema>) => {
    console.log('Submitted form');
    startTransition(() => {
      createJobApplication(values);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Company name" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Job title" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Job description</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Job description" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobBoardId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenuRadioMenu
                    selectedValue={field.value}
                    onHandleChange={field.onChange}
                    buttonLabel={jobBoards?.find(jobBoard => jobBoard.id === field.value)?.name ?? 'Select job board'}
                    label="Select job board"
                    options={
                      jobBoards?.map(jobBoard => ({
                        value: jobBoard.id,
                        label: jobBoard.name,
                      })) ?? []
                    }
                    isLoading={isLoading}
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
