import { Button } from '@/components/ui/button';

export default function CreateJobApplicationSuccess() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow flex flex-col space-y-6 justify-center items-center">
        <h1>Job application saved successfully to:</h1>
        <div className="text-2xl font-semibold tracking-wide">Placeholder</div>
        <Button onClick={() => {}}>View in Job Findr!</Button>
      </div>
      <div className="flex justify-end p-4">
        <Button onClick={window.close} className="">
          Close
        </Button>
      </div>
    </div>
  );
}
