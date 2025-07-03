"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  const toolsItems = [
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
    { name: "Security Checker", path: "/tools/security-checker" },
  ];

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-lg rounded-full w-full max-w-5xl relative z-10">
        <Link to="/" className="flex items-center">
          <motion.div
            className="w-8 h-8 mr-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="https://i.postimg.cc/mkqZncXQ/Chat-GPT-Image-Jul-2-2025-04-29-00-PM-min.png"
              alt="Coding Killer Logo"
              className="w-8 h-8 rounded object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png";
              }}
            />
          </motion.div>
          <span className="text-xl font-bold gradient-text">Coding Killer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={item.path}
                className="text-sm text-gray-900 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/tools"
                className="text-sm text-gray-900 hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                Tools
                <ChevronDown className="h-3 w-3" />
              </Link>
            </motion.div>

            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {toolsItems.map((tool) => (
                      <Link
                        key={tool.name}
                        to={tool.path}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Profile
                </Button>
              </Link>
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
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Login
                </Button>
              </Link>
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
            </>
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
      </div>

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
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link
                    to={item.path}
                    className="text-base text-gray-900 font-medium"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Link
                  to="/tools"
                  className="text-base text-gray-900 font-medium"
                  onClick={toggleMenu}
                >
                  All Tools
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6 space-y-4"
              >
                {user ? (
                  <>
                    <Link to="/profile" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full rounded-full">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        toggleMenu();
                      }}
                      variant="outline"
                      className="w-full rounded-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full rounded-full">
                        Login
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
                      onClick={toggleMenu}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar2 };
