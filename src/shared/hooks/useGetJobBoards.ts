import { API_URL } from '@root/utils/constants';
import { useQuery } from '@tanstack/react-query';
import useStorage from '@src/shared/hooks/useStorage';
import { jobBoardsStorage } from '@src/shared/storages/data';
import { JOB_BOARDS } from '@root/utils/query-keys';
import { JobBoardsSchema } from '../storages/data/schemas';
import { useAuthContext } from './useAuthContext';

export const useGetJobBoards = () => {
  const jobBoardsCache = useStorage(jobBoardsStorage);
  const { isAuth } = useAuthContext();

  const fetchJobBoards = async () => {
    const { data } = await fetch(`${API_URL}/api/jobBoards`, {
      credentials: 'include', // This will send cookies even for requests to a different domain
    }).then(response => response.json());

    const validatedFields = JobBoardsSchema.parse(data);

    jobBoardsStorage.update(validatedFields);

    return validatedFields;
  };

  const query = useQuery({
    queryKey: [JOB_BOARDS],
    queryFn: fetchJobBoards,
    initialData: jobBoardsCache,
    enabled: isAuth,
  });

  return query;
};
