import React, { useState } from 'react'
import { DatePicker } from 'components/date-picker'
import Button from '@material-ui/core/Button'

export const DateRange = ({ startDate, endDate, onSubmit }) => {
  const [values, setValues] = useState({
    start: startDate,
    end: endDate
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const { start, end } = values
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(values)
      }}
    >
      <DatePicker
        name="start"
        label="Start"
        onChange={handleChange}
        value={start}
        views={['year']}
        autoOk
        disableFuture
      />

      <DatePicker
        name="end"
        label="End"
        onChange={handleChange}
        value={end}
        views={['year']}
        autoOk
        disableFuture
      />

      <Button color="inherit" type="submit">
        Filter
      </Button>
    </form>
  )
}
