import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { Body } from './body'
import axios from 'axios'

export const Layout = () => {
  const [data, setData] = useState({})

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
      <Body>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Body>
    </div>
  )
}
