import { useEffect } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { useGetJobBoardLists } from '@/shared/hooks/useGetJobBoardLists';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';

interface JobListFormFieldProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  selectedJobBoardId: string;
  isPending: boolean;
}

export default function JobListFormField({ form, selectedJobBoardId, isPending }: JobListFormFieldProps) {
  const { data: jobBoardLists, isLoading: jobBoardListsLoading } = useGetJobBoardLists({
    jobBoardId: selectedJobBoardId
  });

  const selectedJobBoardListId = form.getValues('jobBoardListId');

  useEffect(() => {
    if (!selectedJobBoardListId && jobBoardLists?.length > 0) {
      form.setValue('jobBoardListId', jobBoardLists?.[0]?.id ?? '');
    }
  }, [selectedJobBoardId, jobBoardLists, form, selectedJobBoardListId]);

  return (
    <FormField
      control={form.control}
      name="jobBoardListId"
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>List</FormLabel>
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
                  label: list.name
                })) ?? []
              }
              isLoading={jobBoardListsLoading}
              isDisabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
