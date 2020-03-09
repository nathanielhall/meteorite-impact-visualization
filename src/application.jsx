import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'
import { Header } from 'components/header'
import { DateRange } from 'components/date-range'

export const Application = () => {
  const [data, setData] = useState()
  const [startDate, setStartDate] = useState(new Date('01/01/2010'))
  const [endDate, setEndDate] = useState(new Date('03/01/2020'))

  const onSubmit = (values) => {
    setStartDate(values.start)
    setEndDate(values.end)
  }

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
      <Header title="Meteorite Impact Locations">
        <DateRange
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
        />
      </Header>
      <main>{data && <Map data={data} />}</main>
    </div>
  )
}
