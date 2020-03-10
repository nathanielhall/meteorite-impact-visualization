import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'
import { Header } from 'components/header'
import Button from '@material-ui/core/Button'
// import { DateRange } from 'components/date-range'

export const Application = () => {
  const [data, setData] = useState()
  // const [startDate, setStartDate] = useState(new Date('01/01/2010'))
  // const [endDate, setEndDate] = useState(new Date('03/01/2020'))

  // const onSubmit = (values) => {
  //   setStartDate(values.start)
  //   setEndDate(values.end)
  // }

  // TODO: Need more info on how the fitering should work
  // TODO: Should the data ever re-import? Provide an import button? Import after filter?...
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
        {/* <DateRange
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
        /> */}
        <Button color="inherit">Edits</Button>
        <Button color="inherit">Filter</Button>
      </Header>
      <main>{data && <Map data={data} />}</main>
    </div>
  )
}
