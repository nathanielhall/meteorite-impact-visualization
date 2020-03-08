import React from 'react'
import PropTypes from 'prop-types'
import { TextBox } from 'components/text-box'
import { DatePicker } from 'components/date-picker'
import { useLocalStorateState } from 'components/local-storage'

export const MapPopup = ({ location }) => {
  const [values, setValues] = useLocalStorateState(location.id, location)

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const { name, year, nametype, recclass, mass, fall } = values
  return (
    <form noValidate>
      <TextBox name="name" label="Name" onChange={handleChange} value={name} />
      <DatePicker
        name="year"
        label="Year"
        onChange={handleChange}
        value={year}
        format="yyyy"
        views={['year']}
        autoOk
        disableFuture
      />
      <TextBox
        name="nametype"
        label="Type"
        onChange={handleChange}
        value={nametype}
      />
      <TextBox
        name="recclass"
        label="Recclass"
        onChange={handleChange}
        value={recclass}
      />
      <TextBox name="mass" label="Mass" onChange={handleChange} value={mass} />
      <TextBox name="fall" label="Fall" onChange={handleChange} value={fall} />
    </form>
  )
}

MapPopup.propTypes = {
  location: PropTypes.objectOf({
    name: PropTypes.string,
    id: PropTypes.number,
    nametype: PropTypes.string,
    recclass: PropTypes.string,
    mass: PropTypes.number,
    fall: PropTypes.string,
    year: PropTypes.string,
    reclat: PropTypes.number,
    reclong: PropTypes.number,
    geolocation: PropTypes.objectOf({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    })
  })
}
