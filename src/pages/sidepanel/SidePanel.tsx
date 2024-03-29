import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { useAuthContext } from '@/shared/hooks/useAuthContext';
import Login from '@/pages/sidepanel/components/login';
import Content from '@/pages/sidepanel/components/content';

const SidePanel = () => {
  const { isAuth } = useAuthContext();

  return <>{isAuth ? <Content /> : <Login />}</>;
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
