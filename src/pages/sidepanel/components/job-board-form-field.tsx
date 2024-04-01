import { useEffect } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';

interface JobBoardFormFieldProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  selectedJobBoardId: string;
}

export default function JobBoardFormField({ form, selectedJobBoardId }: JobBoardFormFieldProps) {
  const { data: jobBoards, isLoading: isJobBoardsLoading } = useGetJobBoards();

  useEffect(() => {
    if (jobBoards && !selectedJobBoardId) {
      form.setValue('jobBoardId', jobBoards?.[jobBoards.length - 1]?.id);
    }
  }, [jobBoards]);

  return (
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
  );
}
