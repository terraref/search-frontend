import axios from 'axios'

const BASE_URL = process.env.VUE_APP_SEARCH_API

export const seasons = () => {
  return axios.get(`${BASE_URL}/seasons`)
    .then((results) => {
      const {
        data = []
      } = results

      return data
    })
}

export const products = (params) => {
  return axios.get(`${BASE_URL}/products?${params}`)
    .then((results) => {
      const {
        data = []
      } = results

      return data
    })
}

export const cultivars = (params) => {
  return axios.get(`${BASE_URL}/cultivars?${params}`)
    .then((results) => {
      const {
        data = []
      } = results

      return data
    })
}

export const mainSearch = (params) => {
  return axios.get(`${BASE_URL}/search?${params}`)
  .then((results) => {
    const {
      data = []
    } = results

    return data
  })
}
