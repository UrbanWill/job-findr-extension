import { useState } from 'react';
import CreateJobApplicationForm from './create-job-application-form';
import CreateJobApplicationSuccess from './create-job-application-success';
import { JobApplicationFormSchema } from '@/shared/schemas/form-schemas';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function Content() {
  const [content, setContent] = useState<'form' | 'success'>('form');

  const form = useForm<z.output<typeof JobApplicationFormSchema>>({
    resolver: zodResolver(JobApplicationFormSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      jobBoardId: '',
      jobBoardListId: '',
    },
  });

  const contentRenderer: Record<typeof content, JSX.Element> = {
    form: <CreateJobApplicationForm setContent={setContent} form={form} />,
    success: <CreateJobApplicationSuccess form={form} />,
  };

  return <div className="w-full">{contentRenderer[content]}</div>;
}
