import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, me as apiMe } from '../api/auth';

export const AuthContext = createContext({
  user: null, setUser: () => {},
  login: async () => {}, logout: async () => {},
  loading: true
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ (async ()=>{
    try {
      const t = await AsyncStorage.getItem('token');
      if (t) {
        const { data } = await apiMe();
        setUser(data);
      }
    } finally { setLoading(false); }
  })(); }, []);

  const login = async (email, password) => {
    const { data } = await apiLogin({ email, password });
    await AsyncStorage.setItem('token', data.token);
    const me = await apiMe();
    setUser(me.data);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
