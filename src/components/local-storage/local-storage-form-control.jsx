import React, { useState, Children, useEffect } from 'react'
const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args))

export const LocalStorageFormControl = ({
  id,
  children,
  formControl = Children.only(children),
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

  useEffect(() => {
    if (value) {
      const allChanges = accessLocalStorage(lsKey, [])
      const change = { timestamp: new Date().toJSON(), value }

      window.localStorage.setItem(
        lsKey,
        JSON.stringify([...allChanges, change])
      )
    } else {
      window.localStorage.removeItem(lsKey)
    }
  }, [value, lsKey])

  return React.cloneElement(formControl, {
    onBlur: callAll(formControl.props.onBlur, (e) => setValue(e.target.value)),
    defaultValue: value
  })
}
