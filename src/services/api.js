import axios from 'axios'

const API_URL = 'http://localhost:3001'

// ========== USERS ==========
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`)
  return response.data
}

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData)
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`)
  return response.data
}

// ========== SPACES ==========
export const getSpaces = async () => {
  const response = await axios.get(`${API_URL}/spaces`)
  return response.data
}

export const createSpace = async (spaceData) => {
  const response = await axios.post(`${API_URL}/spaces`, spaceData)
  return response.data
}

export const updateSpace = async (id, spaceData) => {
  const response = await axios.put(`${API_URL}/spaces/${id}`, spaceData)
  return response.data
}

export const deleteSpace = async (id) => {
  const response = await axios.delete(`${API_URL}/spaces/${id}`)
  return response.data
}

// ========== PROMOTIONS ==========
export const getPromotions = async () => {
  const response = await axios.get(`${API_URL}/promotions`)
  return response.data
}

export const createPromotion = async (promotionData) => {
  const response = await axios.post(`${API_URL}/promotions`, promotionData)
  return response.data
}

export const updatePromotion = async (id, promotionData) => {
  const response = await axios.put(`${API_URL}/promotions/${id}`, promotionData)
  return response.data
}

export const deletePromotion = async (id) => {
  const response = await axios.delete(`${API_URL}/promotions/${id}`)
  return response.data
}