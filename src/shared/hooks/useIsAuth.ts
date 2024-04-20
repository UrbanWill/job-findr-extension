import { useState, useEffect } from 'react';
import { API_URL, SESSION_TOKEN } from '@root/utils/constants';

export default function useIsAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const getIsAuth = async () =>
    await chrome.runtime.sendMessage(
      { action: 'getCookie', details: { url: API_URL, name: SESSION_TOKEN } },
      authCookie => {
        setIsAuth(!!authCookie.cookieValue);
      }
    );

  useEffect(() => {
    getIsAuth();
  }, []);

  return { isAuth };
}
