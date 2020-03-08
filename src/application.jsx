import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer } from 'components/map-container'

export const Application = () => {
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
      <main>{data && <MapContainer data={data} />}</main>
    </div>
  )
}
