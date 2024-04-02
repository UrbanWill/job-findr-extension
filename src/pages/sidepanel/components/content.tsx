import { useState, useEffect } from 'react';
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
      jobUrl: '',
      jobDescription: '',
      jobBoardId: '',
      jobBoardListId: '',
    },
  });

  const handleMessage = (request: { type: 'URL_CHANGE' | 'TAB_SWITCH'; url: string; text: string }) => {
    if (request.type === 'URL_CHANGE') {
      form.setValue('jobUrl', request.url);
    } else if (request.type === 'TAB_SWITCH') {
      form.setValue('jobUrl', request.url);
    } else if (request.type === 'highlightedText') {
      form.setValue('jobDescription', request.text);
    }
  };

  useEffect(() => {
    // Get the current tab URL on mount
    chrome.tabs.query({ active: true, currentWindow: true }, function ([currentTab]) {
      form.setValue('jobUrl', currentTab.url ?? '');
    });

    // Add message listener when component mounts
    chrome.runtime.onMessage.addListener(handleMessage);

    // Remove message listener when component unmounts
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const contentRenderer: Record<typeof content, JSX.Element> = {
    form: <CreateJobApplicationForm setContent={setContent} form={form} />,
    success: <CreateJobApplicationSuccess form={form} />,
  };

  return <div className="w-full">{contentRenderer[content]}</div>;
}
