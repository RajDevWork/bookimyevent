import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {loading,handleRegister} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await handleRegister(username,email,password)
    navigate("/login")
  }

  if(loading){
    return (
      <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10'><h1 className='mt-3 text-3xl font-bold text-white'>Loading....</h1></main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl backdrop-blur-xl p-10">
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Book Events</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Register to start booking events and managing your tickets.
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 pr-12 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full active:scale-95 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 font-semibold text-white shadow-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-sky-400 font-medium">
            Login
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Register