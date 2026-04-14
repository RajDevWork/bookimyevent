import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import NavBar from '../components/NavBar'
import eventAPI from '../services/event.api'

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [bookingLoading, setBookingLoading] = useState(false)

  // Mock event data for development
  const mockEvent = {
    _id: '69db16e92302c5ac98dda268',
    title: 'Full Stack JavaScript Bootcamp',
    description: 'An intensive bootcamp covering MERN stack, system design basics, and real-world project building. Learn from industry experts with hands-on projects and real-world applications.',
    date: '2026-04-19T03:52:09.332Z',
    location: 'Bangalore Tech Park, India',
    ticketPrice: 999,
    category: 'Technology',
    totalSeats: 180,
    availableSeats: 178,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
    createdBy: '69db16e92302c5ac98dda25e',
    createdAt: '2026-04-12T03:52:09.953Z',
    updatedAt: '2026-04-12T03:52:09.956Z',
    organizer: {
      name: 'Tech Academy',
      email: 'academy@tech.com',
      website: 'https://techacademy.com'
    },
    agenda: [
      'Day 1: JavaScript Fundamentals & ES6+',
      'Day 2: React & Frontend Development',
      'Day 3: Node.js & Backend APIs',
      'Day 4: MongoDB & Database Design',
      'Day 5: Full Stack Project & Deployment'
    ],
    requirements: [
      'Basic programming knowledge',
      'Laptop with internet connection',
      'Passion for learning'
    ]
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        // Try to fetch from API first
        const data = await eventAPI.getEventById(id)

        // console.log("main data = ",data.event)
        setEvent(data.event)
      } catch (err) {
        console.log('Using mock data for development')
        // Use mock data if API fails
        setEvent(mockEvent)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const handleBooking = async () => {
    if (!event || ticketQuantity > event.availableSeats) return

    setBookingLoading(true)
    try {
      // Mock booking API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully booked ${ticketQuantity} ticket(s) for ${event.title}!`)
    } catch (error) {
      alert('Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return 'text-green-400'
    if (percentage > 20) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <NavBar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-sky-500 animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading event details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <NavBar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xl font-semibold text-white mb-2">Event not found</p>
            <p className="text-slate-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const { date: formattedDate, time: formattedTime } = formatDate(event.date)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-black"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Event Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-sky-500/20 border border-sky-500/30 rounded-full">
                <span className="text-sm font-semibold text-sky-400">{event.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                {event.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                {event.description}
              </p>

              {/* Key Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2H4v-2a2 2 0 012-2h8zm8 8H4v2a2 2 0 002 2h8a2 2 0 002-2v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{formattedDate}</p>
                    <p className="text-sm text-slate-400">{formattedTime}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Location</p>
                    <p className="text-sm text-slate-400">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:ml-auto lg:max-w-md w-full">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Price */}
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-white">₹{event.ticketPrice}</p>
                  <p className="text-sm text-slate-400">per ticket</p>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Available Seats</span>
                    <span className={`text-sm font-semibold ${getAvailabilityColor(event.availableSeats, event.totalSeats)}`}>
                      {event.availableSeats} / {event.totalSeats}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Ticket Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Number of Tickets
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="flex-1 text-center text-lg font-semibold text-white py-2 bg-slate-800 rounded-lg">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(event.availableSeats, ticketQuantity + 1))}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-700/30">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">₹{event.ticketPrice * ticketQuantity}</span>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={event.availableSeats === 0 || bookingLoading}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-sky-500/30"
                >
                  {bookingLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : event.availableSeats === 0 ? (
                    'Sold Out'
                  ) : (
                    'Book Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Event */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Join us for an unforgettable experience that combines cutting-edge technology,
                    expert instruction, and hands-on learning. This event is designed for developers
                    who want to take their skills to the next level and build amazing applications.
                  </p>
                </div>
              </div>

              {/* Agenda */}
              {event.agenda && (
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Event Agenda</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-slate-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {event.requirements && (
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">What You'll Need</h2>
                  <ul className="space-y-3">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              {event.organizer && (
                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Organizer</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">Name</p>
                      <p className="text-white font-medium">{event.organizer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email</p>
                      <p className="text-sky-400">{event.organizer.email}</p>
                    </div>
                    {event.organizer.website && (
                      <div>
                        <p className="text-sm text-slate-400">Website</p>
                        <a
                          href={event.organizer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 transition"
                        >
                          {event.organizer.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Event Stats */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white font-medium">{event.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Seats</span>
                    <span className="text-white font-medium">{event.totalSeats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Available</span>
                    <span className={`font-medium ${getAvailabilityColor(event.availableSeats, event.totalSeats)}`}>
                      {event.availableSeats}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price</span>
                    <span className="text-white font-medium">₹{event.ticketPrice}</span>
                  </div>
                </div>
              </div>

              {/* Share Event */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Share Event</h3>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition active:scale-95">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition active:scale-95">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition active:scale-95">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EventDetails