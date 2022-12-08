import { useState, useEffect } from 'react';
import { auth } from './firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('authUser') || '{}'),
  );

  // Listen for authentication changes in the currently authenticated user
  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener?.();
  }, [auth]);

  return { user };
}