"use client";

import { useEffect, useState, PropsWithChildren, createContext } from "react";
import { usePathname } from "next/navigation";

type AuthContextValue = {
  isAuth: boolean;
  isLoading: boolean;
};

const initialState = {
  isAuth: false,
  isLoading: false,
};

export const AuthContext = createContext<AuthContextValue>(initialState);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      setIsAuth(true);
      setIsLoading(false);
    } else {
      setIsAuth(false);
      setIsLoading(false);
    }
  }, [pathname]);

  const authContextValue: AuthContextValue = {
    isAuth,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
