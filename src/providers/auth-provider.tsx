import { createContext } from 'react';
import useIsAuth from '@src/shared/hooks/useIsAuth';

interface AuthContextType {
  isAuth: boolean;
}

const initialContextState: AuthContextType = {
  isAuth: false,
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useIsAuth();
  const value = { isAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
