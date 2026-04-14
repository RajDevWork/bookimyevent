const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const eventAPI = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`)
      if (!response.ok) throw new Error('Failed to fetch events')
      return await response.json()
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  },

  // Get single event
  getEventById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`)
      if (!response.ok) throw new Error('Failed to fetch event')
      return await response.json()
    } catch (error) {
      console.error('Error fetching event:', error)
      throw error
    }
  },

  // Get events by category
  getEventsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events?category=${category}`)
      if (!response.ok) throw new Error('Failed to fetch events')
      return await response.json()
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  },

  // Create a new event
  createEvent: async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to create event')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  },

  // Search events
  searchEvents: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/search?q=${query}`)
      if (!response.ok) throw new Error('Failed to search events')
      return await response.json()
    } catch (error) {
      console.error('Error searching events:', error)
      throw error
    }
  },
}

export default eventAPI
