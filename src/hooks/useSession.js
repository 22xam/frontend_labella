import { useCallback, useEffect, useState } from "react";
import { login as loginService, logout as logoutService, me } from "../services/auth";

export function useSession() {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const checkSession = useCallback(async () => {
    setIsBootstrapping(true);
    try {
      const meUser = await me();
      setUser(meUser || null);
    } catch {
      setUser(null);
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signIn = useCallback(async (username, password) => {
    await loginService(username, password);
    const meUser = await me();
    setUser(meUser || { username });
    return meUser;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
    }
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    signIn,
    signOut,
    checkSession,
  };
}
