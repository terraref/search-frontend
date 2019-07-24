import axios from 'axios'

const BASE_URL = 'https://search-api-dev.workbench.terraref.org/search-api/v1'

export const seasons = () => {
  return axios.get(`${BASE_URL}/seasons`)
    .then((results) => {
      const {
        data = []
      } = results

      return data
    })
}

export const products = () => {
  return axios.get(`${BASE_URL}/products`)
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
