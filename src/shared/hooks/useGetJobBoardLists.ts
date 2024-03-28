import { API_URL } from '@root/utils/constants';
import { useQuery } from '@tanstack/react-query';
import useStorage from '@src/shared/hooks/useStorage';
import { jobBoardListsStorage } from '@src/shared/storages/data';
import { JOB_BOARD_LISTS } from '@root/utils/query-keys';
import { JobBoardListsSchema } from '../storages/data/schemas';
import { useAuthContext } from './useAuthContext';

export const useGetJobBoardLists = ({ isEnabled, jobBoardId }: { isEnabled: boolean; jobBoardId: string }) => {
  const jobBoardsCache = useStorage(jobBoardListsStorage);
  const initialData = useStorage(jobBoardListsStorage)?.[jobBoardId] ?? [];
  const { isAuth } = useAuthContext();

  const fetchJobBoardList = async () => {
    const { data } = await fetch(`${API_URL}/api/jobBoardLists/${jobBoardId}`, {
      credentials: 'include', // This will send cookies even for requests to a different domain
    }).then(response => response.json());

    const validatedFields = JobBoardListsSchema.parse(data);

    jobBoardListsStorage.update({ ...jobBoardsCache, [jobBoardId]: validatedFields });

    return validatedFields;
  };

  const query = useQuery({
    queryKey: [JOB_BOARD_LISTS, jobBoardId],
    queryFn: fetchJobBoardList,
    initialData: initialData,
    enabled: isAuth && isEnabled,
  });

  return query;
};
