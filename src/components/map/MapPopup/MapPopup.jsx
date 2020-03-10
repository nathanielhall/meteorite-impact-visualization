import React from 'react'
//import PropTypes from 'prop-types'
import { TextBox } from 'components/inputs/TextBox'
import { DatePicker } from 'components/inputs/DatePicker'
import { LocalStorageFormControl } from 'components/LocalStorageFormControl'

export const MapPopup = ({
  location: { id, year, name, nametype, recclass, mass, fall }
}) => (
  <form noValidate>
    <LocalStorageFormControl id={id}>
      <TextBox name="name" label="Name" defaultValue={name} />
    </LocalStorageFormControl>

    <LocalStorageFormControl id={id}>
      <DatePicker
        name="year"
        label="Year"
        defaultValue={year}
        format="yyyy"
        views={['year']}
        autoOk
        disableFuture
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

// FIXME: resolve issue with proptypes
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
