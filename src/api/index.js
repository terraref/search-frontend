import axios from 'axios'

const BASE_URL = 'https://search-api.workbench.terraref.org'

export const seasons = () => {
  return axios.get(`${BASE_URL}/seasons`)
    .then((results) => {
      const {
        data = []
      } = results

      return data
    })
}
