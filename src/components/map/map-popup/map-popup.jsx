import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

export const MapPopup = ({ location }) => {
  const [values, setValues] = useState(location)

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    event.persist()

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const { name, year, nametype, reclass, mass, fall } = values
  return (
    <form noValidate>
      <Textbox name="name" label="Name" onChange={handleChange} value={name} />
      <Textbox name="year" label="Year" onChange={handleChange} value={year} />
      <Textbox
        name="nametype"
        label="Type"
        onChange={handleChange}
        value={nametype}
      />
      <Textbox
        name="reclass"
        label="Reclass"
        onChange={handleChange}
        value={reclass}
      />
      <Textbox name="mass" label="Mass" onChange={handleChange} value={mass} />
      <Textbox name="fall" label="Fall" onChange={handleChange} value={fall} />
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

const Textbox = ({ name, label, onBlur, onChange, value }) => (
  <MuiTextField
    name={name}
    label={label}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    fullWidth
    InputProps={{
      disableUnderline: true
    }}
    InputLabelProps={{
      shrink: true
    }}
  />
)
