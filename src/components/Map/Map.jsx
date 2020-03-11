import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { MapPopup } from './MapPopup'

const useStyles = makeStyles({
  popup: {
    width: '310px'
  }
})

export const Map = ({ data }) => {
  const classes = useStyles()

  return (
    <LeafletMap
      style={{ width: '100%', height: '90vh' }}
      center={[45.4, -75.7]}
      zoom={3}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map(
        (location) =>
          location.reclat &&
          location.reclong && (
            <Marker
              key={location.id}
              position={[location.reclat, location.reclong]}
            >
              <Popup className={classes.popup}>
                <MapPopup location={location} />
              </Popup>
            </Marker>
          )
      )}
    </LeafletMap>
  )
}

Map.propTypes = {
  data: PropTypes.array
}
