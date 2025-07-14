import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setuser] = useState(false);
  const [theme, settheme] = useState("dark");
  const navigate = useNavigate();

  // Check for saved user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser);
        setuser(userData);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      settheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Logout function
  const logout = () => {
    setuser(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/');
  };

  const value = {
    user,
    setuser,
    theme,
    settheme,
    navigate,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
