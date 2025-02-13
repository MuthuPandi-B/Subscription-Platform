
import API from "../api/api";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Add token state

  

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken)
      console.log("Token found:", token); // Debugging: Check if token is present
      const fetchUserInfo = async () => {
        try {
          const { data } = await API.get("/auth/user-info",{
            headers:{Authorization:`Bearer ${storedToken}`},
          });
          console.log("User data fetched:", data); // Debugging: Check fetched user data
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user info:", error); // Debugging: Log any errors
        }
      };

      fetchUserInfo();
    } else {
      console.log("No token found"); // Debugging: Log if no token is found
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
