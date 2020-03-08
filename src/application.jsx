import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'
import { Header } from 'components/header'

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
      <Header />
      <main>{data && <Map data={data} />}</main>
    </div>
  )
}
