import React, { useState, useContext } from "react";
import {
  Menu,
  X,
  Home,
  Palette,
  User,
  LogOut,
  Plus,
  Images,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Provider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const { user, setuser, theme, settheme } = useContext(AppContext);

  const toggleTheme = () => {
    settheme(theme === "dark" ? "light" : "dark");
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 100);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Generate", href: "/generate", icon: Plus },
    { name: "Explore", href: "/explore", icon: Images },
    { name: "About", href: "/about", icon: Palette },
  ];

  return (
    <nav className="bg-base-100 text-base-content border-b border-base-300 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Palette className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">
              Interior<span className="text-primary">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-base-200 transition"
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth + Theme */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-base-200 transition"
            >
              {theme === "dark" ? (
                <Sun
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isRotating ? "rotate-180" : ""
                  }`}
                />
              ) : (
                <Moon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isRotating ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Profile
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setuser(false)}
                      className="flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-ghost normal-case text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary normal-case text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-base-200 transition"
            >
              {theme === "dark" ? (
                <Sun
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isRotating ? "rotate-180" : ""
                  }`}
                />
              ) : (
                <Moon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isRotating ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-base-200 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300">
          <div className="py-2 px-2 space-y-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-base-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-base-300">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-base-200 transition"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setuser(false);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-base-200 transition"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-base-200 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary w-full mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
