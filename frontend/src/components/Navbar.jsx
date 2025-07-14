import React, { useState } from 'react'
import { Menu, X, Home, Palette, User, LogOut, Plus, Images, Moon, Sun } from 'lucide-react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) 
  const [isDarkMode, setIsDarkMode] = useState(false) 
  const [isRotating, setIsRotating] = useState(false) 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    setIsRotating(true)
    setTimeout(() => setIsRotating(false))
    
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Generate', href: '/generate', icon: Plus },
    { name: 'Gallery', href: '/gallery', icon: Images },
    { name: 'About', href: '/about', icon: Palette },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Palette className="h-8 w-8 text-indigo-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                Interior<span className="text-indigo-600">AI</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <IconComponent className="h-4 w-4 mr-1" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    {isDarkMode ? (
                      <Sun className={`h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
                    ) : (
                      <Moon className={`h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  <div className="relative group">
                    <button className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      <User className="h-5 w-5 mr-1" />
                      Profile
                    </button>
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Theme Toggle Button for non-logged in users */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    {isDarkMode ? (
                      <Sun className={`h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
                    ) : (
                      <Moon className={`h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  <button className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Login
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className={`block h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
              ) : (
                <Moon className={`block h-5 w-5 transform transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-100">
          {navLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <IconComponent className="h-5 w-5 mr-2" />
                {link.name}
              </Link>
            )
          })}
          
          {/* Mobile Auth Section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-1">
                <Link href="/profile" className="text-gray-700 hover:text-indigo-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <button className="w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <button className="w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  Login
                </button>
                <button className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
