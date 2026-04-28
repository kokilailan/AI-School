import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    if (error.response?.status === 404) {
      throw new Error('Resource not found')
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.')
    }
    throw error
  }
)

export const apiService = {
  // Health check
  healthCheck: () => api.get('/health'),
  
  // Get subjects for grade
  getSubjects: (grade) => api.get(`/subjects/${grade}`),
  
  // Get lessons for subject and grade
  getLessons: (grade, subject) => api.get(`/lessons/${grade}/${subject}`),
  
  // Get specific lesson
  getLesson: (grade, subject, lessonId) => api.get(`/lesson/${grade}/${subject}/${lessonId}`),
}

export default api
