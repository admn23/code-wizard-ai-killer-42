
"use client" 

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const tools = [
    { name: "Code Generator", path: "/tools/code-generator" },
    { name: "Bug Fixer", path: "/tools/bug-fixer" },
    { name: "Code Explainer", path: "/tools/code-explainer" },
    { name: "Code Refactor", path: "/tools/code-refactor" },
    { name: "Code Optimizer", path: "/tools/code-optimizer" },
    { name: "Unit Test Generator", path: "/tools/unit-test-generator" },
    { name: "Documentation Generator", path: "/tools/documentation-generator" },
    { name: "API Generator", path: "/tools/api-generator" },
    { name: "Config Generator", path: "/tools/config-generator" },
    { name: "Deployment Scripts", path: "/tools/deployment-script-generator" },
    { name: "Lint Fixer", path: "/tools/lint-fixer" },
    { name: "Security Checker", path: "/tools/security-checker" }
  ]

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <nav className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-6xl relative z-10 border border-gray-100">
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
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
            { name: "About", path: "/about" }
          ].map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={item.path} className="text-sm text-gray-900 hover:text-primary transition-colors font-medium">
                {item.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Tools Dropdown */}
          <div className="relative">
            <motion.button
              className="flex items-center text-sm text-gray-900 hover:text-primary transition-colors font-medium"
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              whileHover={{ scale: 1.05 }}
            >
              Tools
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  <Link 
                    to="/tools" 
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 hover:text-primary transition-colors font-medium border-b border-gray-100"
                    onClick={() => setIsToolsOpen(false)}
                  >
                    All Tools
                  </Link>
                  <div className="max-h-80 overflow-y-auto">
                    {tools.map((tool) => (
                      <Link
                        key={tool.name}
                        to={tool.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsToolsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/dashboard" className="text-sm text-gray-900 hover:text-primary transition-colors font-medium">
                Dashboard
              </Link>
            </motion.div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Profile
                </Button>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu} 
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
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
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>
            
            <div className="flex flex-col space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              {[
                { name: "Home", path: "/" },
                { name: "Pricing", path: "/pricing" },
                { name: "About", path: "/about" },
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
                    className="text-base text-gray-900 font-medium block py-2" 
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
                {user ? (
                  <div className="space-y-3">
                    <Link to="/profile" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full rounded-full">
                        Profile
                      </Button>
                    </Link>
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
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full rounded-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={toggleMenu}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
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
