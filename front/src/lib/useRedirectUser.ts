import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useRedirectUser(url: string) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.data.level === 'CLIENTE') {
      navigate(url);
    }
  }, [navigate, url, user?.data.level]);
}
