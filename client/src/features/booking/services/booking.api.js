const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const bookingAPI = {
  getMyBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
        credentials: 'include',
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to fetch bookings')
      }
      const data = await response.json()
      return data.bookings || []
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ bookingId }),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to cancel booking')
      }
      return await response.json()
    } catch (error) {
      console.error('Error cancelling booking:', error)
      throw error
    }
  },
}

export default bookingAPI
