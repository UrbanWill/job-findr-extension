import { Button } from '@/components/ui/button';
import { API_URL } from '@root/utils/constants';

export default function CreateFirstBoard() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow flex flex-col space-y-6 justify-center items-center">
        <h1>Create your fist Job Board on JobTrackr!</h1>
        <Button
          onClick={() => {
            window.open(`${API_URL}/dashboard/boards`, '_blank');
            window.close();
          }}>
          Create Job Board
        </Button>
      </div>
      <div className="flex justify-end p-4">
        <Button onClick={window.close} className="">
          Close
        </Button>
      </div>
    </div>
  );
}
