import React, { useState } from 'react'
import { DatePicker } from 'components/FormControls'
import Button from '@material-ui/core/Button'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid
} from '@material-ui/core'

export const MeteoriteImpactFilter = ({
  startDate,
  endDate,
  onSubmit,
  onClose
}) => {
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
    <Dialog open>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
          onClose()
        }}
      >
        <DialogContent>
          <DialogContentText>
            Filter meteorite impact locations
          </DialogContentText>

          <Grid container direction="column" justify="space-evenly">
            <Grid item>
              <DatePicker
                name="start"
                label="Start"
                onChange={handleChange}
                value={start}
                views={['year']}
                autoOk
                disableFuture
                maxDate={end}
              />
            </Grid>
            <Grid item>
              <DatePicker
                name="end"
                label="End"
                onChange={handleChange}
                value={end}
                views={['year']}
                autoOk
                disableFuture
                minDate={start}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Filter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
