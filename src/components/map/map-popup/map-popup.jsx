import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { TextBox } from 'components/inputs/text-box'

export const MapPopup = ({
  location: { id, name, nametype, recclass, mass, fall }
}) => {
  return (
    <form noValidate>
      <label htmlFor="name">Name</label>
      <LocalStorageFormControl id={id}>
        <TextBox name="name" defaultValue={name} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="nametype" label="Type" defaultValue={nametype} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="recclass" label="Recclass" defaultValue={recclass} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="mass" label="Mass" defaultValue={mass} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox name="fall" label="Fall" defaultValue={fall} />
      </LocalStorageFormControl>
    </form>
  )
}

// MapPopup.propTypes = {
//   location: PropTypes.objectOf({
//     name: PropTypes.string,
//     id: PropTypes.number,
//     nametype: PropTypes.string,
//     recclass: PropTypes.string,
//     mass: PropTypes.number,
//     fall: PropTypes.string,
//     year: PropTypes.string,
//     reclat: PropTypes.number,
//     reclong: PropTypes.number,
//     geolocation: PropTypes.objectOf({
//       type: PropTypes.string,
//       coordinates: PropTypes.arrayOf(PropTypes.number)
//     })
//   })
// }

//const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args))

// form control
const LocalStorageFormControl = ({
  id,
  children,
  formControl = React.Children.only(children),
  lsKey = `${id}:${formControl.props.name}`
}) => {
  const accessLocalStorage = (key, defaultValue) => {
    let value
    try {
      value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
    } catch (e) {
      value = defaultValue
    }
    return value
  }

  const [value, setValue] = useState(() => {
    const value = accessLocalStorage(lsKey, formControl.props.defaultValue)

    if (Array.isArray(value)) {
      const { value: mostRecentValue } = value[value.length - 1]
      return mostRecentValue
    } else {
      return value
    }
  })

  React.useEffect(() => {
    if (value) {
      const allChanges = accessLocalStorage(lsKey, [])
      const change = { timestamp: new Date().getTime(), value }

      window.localStorage.setItem(
        lsKey,
        JSON.stringify([...allChanges, change])
      )
    } else {
      window.localStorage.removeItem(lsKey)
    }
  }, [value, lsKey])

  return React.cloneElement(formControl, {
    onBlur: (e) => setValue(e.target.value),
    defaultValue: value
  })
}
