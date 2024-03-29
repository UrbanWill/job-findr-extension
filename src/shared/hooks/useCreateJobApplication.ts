import { API_URL } from '@root/utils/constants';
import { useMutation } from '@tanstack/react-query';
import { JobApplicationFormType } from '@/shared/schemas/form-schemas';

export const useCreateJobApplication = () => {
  const fetchJobBoardList = async (formData: JobApplicationFormType) => {
    const { data } = await fetch(`${API_URL}/api/jobApplication`, {
      method: 'POST',
      credentials: 'include', // This will send cookies even for requests to a different domain
      body: JSON.stringify({ formData }),
    }).then(response => response.json());

    return data;
  };

  const query = useMutation({
    mutationFn: fetchJobBoardList,
  });

  return query;
};
