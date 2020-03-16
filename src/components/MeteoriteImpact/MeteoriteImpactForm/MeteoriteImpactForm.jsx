import React from 'react'
import { TextBox } from 'components/FormControls/TextBox'
import { LocalStorageFormControl } from 'components/LocalStorageFormControl'
import { format } from 'date-fns'

export const MeteoriteImpactForm = ({
  location: { id, name, year, nametype, recclass, mass, fall, reclat, reclong }
}) => {
  const formattedYear = format(new Date(year), 'yyyy-MM-dd')
  return (
    <form noValidate>
      <LocalStorageFormControl id={id}>
        <TextBox name="name" label="Name" defaultValue={name} />
      </LocalStorageFormControl>

      <LocalStorageFormControl id={id}>
        <TextBox
          name="year"
          label="Year"
          type="date"
          defaultValue={formattedYear}
        />
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
      <LocalStorageFormControl id={id}>
        <TextBox
          name="reclat"
          label="Latitude"
          defaultValue={reclat}
          type="number"
        />
      </LocalStorageFormControl>
      <LocalStorageFormControl id={id}>
        <TextBox
          name="reclong"
          label="Longitude"
          defaultValue={reclong}
          type="number"
        />
      </LocalStorageFormControl>
    </form>
  )
}
