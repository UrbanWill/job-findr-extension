import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { API_URL } from '@root/utils/constants';
import { useGetJobBoards } from '@src/shared/hooks/useGetJobBoards';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/shared/hooks/useAuthContext';

const SidePanel = () => {
  const { data: jobBoards } = useGetJobBoards();

  const { isAuth } = useAuthContext();

  return (
    <div>
      <header>
        <div className="bg-red-500">Is auth: {isAuth.toString()}</div>
        {!isAuth && (
          <Button
            onClick={() => {
              window.open(`${API_URL}/auth/login`, '_blank');
              window.close();
            }}>
            Login
          </Button>
        )}
        {jobBoards && jobBoards?.map((jobBoard: any) => <div key={jobBoard.id}>{jobBoard.name}</div>)}
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
