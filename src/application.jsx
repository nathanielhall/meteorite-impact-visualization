import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'
import { Header } from 'components/header'
import Button from '@material-ui/core/Button'
import { UserEdits } from 'components/user-edits'
import { DateRange } from 'components/date-range'

export const Application = () => {
  const [data, setData] = useState()
  const [startDate, setStartDate] = useState(new Date('01/01/2010'))
  const [endDate, setEndDate] = useState(new Date('03/01/2020'))
  const [showUserEdits, setShowUserEdits] = useState(false)
  const [showDateRangeFilter, setShowDateRangeFilter] = useState(false)

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
        <Button color="inherit" onClick={() => setShowUserEdits(true)}>
          Edits
        </Button>
        <Button color="inherit" onClick={() => setShowDateRangeFilter(true)}>
          Filter
        </Button>
      </Header>
      <main>{data && <Map data={data} />}</main>
      {showUserEdits && <UserEdits onClose={() => setShowUserEdits(false)} />}
      {showDateRangeFilter && (
        <DateRange
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
          onClose={() => setShowDateRangeFilter(false)}
        />
      )}
    </div>
  )
}
