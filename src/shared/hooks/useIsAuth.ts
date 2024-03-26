import { useState, useEffect } from 'react';
import { API_URL } from '@root/utils/constants';

const SESSION_TOKEN = 'authjs.session-token';

export default function isAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const getIsAuth = async () =>
    await chrome.runtime.sendMessage(
      { action: 'getCookie', details: { url: API_URL, name: SESSION_TOKEN } },
      authCookie => {
        setIsAuth(!!authCookie.cookieValue);
      },
    );

  useEffect(() => {
    getIsAuth();
  }, []);

  return { isAuth };
}
