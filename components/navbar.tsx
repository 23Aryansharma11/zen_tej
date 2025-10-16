"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Centralized, easily customizable nav items
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Challenge", to: "/#challenge" },
    { label: "Solution", to: "/#solution" },
    { label: "Architecture", to: "/#architecture" },
    { label: "Demo", to: "/upload" },
    { label: "Team", to: "/#team" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900 tracking-tight">
          RealID
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center justify-center gap-8 text-gray-700 font-medium">
          {navLinks.map(({ label, to }) => (
            <motion.li
              key={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={to}
                className="hover:text-blue-600 transition-colors duration-300"
              >
                {label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
              {navLinks.map(({ label, to }) => (
                <motion.li
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={to}
                    className="hover:text-blue-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
