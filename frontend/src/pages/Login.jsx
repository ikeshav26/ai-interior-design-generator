import React, { useState } from 'react'
import {
  Eye, EyeOff, ArrowLeft, Home, Mail, Lock,
  LogIn, KeyRound, Send
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AppContext } from '../context/Provider'
import axios from 'axios'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [otpEmail, setotpEmail] = useState("")
  const {setuser,navigate}=useContext(AppContext)


  const loginHandler=async(e)=>{
    e.preventDefault();
    const formdata={
      email,
      password
    }
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/user/login`, formdata, {
        withCredentials: true
      })
      if(res.status === 200 || res.status === 201){
        setemail("")
        setPassword("")
        setuser(res.data.user)
        toast.success("Login successful")
        navigate('/')
      }
    }catch(error){
      console.error("Login error:", error)
      toast.error("Login failed. Please try again.")
    }
  }

  const otpHandler=async(e)=>{
    e.preventDefault();
    const formdata={
      email:otpEmail
    }
    
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/user/forgot-password`, formdata, {
        withCredentials: true
      })
      if(res.status === 200 || res.status === 201){
        setotpEmail("")
        toast.success("OTP sent to your email")
        navigate('/forgot-password')
      }
    }catch(error){
      console.error("OTP error:", error)
      toast.error("Failed to send OTP. Please try again.")
    }
  }

  const loginImage = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        {/* Back to Home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/70">
              Sign in to your account or reset your password
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-base-200 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-base-100 text-base-content shadow-sm'
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <LogIn className="h-4 w-4 inline mr-2" />
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('forgot')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'forgot'
                  ? 'bg-base-100 text-base-content shadow-sm'
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <KeyRound className="h-4 w-4 inline mr-2" />
              Reset Password
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={loginHandler} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-base-content">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-base-content">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-10 pr-12 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/60 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" /> Login
                </div>
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {activeTab === 'forgot' && (
            <form onSubmit={otpHandler} className="space-y-6">
              <div className="text-center mb-6">
                <KeyRound className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  Reset Your Password
                </h3>
                <p className="text-sm text-base-content/70">
                  Enter your email address and we'll send you an OTP to reset your password
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="forgot-email" className="block text-sm font-medium text-base-content">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                  value={otpEmail}
                    onChange={(e)=>setotpEmail(e.target.value)}
                    id="forgot-email"
                    name="forgot-email"
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <Send className="h-5 w-5 mr-2" /> Send OTP
                </div>
              </button>
            </form>
          )}

          {/* Sign Up Link */}
          {activeTab === 'login' && (
            <div className="mt-6 text-center">
              <p className="text-base-content/70 mb-2">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                  Sign Up
                </Link>
              </p>
              <button
                onClick={() => setActiveTab('forgot')}
                className="text-sm text-base-content/60 hover:text-primary transition-colors duration-200"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {activeTab === 'forgot' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setActiveTab('login')}
                className="inline-flex items-center text-sm text-base-content/60 hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Welcome Back to InteriorAI
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Continue your design journey and bring your interior visions to life
            </p>
            <div className="space-y-4">
              {[
                "Access your saved designs",
                "Generate unlimited variations",
                "Export high-quality images",
                "Build your design portfolio"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-sm text-white/80">
                🎨 <strong>New Feature:</strong> Try our advanced room style transfer - transform any space into your dream interior!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login