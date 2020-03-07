import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { Body } from './body'
import { getLocations } from './services'

export const Layout = () => {
  const [data, setData] = useState()

  useEffect(async () => {
    const response = await getLocations()
    setData(response)
  }, [])

  return (
    <div>
      <Header />
      <Body>
        <pre>{JSON.stringify(data)}</pre>
      </Body>
    </div>
  )
}
