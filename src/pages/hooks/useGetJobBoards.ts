import { useEffect, useState } from 'react';
import { API_URL } from '@root/utils/constants';
import { useQuery } from '@tanstack/react-query';

const fetchJobBoards = async () => {
  console.log('Fetching from API');
  const { data } = await fetch(`${API_URL}/api/jobBoards`, {
    credentials: 'include', // This will send cookies even for requests to a different domain
  }).then(response => response.json());

  chrome.storage.local.set({ ['jobBoards']: data });

  return data;
};

const fetchCache = async (url: string) => {
  console.log('Fetching from cache');
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([url], function (result) {
      if (result[url]) {
        resolve(result[url]);
      } else {
        reject('No cache found');
      }
    });
  });
};

export const useGetJobBoards = () => {
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const fetchWithCacheFallback = async () => {
    if (isFirstFetch) {
      setIsFirstFetch(false);
      const cachedQuery = await fetchCache('jobBoards');
      if (cachedQuery) {
        return cachedQuery;
      } else {
        return await fetchJobBoards();
      }
    }

    return await fetchJobBoards();
  };

  const query = useQuery({
    queryKey: ['jobBoards'],

    queryFn: fetchWithCacheFallback,
  });

  useEffect(() => {
    console.log('isFirstFetch: ', isFirstFetch);
    if (!isFirstFetch) {
      console.log('Should refetch from API');
      query.refetch();
    }
  }, [isFirstFetch]);

  return query;
};
