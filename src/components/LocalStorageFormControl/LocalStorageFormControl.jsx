import React, { useState, Children, useEffect } from 'react'
const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args))

export const LocalStorageFormControl = ({
  id,
  children,
  formControl = Children.only(children),
  lsKey = `mil:${id}:${formControl.props.name}`
}) => {
  const [hasChanged, setHasChanged] = useState(false)

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
    if (!hasChanged) return

    if (value) {
      const allChanges = accessLocalStorage(lsKey, [])

      // if this is the first change made for this field, log the default value as well
      const change =
        allChanges.length === 0
          ? [
              {
                timestamp: new Date().getTime(),
                value: formControl.props.defaultValue
              },
              { timestamp: new Date().getTime(), value }
            ]
          : [{ timestamp: new Date().getTime(), value }]

      window.localStorage.setItem(
        lsKey,
        JSON.stringify([...allChanges, ...change])
      )
    } else {
      window.localStorage.removeItem(lsKey)
    }
  }, [value, lsKey])

  return React.cloneElement(formControl, {
    onBlur: callAll(formControl.props.onBlur, (e) => setValue(e.target.value)),
    onChange: callAll(formControl.props.onChange, (e) =>
      setHasChanged(e.target.value)
    ),
    defaultValue: value
  })
}
