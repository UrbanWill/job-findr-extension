import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useCreateJobApplication } from '@/shared/hooks/useCreateJobApplication';
import JobBoardFormField from './job-board-form-field';
import JobListFormField from './job-list-form-field';

interface CreateJobApplicationFormProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  setContent: (content: 'form' | 'success') => void;
  focusedFieldRef: React.MutableRefObject<keyof z.output<typeof JobApplicationFormSchema>>;
}

export default function CreateJobApplicationForm({ setContent, form, focusedFieldRef }: CreateJobApplicationFormProps) {
  const { mutate: createJobApplication, isPending } = useCreateJobApplication({
    handleSuccess: () => setContent('success')
  });

  const selectedJobBoardId = form.watch('jobBoardId');

  const canSubmit = !isPending && form.formState.isValid;

  const onSubmit = (values: z.output<typeof JobApplicationFormSchema>) => {
    createJobApplication(values);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    focusedFieldRef.current = e.target.name as keyof z.output<typeof JobApplicationFormSchema>;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col min-h-full flex-grow space-y-6">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="Job title" onFocus={handleFocus} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="Company name" onFocus={handleFocus} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobUrl"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Job Url</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="Job url" />
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
                  onFocus={handleFocus}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <JobBoardFormField form={form} selectedJobBoardId={selectedJobBoardId} isPending={isPending} />
          <JobListFormField form={form} selectedJobBoardId={selectedJobBoardId} isPending={isPending} />
        </div>
        <Button disabled={isPending || !canSubmit} type="submit">
          Create job application
        </Button>
      </form>
    </Form>
  );
}
