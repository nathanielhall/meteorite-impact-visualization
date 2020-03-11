import React from 'react'
import { TextBox } from 'components/inputs/TextBox'
import { LocalStorageFormControl } from 'components/LocalStorageFormControl'

export const MapPopup = ({
  location: { id, year, name, nametype, recclass, mass, fall }
}) => (
  <form noValidate>
    <LocalStorageFormControl id={id}>
      <TextBox name="name" label="Name" defaultValue={name} />
    </LocalStorageFormControl>

    <LocalStorageFormControl id={id}>
      <TextBox
        name="year"
        label="Year"
        defaultValue={new Date(year).getFullYear()}
        onChange={() =>
          console.log('changing the date should re-filter the datasource')
        }
        disabled
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
  </form>
)
