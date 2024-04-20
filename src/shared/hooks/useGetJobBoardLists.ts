import { API_URL } from '@root/utils/constants';
import { useQuery } from '@tanstack/react-query';
import useStorage from '@src/shared/hooks/useStorage';
import { jobBoardListsStorage, jobBoardsStorage } from '@src/shared/storages/data';
import { JOB_BOARD_LISTS } from '@root/utils/query-keys';
import { JobBoardListsSchema } from '../storages/data/schemas';
import { useAuthContext } from './useAuthContext';

export const useGetJobBoardLists = ({ jobBoardId }: { jobBoardId: string }) => {
  const jobBoardListsCache = useStorage(jobBoardListsStorage);
  const jobBoardsCache = useStorage(jobBoardsStorage);
  const latestJobBoardId = jobBoardsCache?.[jobBoardsCache.length - 1]?.id ?? '';
  // Note: There is a race condition issue here in the first render, where the jobBoardId is not yet available. Hence the reason to use the latestJobBoardId from cache as a fallback.
  const initialData = jobBoardListsCache?.[jobBoardId || latestJobBoardId] ?? [];
  const { isAuth } = useAuthContext();

  const fetchJobBoardList = async () => {
    const { data } = await fetch(`${API_URL}/api/jobBoardLists/${jobBoardId}`, {
      credentials: 'include' // This will send cookies even for requests to a different domain
    }).then(response => response.json());

    const validatedFields = JobBoardListsSchema.parse(data);

    jobBoardListsStorage.update({ ...jobBoardListsCache, [jobBoardId]: validatedFields });

    return validatedFields;
  };

  const query = useQuery({
    queryKey: [JOB_BOARD_LISTS, jobBoardId],
    queryFn: fetchJobBoardList,
    initialData: initialData,
    enabled: isAuth && !!jobBoardId
  });

  return query;
};
