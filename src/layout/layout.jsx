import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { Body } from './body'
import axios from 'axios'
import { MapContainer } from 'components/map-container'

export const Layout = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const getLocations = async () => {
      const response = await axios.get(
        'https://data.nasa.gov/resource/y77d-th95.json'
      )
      setData(response.data)
    }

    getLocations()
  }, [])

  return (
    <div>
      <Header />
      <Body>{data && <MapContainer data={data} />}</Body>
    </div>
  )
}
