import {deleteCookie} from "cookies-next";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function useSession() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadSession = async () => {
    const headers = { Accept: 'application/json' };
    const response = await fetch('/api/auth/session', { method: 'GET', headers });
    if (!response.ok) return setLoading(false);
    const session = await response.json();
    setSession(session); setLoading(false);
  };
  const login = useCallback(async (email, password) => {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify({email, password});
    const response = await fetch('/api/auth/login', { method: 'POST', headers, body });
    return !!response.ok;
  }, []);
  const logout = useCallback(async () => {
    deleteCookie('auth.token');
    await router.replace('/login');
    return true;
  }, [router]);
  const register = async (firstname, lastname, email, password, code) => {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify({firstname, lastname, email, password, code});
    const response = await fetch('/api/auth/register', { method: 'POST', headers, body });
    return !!response.ok;
  };
  useEffect(() => {(async () => await loadSession())();}, [logout, login])
  return { session, loading, login, logout, register };
}
