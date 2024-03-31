import { useState } from 'react';
import CreateJobApplicationForm from './create-job-application-form';
import CreateJobApplicationSuccess from './create-job-application-success';

export default function Content() {
  const [content, setContent] = useState<'form' | 'success'>('form');

  const contentRenderer: Record<typeof content, JSX.Element> = {
    form: <CreateJobApplicationForm setContent={setContent} />,
    success: <CreateJobApplicationSuccess />,
  };

  return <div className="w-full">{contentRenderer[content]}</div>;
}
