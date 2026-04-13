import React, { useState } from 'react'
import { Link } from 'react-router'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl backdrop-blur-xl p-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Book Events</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Welcome Back 👋</h1>
          <p className="mt-2 text-sm text-slate-400">
            Login to manage your bookings & explore events
          </p>
        </header>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 pr-12 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="active:scale-95 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" className="accent-sky-500" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sky-400 hover:underline">
              Forgot?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full active:scale-95 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 font-semibold text-white shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-white hover:text-sky-400 font-medium">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Login