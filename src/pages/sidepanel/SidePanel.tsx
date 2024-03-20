import { useEffect, useState } from 'react';
import '@pages/sidepanel/SidePanel.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { API_URL } from '@root/utils/constants';

const SidePanel = () => {
  const [isAuth, setIsAuth] = useState(false);
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

  const handleClick = async () => {
    console.log('button clicked');

    const data = await fetch(`${API_URL}/api/jobBoards`, {
      credentials: 'include', // This will send cookies even for requests to a different domain
    }).then(response => response.json());

    console.log({ data });
  };

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
        <button type="button" className="bg-blue-500" onClick={handleClick}>
          Fetch data
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
