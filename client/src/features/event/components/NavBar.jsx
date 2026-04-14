import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '../../../features/auth/hooks/useAuth'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

//   console.log("user = ",user)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    ...(user ? [{ name: 'My Bookings', path: '/bookings' }]:[]),
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700/40 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-3 py-1.5 bg-slate-900 rounded-lg">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                  📅 BookIt
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 font-medium transition duration-200 rounded-lg ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30'
                      : 'text-slate-300 hover:text-sky-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Right Section - Auth Buttons / User Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-sky-500/50 transition">
                  <span className="text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-600 hover:border-sky-500 rounded-lg transition hover:bg-slate-800/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-600 hover:border-sky-500 rounded-lg transition hover:bg-slate-800/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg hover:opacity-90 transition shadow-lg shadow-sky-500/30"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700/40 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium'
                      : 'text-slate-300 hover:text-sky-400 hover:bg-slate-800/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}

            <div className="border-t border-slate-700/40 pt-2 mt-2 space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg hover:opacity-90 transition text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar