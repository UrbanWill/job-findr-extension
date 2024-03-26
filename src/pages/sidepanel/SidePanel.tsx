import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import Login from '@/components/login';

const SidePanel = () => {
  const { isAuth } = useAuthContext();

  return <>{isAuth ? <div>Content</div> : <Login />}</>;
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
