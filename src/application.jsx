import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from 'components/map'
import { Header } from 'components/header'
import Button from '@material-ui/core/Button'
import { UserEdits } from 'components/user-edits'
import { ImportDialog } from 'components/import-dialog'

export const Application = () => {
  const [data, setData] = useState()
  const [startDate, setStartDate] = useState(new Date('01/01/2010'))
  const [endDate, setEndDate] = useState(new Date('03/01/2020'))
  const [showUserEdits, setShowUserEdits] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)

  const onSubmit = (values) => {
    setStartDate(values.start)
    setEndDate(values.end)
  }

  useEffect(() => {}, [])

  useEffect(() => {
    const getLocations = async () => {
      const response = await axios.get(
        'https://data.nasa.gov/resource/y77d-th95.json'
      )

      const filteredData = response.data.filter((d) => {
        const yr = new Date(d.year).getFullYear()
        return yr >= startDate.getFullYear() && yr <= endDate.getFullYear()
      })

      setData(filteredData)
    }

    getLocations()
  }, [startDate, endDate])

  return (
    <div>
      <Header title="Meteorite Impact Locations">
        <Button color="inherit" onClick={() => setShowUserEdits(true)}>
          Edits
        </Button>
        <Button color="inherit" onClick={() => setShowImportDialog(true)}>
          Import
        </Button>
      </Header>
      <main>{data && <Map data={data} />}</main>
      {showUserEdits && <UserEdits onClose={() => setShowUserEdits(false)} />}
      {showImportDialog && (
        <ImportDialog
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
          onClose={() => setShowImportDialog(false)}
        />
      )}
    </div>
  )
}
