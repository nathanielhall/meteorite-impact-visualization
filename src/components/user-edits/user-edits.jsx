import React from 'react'

export const LocationHistory = ({ location }) => {
  // TODO: Determine if this needs to be shared
  const accessLocalStorage = (key, defaultValue) => {
    let value
    try {
      value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
    } catch (e) {
      value = defaultValue
    }
    return value
  }

  const getHistory = () => {
    let history = []

    Object.keys(location).map((key) => {
      const ls = accessLocalStorage(`${location.id}:${key}`, [])
      const report = ls.map((change, index) => {
        return {
          timestamp: change.timestamp,
          id: location.id,
          original: index === 0 ? location.name : ls[index - 1].value,
          updated: change.value
        }
      })

      history = [...history, ...report]
    })

    return history
  }

  return (
    <table>
      <th>Timestamp</th>
      <th>Id</th>
      <th>Original</th>
      <th>Updated</th>
      <tbody>
        {getHistory().map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.timestamp}</td>
              <td>{item.id}</td>
              <td>{item.original}</td>
              <td>{item.updated}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
