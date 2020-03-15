import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

export const Map = ({ children }) => {
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
      {children}
    </LeafletMap>
  )
}

const useStyles = makeStyles({
  popup: {
    width: '310px'
  }
})
export const MapMarker = ({ id, onClose, children, latitude, longitude }) => {
  const classes = useStyles()

  // TODO: Validate longitude / latitude rather than just check for falsy value
  if (!latitude || !longitude) return null

  return (
    <Marker
      id={id}
      position={[latitude, longitude]}
      data-test-id={`marker_${id}`}
    >
      {children ? (
        <Popup className={classes.popup} onClose={onClose}>
          {children}
        </Popup>
      ) : null}
    </Marker>
  )
}

Map.propTypes = {
  data: PropTypes.array
}
