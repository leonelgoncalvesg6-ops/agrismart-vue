const BASE = '/api'

async function request(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`API ${path} failed: ${res.status} ${msg}`)
  }
  return res.json()
}

// Crops
export const getCrops = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/crops${qs ? '?' + qs : ''}`)
}
export const getFeaturedCrops = () => request('/crops/featured')
export const getCrop = (id) => request(`/crops/${id}`)

// Diseases & Pests
export const getDiseasesPests = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/diseases-pests${qs ? '?' + qs : ''}`)
}
export const getDisease = (id) => request(`/diseases-pests/${id}`)

// Tips
export const getTips = () => request('/tips')

// Homepage aggregate
export const getHomeData = () => request('/home')

// Farming Guides
export const getFarmingGuides = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/farming-guides${qs ? '?' + qs : ''}`)
}
export const getFarmingGuide = (id) => request(`/farming-guides/${id}`)

// Weather
export const getWeather = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/weather${qs ? '?' + qs : ''}`)
}

// Cost Calculator
export const getCostCalculator = () => request('/cost-calculator')
