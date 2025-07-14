import React from 'react'
import { Route } from 'react-router-dom'
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


const App = () => {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/generate' element={<CreateDesign />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
