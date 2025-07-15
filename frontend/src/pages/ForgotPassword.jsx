import React, { useState } from 'react'
import { Mail, Lock, KeyRound, Eye, EyeOff, ArrowLeft, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../context/Provider'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [email, setemail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {navigate}=useContext(AppContext)

  const forgotPasswordImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"

  const submitHandler=async(e)=>{
    e.preventDefault();
    
    if (!email || !newPassword || !otp) {
      toast.error("Please fill in all fields")
      return
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    
    const formData={
      email,
      newPassword,
      otp: parseInt(otp)
    }
    
    setIsLoading(true)
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/user/verify-otp`, formData, {
        withCredentials: true,
      });
      if(res.status === 200 || res.status === 201) {
        setemail("")
        setNewPassword("")
        setOtp("")
        toast.success("Password reset successfully")
        navigate('/login')
      }
    }catch(error) {
      console.error("Error submitting form:", error)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to reset password")
      } else {
        toast.error("Failed to reset password")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        <div className="max-w-md w-full mx-auto">
          {/* Back to Login */}
          <div className="mb-8">
            <Link to="/login" className="inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Login
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
              <KeyRound className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Reset Your Password
            </h1>
            <p className="text-base-content/70">
              Enter your details to reset your password securely
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Old Email */}
            <div className="space-y-2">
              <label htmlFor="old-email" className="block text-sm font-medium text-base-content">
                Old Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="old-email"
                  name="old-email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
                  placeholder="Enter your old email address"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium text-base-content">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="new-password"
                  name="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/60 transition-colors duration-200"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* OTP */}
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-base-content">
                OTP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" /> Reset Password
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${forgotPasswordImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/70 to-secondary/70"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Forgot Your Password?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              We’ll help you set up a new one so you can get back to creating stunning interiors!
            </p>
            <div className="space-y-4">
              {[
                "Secure your account",
                "Change password in seconds",
                "Protect your designs",
                "Stay connected with updates"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
