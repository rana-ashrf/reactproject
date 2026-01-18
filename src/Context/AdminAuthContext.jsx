import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const adminLogin = (adminData) => {
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const adminLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
