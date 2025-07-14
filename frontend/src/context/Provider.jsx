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
    

    
    // Since we're using HTTP-only cookies, we just check if user data exists in localStorage
    if (savedUser) {
      try {
        // If savedUser is just "true", convert it to boolean
        if (savedUser === "true") {
          console.log('Setting user to true'); // Debug log
          setuser(true);
        } else {
          const userData = JSON.parse(savedUser);
          console.log('Setting user to:', userData); // Debug log
          setuser(userData);
        }
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
      }
    } else {
      console.log('No saved user found'); // Debug log
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
    navigate('/');
  };

  // Login function to properly set user and save to localStorage
  const login = (userData) => {
    console.log('Login called with:', { userData }); // Debug log
    
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setuser(userData);
    } else {
      localStorage.setItem("user", "true");
      setuser(true);
    }
    
    console.log('localStorage after login:', {
      user: localStorage.getItem("user")
    }); // Debug log
  };

  const value = {
    user,
    setuser,
    theme,
    settheme,
    navigate,
    logout,
    login
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
