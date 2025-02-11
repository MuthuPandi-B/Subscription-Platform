// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [role, setRole] = useState("student"); // Default role is student

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     if (token && storedRole) {
//       setRole(storedRole); // ✅ Set role from localStorage
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ role, setRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};
