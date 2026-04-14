import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import NavBar from '../components/NavBar'
import eventAPI from '../services/event.api'

const Home = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [error, setError] = useState(null)

  console.log(error)

  const categories = ['All', 'Technology', 'Business', 'Entertainment', 'Sports', 'Education']

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await eventAPI.getAllEvents()
        setEvents(data)
        setFilteredEvents(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch events:', err)
        // Mock data for development
        const mockEvents = [
          {
            _id: '69db16e92302c5ac98dda268',
            title: 'Full Stack JavaScript Bootcamp',
            description: 'An intensive bootcamp covering MERN stack, system design basics, and real-world project building.',
            date: '2026-04-19T03:52:09.332Z',
            location: 'Bangalore Tech Park, India',
            ticketPrice: 999,
            category: 'Technology',
            totalSeats: 180,
            availableSeats: 178,
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
          },
          {
            _id: '69db16e92302c5ac98dda269',
            title: 'React Advanced Patterns',
            description: 'Master advanced React patterns and best practices for building scalable applications.',
            date: '2026-04-25T10:00:00.000Z',
            location: 'Mumbai Tech Hub, India',
            ticketPrice: 799,
            category: 'Technology',
            totalSeats: 100,
            availableSeats: 45,
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
          },
          {
            _id: '69db16e92302c5ac98dda26a',
            title: 'Startup Pitch Competition',
            description: 'Showcase your startup idea and win exciting prizes. Pitch to top investors and VCs.',
            date: '2026-05-01T14:00:00.000Z',
            location: 'Delhi Convention Center, India',
            ticketPrice: 500,
            category: 'Business',
            totalSeats: 200,
            availableSeats: 120,
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
          },
        ]
        setEvents(mockEvents)
        setFilteredEvents(mockEvents)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filter events based on search and category
  useEffect(() => {
    let filtered = events

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [searchQuery, selectedCategory, events])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return 'text-green-400'
    if (percentage > 20) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <NavBar />

      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Discover Amazing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              {' '}Events
            </span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Find and book the most exciting events happening near you. From tech conferences to business summits, entertainment shows, and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-50 group-focus-within:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search events by title, location, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-900/80 border border-slate-700 text-white placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                <svg
                  className="absolute right-4 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-400 mb-4">Filter by Category:</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/50'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-sky-500 animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Loading amazing events...</p>
              </div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Link
                  key={event._id}
                  to={`/event/${event._id}`}
                  className="group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur hover:border-sky-500/50 overflow-hidden transition duration-300 hover:shadow-2xl hover:shadow-sky-500/20 transform hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                      {/* Category Badge */}
                      <span className="absolute top-3 right-3 px-3 py-1 bg-sky-500/80 backdrop-blur text-white text-xs font-semibold rounded-full">
                        {event.category}
                      </span>

                      {/* Price */}
                      <div className="absolute bottom-3 left-3">
                        <p className="text-2xl font-bold text-white">₹{event.ticketPrice}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-sky-400 transition">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-start gap-2 mb-3">
                        <svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-slate-400 line-clamp-2">{event.location}</p>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2H4v-2a2 2 0 012-2h8zm8 8H4v2a2 2 0 002 2h8a2 2 0 002-2v-2z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-slate-400">{formatDate(event.date)}</p>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                        <span className={`text-sm font-semibold ${getAvailabilityColor(event.availableSeats, event.totalSeats)}`}>
                          {event.availableSeats} / {event.totalSeats} seats
                        </span>
                        <button className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition active:scale-95">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-slate-700 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xl font-semibold text-white mb-2">No events found</p>
                <p className="text-slate-400">Try adjusting your search or category filter</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home