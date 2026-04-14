import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import NavBar from '../components/NavBar'
import eventAPI from '../services/event.api'

const categories = ['Technology', 'Business', 'Entertainment', 'Sports', 'Education', 'Health']

const CreateEvent = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    ticketPrice: '',
    totalSeats: '',
    category: 'Technology',
    imageUrl: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const isAdmin = user?.role === 'admin' || user?.isAdmin || user?.role === 'administrator'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!form.title || !form.description || !form.date || !form.location || !form.ticketPrice || !form.totalSeats) {
      setError('Please complete all required fields before submitting.')
      return
    }

    const eventData = {
      title: form.title,
      description: form.description,
      date: `${form.date}T${form.time || '09:00'}:00.000Z`,
      location: form.location,
      ticketPrice: Number(form.ticketPrice),
      totalSeats: Number(form.totalSeats),
      availableSeats: Number(form.totalSeats),
      category: form.category,
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
    }

    try {
      setSaving(true)
      await eventAPI.createEvent(eventData)
      setMessage('Event created successfully. Redirecting to event list...')
      setTimeout(() => navigate('/events'), 1200)
    } catch (err) {
      setError(err.message || 'Something went wrong while creating the event.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <NavBar />
        <div className="flex items-center justify-center py-28">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full border-4 border-slate-700 border-t-sky-500 animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Checking permissions...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <NavBar />

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          {user ? (
            isAdmin ? (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
                <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl backdrop-blur-xl p-10">
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Admin Dashboard</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Create a New Event</h1>
                    <p className="mt-3 text-slate-400 max-w-2xl">
                      Build your next unforgettable experience with a polished event page. Fill in the details below to publish it instantly.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block text-sm text-slate-300">
                        Title
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          placeholder="Event title"
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        />
                      </label>
                      <label className="block text-sm text-slate-300">
                        Category
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block text-sm text-slate-300">
                        Date
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        />
                      </label>
                      <label className="block text-sm text-slate-300">
                        Time
                        <input
                          type="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        />
                      </label>
                    </div>

                    <label className="block text-sm text-slate-300">
                      Location
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Bangalore Tech Park, India"
                        className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                      />
                    </label>

                    <label className="block text-sm text-slate-300">
                      Image URL
                      <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                      />
                    </label>

                    <label className="block text-sm text-slate-300">
                      Description
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write a compelling event description..."
                        className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition resize-none"
                      />
                    </label>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block text-sm text-slate-300">
                        Ticket Price
                        <input
                          type="number"
                          name="ticketPrice"
                          value={form.ticketPrice}
                          onChange={handleChange}
                          placeholder="999"
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        />
                      </label>
                      <label className="block text-sm text-slate-300">
                        Total Seats
                        <input
                          type="number"
                          name="totalSeats"
                          value={form.totalSeats}
                          onChange={handleChange}
                          placeholder="180"
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        />
                      </label>
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {message && <p className="text-sm text-emerald-400">{message}</p>}

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-90 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Creating event...' : 'Publish Event'}
                    </button>
                  </form>
                </div>

                <aside className="space-y-6">
                  <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl">
                    <p className="text-sm text-sky-400 uppercase tracking-[0.3em] mb-3">Admin only</p>
                    <h2 className="text-2xl font-bold text-white mb-3">Trusted event creation</h2>
                    <p className="text-slate-400 leading-relaxed">
                      Only administrator accounts can create events. Keep your event content clear, compelling, and aligned with your brand.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl">
                    <h3 className="text-xl font-semibold text-white mb-3">Quick tips</h3>
                    <ul className="space-y-3 text-slate-400">
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Keep the title short and powerful.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Choose a descriptive image to capture attention.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Use clear pricing and availability information.
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl backdrop-blur-xl p-12 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Access denied</p>
                <h1 className="text-4xl font-bold text-white mb-4">Admin access required</h1>
                <p className="text-slate-400 mb-8">
                  Only administrators may create new events. Contact your system administrator if you believe this is a mistake.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/"
                    className="px-6 py-3 rounded-2xl border border-slate-700 text-slate-200 hover:text-white hover:border-sky-500 transition"
                  >
                    View Events
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
                  >
                    Sign in as Admin
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl backdrop-blur-xl p-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Authentication required</p>
              <h1 className="text-4xl font-bold text-white mb-4">Please sign in</h1>
              <p className="text-slate-400 mb-8">
                Only signed-in administrators can create new events. Please log in with an admin account to continue.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-2xl border border-slate-700 text-slate-200 hover:text-white hover:border-sky-500 transition"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default CreateEvent