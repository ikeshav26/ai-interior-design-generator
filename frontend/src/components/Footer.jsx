import React, { useContext } from 'react'
import { 
  Palette, 
  Home, 
  Plus, 
  Images, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Heart 
} from 'lucide-react'
import { AppContext } from '../context/Provider'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { theme } = useContext(AppContext)

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Generate Design', href: '/generate', icon: Plus },
    { name: 'Explore', href: '/explore', icon: Images },
    { name: 'About', href: '/about', icon: Palette },
  ]

  const services = [
    'Interior Design',
    'Room Planning',
    'Color Consultation',
    'Furniture Selection',
    'Lighting Design',
    'Space Optimization'
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className=" bg-neutral text-neutral-content border-t border-neutral-content/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Palette className="h-7 w-7 text-primary mr-2" />
              <span className="text-lg font-bold text-neutral-content">
                Interior<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-neutral-content/70 leading-relaxed max-w-sm">
              Transform your living spaces with AI-powered interior design. Create beautiful, personalized rooms.
            </p>
            <div className="flex space-x-4">
              {socialLinks.slice(0, 4).map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    to={social.href}
                    className="text-neutral-content/60 hover:text-primary transition-colors duration-200 p-2 hover:bg-neutral-content/5 rounded-lg"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-content/90">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-neutral-content/70 hover:text-primary text-sm transition-colors duration-200 flex items-center group"
                >
                  <link.icon className="h-3 w-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Services Combined */}
          <div className="space-y-8">
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-content/90">
                Contact
              </h3>
              <div className="space-y-3">
                <Link
                  href="mailto:contact@interiorai.com" 
                  className="text-neutral-content/70 hover:text-primary text-sm transition-colors duration-200 flex items-center group"
                >
                  <Mail className="h-3 w-3 mr-3 text-primary/80 group-hover:text-primary transition-colors duration-200" />
                  contact@interiorai.com
                </Link>
                <Link
                  href="tel:+1234567890" 
                  className="text-neutral-content/70 hover:text-primary text-sm transition-colors duration-200 flex items-center group"
                >
                  <Phone className="h-3 w-3 mr-3 text-primary/80 group-hover:text-primary transition-colors duration-200" />
                  +1 (234) 567-890
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-content/90">
                Services
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {services.slice(0, 4).map((service) => (
                  <Link
                    key={service}
                    href="#"
                    className="text-neutral-content/70 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-neutral-content/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-xs text-neutral-content/60 flex items-center">
              © 2025 InteriorAI. Made with 
              <Heart className="h-3 w-3 mx-1 text-primary/80" /> 
              for beautiful spaces.
            </p>
            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Cookies'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  className="text-xs text-neutral-content/60 hover:text-primary transition-colors duration-200"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer