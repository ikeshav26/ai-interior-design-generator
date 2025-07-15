import React, { useState, useContext } from 'react'
import { Eye, EyeOff, ArrowLeft, Home, User, Mail, Lock, Sparkles, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/Provider'
import axios from 'axios'
import toast from 'react-hot-toast'



const Signup = () => {
  const { theme,navigate,setuser,login } = useContext(AppContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const signupImage = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1000&q=80'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    try{
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/user/signup`,formData,{
      withCredentials: true
    })
    
    console.log('Signup response:', res.data); 

    login(res.data.newUser);
    
    setFormData({ username: '', email: '', password: '' })
    toast.success('Account created successfully!')
    navigate('/')

    } catch (error) {
      console.error('Signup error:', error)
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors || {}
        setErrors(prev => ({
          ...prev,
          ...serverErrors
        }))
      }
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    "AI-powered design generation",
    "Unlimited design variations",
    "High-quality image exports",
    "Personal design library"
  ]

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Join InteriorAI
            </h1>
            <p className="text-base-content/70">
              Create your account and start designing beautiful spaces
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-base-content">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.username 
                      ? 'border-error focus:border-error' 
                      : 'border-base-300 focus:border-primary'
                  } rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-error">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-base-content">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email 
                      ? 'border-error focus:border-error' 
                      : 'border-base-300 focus:border-primary'
                  } rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-error">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-base-content">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border ${
                    errors.password 
                      ? 'border-error focus:border-error' 
                      : 'border-base-300 focus:border-primary'
                  } rounded-xl bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/60 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-error">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <User className="h-5 w-5 mr-2" />
                  Create Account
                </div>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Features */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${signupImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Design Journey
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users creating beautiful interiors with AI
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-sm text-white/80">
                💡 <strong>Pro Tip:</strong> Start with simple room descriptions like "modern living room" or "cozy bedroom" for best results!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
