import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You could fetch user info using the token here
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
          console.warn("Token expired");
          localStorage.removeItem("accessToken");
          return;
      }

      setUser({id:decoded.id, name: decoded.name, email: decoded.email }); // Adjust based on your token structure
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("accessToken");
    }
    }

    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // if (storedUser) {
    //   setUser(storedUser);
    // }
  }, [],);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
