import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import CreateDesign from './pages/CreateDesign'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import { useContext } from 'react'
import { AppContext } from './context/Provider'
import { Toaster } from 'react-hot-toast'


const App = () => {
  const {user}=useContext(AppContext)
  return (
    <div className=''>
      {useLocation().pathname !== '/login' && useLocation().pathname !== '/signup' && useLocation().pathname !== '/forgot-password' && (
        <Navbar />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={user?<Explore />:<Navigate to='/'/>} />
        <Route path='/profile' element={user?<Profile />:<Navigate to='/'/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/generate' element={user?<CreateDesign />:<Navigate to='/'/>} />
        <Route path='/about' element={user?<About />:<Navigate to='/'/>} />
      </Routes>
      {useLocation().pathname !== '/login' && useLocation().pathname !== '/signup' && useLocation().pathname !== '/forgot-password' && (
        <Footer />
      )}
      <Toaster/>
    </div>
  )
}

export default App
