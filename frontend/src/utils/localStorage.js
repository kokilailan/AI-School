// Local storage utilities with error handling
export const storage = {
  // Get user data
  getUser: () => {
    try {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Error reading user from localStorage:', error)
      return null
    }
  },

  // Set user data
  setUser: (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Error saving user to localStorage:', error)
      return false
    }
  },

  // Remove user data
  removeUser: () => {
    try {
      localStorage.removeItem('user')
      return true
    } catch (error) {
      console.error('Error removing user from localStorage:', error)
      return false
    }
  },

  // Clear all data
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

export default storage
