import { useEffect } from 'react';
import { DropdownMenuRadioMenu } from './shared/dropdown-radio-menu';
import { JobBoardType } from '@/shared/storages/data/schemas';

interface JobListDropdownProps {
  isLoading: boolean;
  jobBoards: JobBoardType[] | null;
  selectedJobBoard: JobBoardType | null;
  setSelectedJobBoard: (jobBoard: JobBoardType | null) => void;
}

export default function JobListDropdown({
  isLoading,
  jobBoards,
  selectedJobBoard,
  setSelectedJobBoard,
}: JobListDropdownProps) {
  useEffect(() => {
    if (!selectedJobBoard && jobBoards?.length) {
      // Select the newest job board by default
      setSelectedJobBoard(jobBoards[jobBoards.length - 1]);
    }
  }, [jobBoards, !!selectedJobBoard]);

  const handleJobBoardSelect = (value: string) => {
    const selectedJobBoard = jobBoards?.find(jobBoard => jobBoard.id === value);
    if (selectedJobBoard) {
      setSelectedJobBoard(selectedJobBoard);
    } else {
      console.error('Job board not found');
    }
  };

  return (
    <DropdownMenuRadioMenu
      selectedValue={selectedJobBoard?.id ?? ''}
      buttonLabel={selectedJobBoard?.name ?? 'Select job board'}
      label="Select job board"
      options={
        jobBoards?.map(jobBoard => ({
          value: jobBoard.id,
          label: jobBoard.name,
        })) ?? []
      }
      onHandleChange={handleJobBoardSelect}
      isLoading={isLoading}
    />
  );
}
