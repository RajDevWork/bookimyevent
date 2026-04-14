import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import NavBar from '../../event/components/NavBar'
import bookingAPI from '../services/booking.api'

const AllBookings = () => {
  const { user, loading } = useAuth()
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true)
        const data = await bookingAPI.getMyBookings()
        setBookings(data)
        setError(null)
      } catch (err) {
        setError(err.message || 'Unable to load your bookings')
      } finally {
        setLoadingBookings(false)
      }
    }

    if (user) {
      fetchBookings()
    }
  }, [user])

  useEffect(() => {
    const filterBookings = () => {
      let filtered = [...bookings]

      if (activeTab !== 'all') {
        filtered = filtered.filter((booking) => booking.status === activeTab)
      }

      if (searchQuery.trim()) {
        filtered = filtered.filter((booking) => {
          const eventTitle = booking.eventId?.title || ''
          const location = booking.eventId?.location || ''
          return (
            eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
      }

      setFilteredBookings(filtered)
    }

    filterBookings()
  }, [bookings, activeTab, searchQuery])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500/15 text-emerald-300'
      case 'pending':
        return 'bg-amber-500/15 text-amber-300'
      case 'cancelled':
        return 'bg-red-500/15 text-red-300'
      default:
        return 'bg-slate-700/40 text-slate-300'
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <NavBar />
        <div className="flex items-center justify-center py-28">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full border-4 border-slate-700 border-t-sky-500 animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Checking your account…</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <NavBar />

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          {!user ? (
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl p-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Member access</p>
              <h1 className="text-4xl font-bold text-white mb-4">Sign in to view your bookings</h1>
              <p className="text-slate-400 mb-8">Your booked events will appear here once you’re signed in.</p>
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
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] mb-12">
                <div>
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-400">My Bookings</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Your upcoming and past events</h1>
                    <p className="mt-3 text-slate-400 max-w-2xl">
                      Track every booking, see event details, and manage your tickets from one modern dashboard.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5">
                      <p className="text-sm text-slate-400">Total bookings</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{bookings.length}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5">
                      <p className="text-sm text-slate-400">Confirmed</p>
                      <p className="mt-2 text-3xl font-semibold text-emerald-300">{bookings.filter((b) => b.status === 'confirmed').length}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5">
                      <p className="text-sm text-slate-400">Pending</p>
                      <p className="mt-2 text-3xl font-semibold text-amber-300">{bookings.filter((b) => b.status === 'pending').length}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5">
                      <p className="text-sm text-slate-400">Cancelled</p>
                      <p className="mt-2 text-3xl font-semibold text-red-300">{bookings.filter((b) => b.status === 'cancelled').length}</p>
                    </div>
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Booking tips</p>
                    <ul className="space-y-3 text-slate-400">
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Confirm early to keep seats reserved.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Use your booking details to access event updates.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sky-400">•</span>
                        Reach out if you need to modify or cancel a booking.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Next action</p>
                    <p className="text-slate-300 mb-4">
                      Explore more events and book the ones that fit your schedule.
                    </p>
                    <Link
                      to="/events"
                      className="inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                    >
                      Browse Events
                    </Link>
                  </div>
                </aside>
              </div>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Bookings</h2>
                  <p className="text-slate-400">Review bookings for your logged-in account below.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['all', 'confirmed', 'pending', 'cancelled'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20'
                          : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800/90'
                      }`}
                    >
                      {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 max-w-xl">
                <label className="block text-sm text-slate-300 mb-3">Search by event or location</label>
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bookings..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                </div>
              </div>

              {error && (
                <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
                  {error}
                </div>
              )}

              {loadingBookings ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-sky-500 animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading your bookings...</p>
                  </div>
                </div>
              ) : filteredBookings.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {filteredBookings.map((booking) => (
                    <article key={booking._id} className="group rounded-3xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-sky-500/20">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Booking ID</p>
                          <p className="mt-2 text-sm text-slate-300">{booking._id}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(booking.status)}`}>
                          {booking.status || 'unknown'}
                        </span>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{booking.eventId?.title || 'Event details unavailable'}</h3>
                          <p className="mt-2 text-slate-400 line-clamp-2">{booking.eventId?.description}</p>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800">
                              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Event</p>
                              <p className="mt-2 text-sm text-white">{formatDate(booking.eventId?.date)}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800">
                              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Location</p>
                              <p className="mt-2 text-sm text-white">{booking.eventId?.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-4 text-center">
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Amount paid</p>
                          <p className="mt-3 text-3xl font-semibold text-white">₹{booking.amount}</p>
                          <p className="mt-2 text-sm text-slate-400">Payment: {booking.paymentStatus || 'unknown'}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3 items-center">
                        <Link
                          to={`/event/${booking.eventId?._id}`}
                          className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                        >
                          View Event
                        </Link>
                        <div className="rounded-2xl bg-slate-900/80 px-5 py-3 text-sm text-slate-300">
                          Booked on {formatDate(booking.createdAt)}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-12 text-center">
                  <p className="text-slate-400 mb-4">No bookings found for the selected status.</p>
                  <Link
                    to="/events"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                  >
                    Discover events
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default AllBookings