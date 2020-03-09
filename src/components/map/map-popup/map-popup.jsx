import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextBox } from 'components/inputs/text-box'
import { DatePicker } from 'components/inputs/date-picker'

export const MapPopup = ({ location }) => {
  // const [values, setValues] = useState(location)

  // const handleChange = (event) => {
  //   const target = event.target
  //   const value = target.value
  //   const name = target.name

  //   setValues((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }))
  // }

  const { id, name, year, nametype, recclass, mass, fall } = location
  return (
    <form noValidate>
      <LocalStorageFormControl id={id}>
        <TextBox name="name" label="Name" value={name} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <DatePicker
          name="year"
          label="Year"
          value={year}
          format="yyyy"
          views={['year']}
          autoOk
          disableFuture
        />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="nametype" label="Type" value={nametype} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="recclass" label="Recclass" value={recclass} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="mass" label="Mass" value={mass} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="fall" label="Fall" value={fall} />
      </LocalStorageFormControl>
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

const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args))

const LocalStorageFormControl = ({
  id,
  children,
  formControl = React.Children.only(children),
  lsKey = `${id}:${formControl.props.name}`
}) => {
  const [value, setValue] = useState(() => {
    let value
    try {
      value =
        JSON.parse(window.localStorage.getItem(lsKey)) ||
        formControl.props.value
    } catch (e) {
      value = formControl.props.value
    }
    return value
  })

  React.useEffect(() => {
    if (value) {
      window.localStorage.setItem(lsKey, JSON.stringify(value))
    } else {
      window.localStorage.removeItem(lsKey)
    }
  }, [value, lsKey])

  return React.cloneElement(formControl, {
    onChange: callAll(formControl.props.onChange, (e) =>
      setValue(e.target.value)
    ),
    value
  })
}

// useEffect(() => {
//   window.localStorage.setItem(key, JSON.stringify(state))
// }, [state])
