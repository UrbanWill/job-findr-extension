import { useEffect } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { useGetJobBoardLists } from '@/shared/hooks/useGetJobBoardLists';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';

interface JobListFormFieldProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  selectedJobBoardId: string;
}

export default function JobListFormField({ form, selectedJobBoardId }: JobListFormFieldProps) {
  const { data: jobBoardLists, isLoading: jobBoardListsLoading } = useGetJobBoardLists({
    jobBoardId: selectedJobBoardId
  });

  useEffect(() => {
    form.setValue('jobBoardListId', jobBoardLists?.[0]?.id ?? '');
  }, [selectedJobBoardId, jobBoardLists]);

  return (
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
                  label: list.name
                })) ?? []
              }
              isLoading={jobBoardListsLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
