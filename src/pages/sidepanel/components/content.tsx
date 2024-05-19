import { useState, useEffect, useRef } from 'react';
import CreateJobApplicationForm from './create-job-application-form';
import CreateJobApplicationSuccess from './create-job-application-success';
import CreateFirstBoard from './create-first-board';
import { JobApplicationFormSchema, JobApplicationFormType } from '@/shared/schemas/form-schemas';
import { useGetJobBoards } from '@/shared/hooks/useGetJobBoards';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type Content = 'form' | 'success' | 'createJobBoard';

export default function Content() {
  const { data: jobBoards } = useGetJobBoards();
  const [content, setContent] = useState<Content>(jobBoards?.length ? 'form' : 'createJobBoard');
  const focusedFieldRef = useRef<keyof JobApplicationFormType>('jobTitle');

  const fieldsToFocus: Array<keyof JobApplicationFormType> = ['jobTitle', 'companyName', 'jobDescription'];

  const form = useForm<z.output<typeof JobApplicationFormSchema>>({
    resolver: zodResolver(JobApplicationFormSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      jobUrl: '',
      jobDescription: '',
      jobBoardId: '',
      jobBoardListId: ''
    }
  });

  const handleTextSelection = (text: string) => {
    form.setValue(focusedFieldRef.current, text);
    form.trigger(focusedFieldRef.current);
    if (focusedFieldRef.current !== 'jobDescription') {
      focusedFieldRef.current = fieldsToFocus[fieldsToFocus.indexOf(focusedFieldRef.current) + 1];
    }
  };

  const handleMessage = (request: { type: 'URL_CHANGE' | 'TAB_SWITCH'; url: string; text: string }) => {
    if (request.type === 'URL_CHANGE') {
      form.setValue('jobUrl', request.url);
    } else if (request.type === 'TAB_SWITCH') {
      form.setValue('jobUrl', request.url);
    } else if (request.type === 'highlightedText') {
      handleTextSelection(request.text);
      console.log(request.text);
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
    form: <CreateJobApplicationForm setContent={setContent} form={form} focusedFieldRef={focusedFieldRef} />,
    success: <CreateJobApplicationSuccess form={form} setContent={setContent} />,
    createJobBoard: <CreateFirstBoard />
  };

  return <div className="w-full">{contentRenderer[content]}</div>;
}
