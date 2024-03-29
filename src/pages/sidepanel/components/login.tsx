import { Button } from '../../../components/ui/button';
import { API_URL } from '@root/utils/constants';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <h1>Please Login to use the extension.</h1>
      <Button
        onClick={() => {
          window.open(`${API_URL}/auth/login`, '_blank');
          window.close();
        }}>
        Login
      </Button>
    </div>
  );
}
