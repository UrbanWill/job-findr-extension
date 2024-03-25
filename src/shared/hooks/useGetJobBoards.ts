import { API_URL } from '@root/utils/constants';
import { useQuery } from '@tanstack/react-query';
import useStorage from '@src/shared/hooks/useStorage';
import { jobBoardsStorage } from '@src/shared/storages/data';

export const useGetJobBoards = () => {
  const jobBoardsCache = useStorage(jobBoardsStorage);

  const fetchJobBoards = async () => {
    console.log('Fetching from API');
    const { data } = await fetch(`${API_URL}/api/jobBoards`, {
      credentials: 'include', // This will send cookies even for requests to a different domain
    }).then(response => response.json());

    jobBoardsStorage.update(data);

    return data;
  };

  const query = useQuery({
    queryKey: ['jobBoards'],
    queryFn: fetchJobBoards,
    initialData: jobBoardsCache,
  });

  return query;
};
