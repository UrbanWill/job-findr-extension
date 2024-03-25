import { useEffect, useState } from 'react';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { API_URL } from '@root/utils/constants';
import { useGetJobBoards } from '@src/shared/hooks/useGetJobBoards';

const SidePanel = () => {
  const [isAuth, setIsAuth] = useState(false);

  const { data: jobBoards } = useGetJobBoards();

  const getIsAuth = async () =>
    await chrome.runtime.sendMessage(
      { action: 'getCookie', details: { url: 'http://localhost:3000/', name: 'authjs.session-token' } },
      authCookie => {
        setIsAuth(!!authCookie.cookieValue);
      },
    );

  useEffect(() => {
    getIsAuth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>Is auth: {isAuth.toString()}</div>
        {!isAuth && (
          <button
            onClick={() => {
              window.open(`${API_URL}/auth/login`, '_blank');
              window.close();
            }}>
            Login
          </button>
        )}
        {jobBoards && jobBoards?.map((jobBoard: any) => <div key={jobBoard.id}>{jobBoard.name}</div>)}
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
