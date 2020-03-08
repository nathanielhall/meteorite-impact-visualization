import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'

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
      <main>{data && <Map data={data} />}</main>
    </div>
  )
}
