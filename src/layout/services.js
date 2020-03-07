import axios from 'axios'

//const baseURL = 'https://data.nasa.gov/resource/y77d-th95.json'

const baseURL = 'https://dog.ceo/api'
const axiosClient = axios.create({ baseURL, method: 'GET' })

export const getLocations = async () => {
  const response = await axiosClient({ url: 'breeds/image/random' })
  return response.data
}
