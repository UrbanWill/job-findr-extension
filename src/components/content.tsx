import { useState } from 'react';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';
import JobListDropdown from './job-list-dropdown';
import { JobBoardType } from '@/shared/storages/data/schemas';

export default function Content() {
  const [selectedJobBoard, setSelectedJobBoard] = useState<JobBoardType | null>(null);
  const { data: jobBoards, isLoading } = useGetJobBoards();
  return (
    <div>
      <div>Content</div>
      <JobListDropdown
        isLoading={isLoading}
        jobBoards={jobBoards}
        selectedJobBoard={selectedJobBoard}
        setSelectedJobBoard={setSelectedJobBoard}
      />
    </div>
  );
}
