import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  /* 🔐 LOGIN */
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /* 🔓 LOGOUT */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /* 🚨 AUTO LOGOUT IF USER IS BLOCKED */
  useEffect(() => {
    if (!user) return;

    const checkBlockedStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${user.id}`
        );

        if (res.data.blocked) {
          alert("Your account has been blocked by admin");
          logout();
        }
      } catch (err) {
        console.error("User verification failed");
        logout();
      }
    };

    checkBlockedStatus();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
