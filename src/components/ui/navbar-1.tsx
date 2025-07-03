
"use client" 

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-lg w-full max-w-5xl relative z-10">
        <Link to="/" className="flex items-center">
          <motion.div
            className="w-8 h-8 mr-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png" 
              alt="Coding Killer Logo" 
              className="w-8 h-8 rounded"
            />
          </motion.div>
          <span className="text-xl font-bold gradient-text">Coding Killer</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
            { name: "Tools", path: "/tools" },
            ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : [])
          ].map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={item.path} className="text-sm text-gray-900 dark:text-gray-100 hover:text-primary transition-colors font-medium">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            ) : (
              <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            )}
          </motion.button>
          
          {user ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                Sign Out
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {[
                { name: "Home", path: "/" },
                { name: "Pricing", path: "/pricing" },
                { name: "Tools", path: "/tools" },
                ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : [])
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-base text-gray-900 dark:text-gray-100 font-medium" 
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6 space-y-4"
              >
                <button
                  onClick={() => {
                    toggleDarkMode()
                    toggleMenu()
                  }}
                  className="flex items-center justify-center w-full px-5 py-3 text-base text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                {user ? (
                  <Button
                    onClick={() => {
                      handleSignOut()
                      toggleMenu()
                    }}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
                    onClick={toggleMenu}
                  >
                    Get Started
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
