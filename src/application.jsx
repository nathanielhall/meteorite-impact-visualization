import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map, MapMarker } from 'components/Map'
import { Header } from 'components/Header'
import Button from '@material-ui/core/Button'
import { getMostRecentEdits } from './local-storage'
import {
  MeteoriteImpactForm,
  MeteoriteImpactImport,
  MeteoriteImpactEdits
} from 'components/MeteoriteImpact'

export const Application = () => {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(new Date('01/01/2010'))
  const [endDate, setEndDate] = useState(new Date())
  const [showUserEdits, setShowUserEdits] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)

  const onSubmit = (values) => {
    setStartDate(values.start)
    setEndDate(values.end)
  }

  const importLocations = async () => {
    // 1) Retrieve data from api
    const response = await axios.get(
      'https://data.nasa.gov/resource/y77d-th95.json'
    )

    // 2) Merge local storage updates (year and coordinate changes only)
    const edits = getMostRecentEdits().filter(
      (d) => d.field === 'year' || d.field === 'reclat' || d.field === 'reclong'
    )

    let updatedData = []
    if (edits && edits.length > 0) {
      // apply user edits to the data retrieved from api
      updatedData = response.data.map((d) => {
        let foundUserEdits = edits.filter((edit) => edit.id === d.id)

        // No edits exist for this data item, return original
        if (!foundUserEdits || foundUserEdits.length <= 0) return d

        // apply one ore more changes to this data row
        const mergeChange = (change) => {
          if (change.field === 'year') {
            let [year, month, day] = change.value.split('-')
            let parsedDate = new Date(
              parseInt(year),
              parseInt(month),
              parseInt(day)
            )

            return { ...d, [change.field]: parsedDate }
          } else {
            return { ...d, [change.field]: change.value }
          }
        }

        if (Array.isArray(foundUserEdits)) {
          foundUserEdits.forEach((item) => {
            d = mergeChange(item)
          })
        } else {
          d = mergeChange(foundUserEdits)
        }

        return d
      })
    } else {
      // no user edits
      updatedData = response.data
    }

    // 3) Filter data by start and end dates
    const filterDataWithEdits = updatedData.filter((d) => {
      const yr = new Date(d.year).getFullYear()
      return yr >= startDate.getFullYear() && yr <= endDate.getFullYear()
    })

    setData(filterDataWithEdits)
  }

  useEffect(() => {
    importLocations()
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
      <main>
        <Map>
          {data.map((impact) => (
            <MapMarker
              id={impact.id}
              key={impact.id}
              onClose={importLocations}
              latitude={impact.reclat}
              longitude={impact.reclong}
            >
              <MeteoriteImpactForm location={impact} />
            </MapMarker>
          ))}
        </Map>
      </main>
      {showUserEdits && (
        <MeteoriteImpactEdits onClose={() => setShowUserEdits(false)} />
      )}
      {showImportDialog && (
        <MeteoriteImpactImport
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
          onClose={() => setShowImportDialog(false)}
        />
      )}
    </div>
  )
}
