import React, { useContext, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import CreateDesign from './pages/CreateDesign';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import { AppContext } from './context/Provider';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const { user, isLoading } = useContext(AppContext);
  const location = useLocation();

  // Show loading spinner while authentication is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base-content/70">Loading...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (
      !user &&
      (location.pathname === '/generate' || location.pathname === '/explore')
    ) {
      toast.error('Please login first');
    }
  }, [user, location.pathname]);

  const hideLayoutRoutes = ['/login', '/signup', '/forgot-password'];

  return (
    <div>
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/explore"
          element={user ? <Explore /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/generate"
          element={user ? <CreateDesign /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
      </Routes>

      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}

      <Toaster position="right-top" reverseOrder={false} />
    </div>
  );
};

export default App;
