import { LaunchScreen } from "@/view/components/LaunchScreen";
import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { localStoragekeys } from "../config/localStorageKeys";
import { User } from "../entities/User";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(token: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem(localStoragekeys.TOKEN);

    return !!storedToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStoragekeys.TOKEN, token);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStoragekeys.TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}