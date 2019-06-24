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
