import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { API_URL } from '@root/utils/constants';
import useStorage from '@/shared/hooks/useStorage';
import { jobBoardListsStorage } from '@src/shared/storages/data';
import { Content } from './content';

interface CreateJobApplicationSuccessProps {
  form: UseFormReturn<z.output<typeof JobApplicationFormSchema>>;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}

export default function CreateJobApplicationSuccess({ form, setContent }: CreateJobApplicationSuccessProps) {
  const jobBoardId = form.getValues('jobBoardId');
  const jobBoardListId = form.getValues('jobBoardListId');

  const jobBoardListsCache = useStorage(jobBoardListsStorage);
  const selectedJobList = jobBoardListsCache?.[jobBoardId]?.find(list => list.id === jobBoardListId);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow flex flex-col space-y-6 justify-center items-center">
        <h1>Job application saved successfully to:</h1>
        <div className="text-2xl font-semibold tracking-wide">{selectedJobList?.name}</div>
        <Button
          onClick={() => {
            window.open(`${API_URL}/dashboard/boards/${jobBoardId}`, '_blank');
          }}>
          View in Job Findr!
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setContent('form');
            form.reset();
          }}>
          Keep applying
        </Button>
        <Button onClick={window.close}>Close</Button>
      </div>
    </div>
  );
}
