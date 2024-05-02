import { useEffect } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';

interface JobBoardFormFieldProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  selectedJobBoardId: string;
  isPending: boolean;
}

export default function JobBoardFormField({ form, selectedJobBoardId, isPending }: JobBoardFormFieldProps) {
  const { data: jobBoards, isLoading: isJobBoardsLoading } = useGetJobBoards();

  useEffect(() => {
    if (jobBoards && !selectedJobBoardId) {
      form.setValue('jobBoardId', jobBoards?.[jobBoards.length - 1]?.id);
    }
  }, [form, jobBoards, selectedJobBoardId]);

  return (
    <FormField
      control={form.control}
      name="jobBoardId"
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Board</FormLabel>
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
                  label: jobBoard.name
                })) ?? []
              }
              isLoading={isJobBoardsLoading}
              isDisabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
