export const getMostRecentEdits = () => {
  let allEdits = []

  for (var i = 0; i < localStorage.length; i++) {
    const lsKey = localStorage.key(i)

    if (lsKey.startsWith('mil:')) {
      const lsValue = JSON.parse(localStorage.getItem(lsKey) || '')

      const keyParts = lsKey.split(':')
      const id = keyParts[1]
      const fieldName = keyParts[2]

      const mostRecentEdit = lsValue[lsValue.length - 1]
      allEdits = [...allEdits, { ...mostRecentEdit, field: fieldName, id }]
    }
  }

  return allEdits
}

export const accessLocalStorage = (key, defaultValue) => {
  let value
  try {
    value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
  } catch (e) {
    value = defaultValue
  }
  return value
}
