import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/'
})

const api = {
  loadGenres: () => server.get('genres'),
  saveSeries: (newSeries) => server.post('series', newSeries)
}

export default api
