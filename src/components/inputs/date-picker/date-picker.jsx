import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker as MuiDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

export const DatePicker = ({
  name,
  value,
  onChange,
  label,
  views,
  format,
  disableFuture,
  autoOk,
  defaultValue
}) => {
  const onChangeHandler = (value) => {
    const event = {
      target: { name, value }
    }
    onChange(event)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiDatePicker
        name={name}
        value={value}
        onChange={onChangeHandler}
        label={label}
        variant="inline"
        views={views}
        format={format}
        disableFuture={disableFuture}
        autoOk={autoOk}
        invalidDateMessage={''}
        defaultValue={defaultValue}
      />
    </MuiPickersUtilsProvider>
  )
}
