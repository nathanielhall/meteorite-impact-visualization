import { useState, useEffect } from 'react'

export function useLocalStorateState(key, defaultValue) {
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
    } catch (e) {
      value = defaultValue
    }
    return value
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}
