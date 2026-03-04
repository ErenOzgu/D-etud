import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simüle API
    setUser({ name: 'Eren Özgü', initials: 'EÖ', role: 'student', email, color: '#7c6dfa22', tc: '#b0a8ff' });
    setLoading(false);
  };

  const quickLogin = (role) => {
    const profiles = {
      student: { name: 'Eren Özgü',     initials: 'EÖ', role: 'student', email: 'eren@detud.com',  color: '#7c6dfa22', tc: '#b0a8ff' },
      teacher: { name: 'Dr. Ayşe Kaya', initials: 'AK', role: 'teacher', email: 'ayse@detud.com',  color: '#4eeaa022', tc: '#4eeaa0' },
      admin:   { name: 'Admin',          initials: 'AD', role: 'admin',   email: 'admin@detud.com', color: '#fa6d8e22', tc: '#fa6d8e' },
    };
    setUser(profiles[role]);
  };

  const register = async ({ name, email, role }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const initials = name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
    setUser({ name, initials, role, email, color: '#7c6dfa22', tc: '#b0a8ff' });
    setLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, quickLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
