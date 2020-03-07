import React from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import PropTypes from 'prop-types'

export const MapContainer = ({ data }) => {
  return (
    <Map
      style={{ width: '100%', height: '100vh' }}
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
            />
          )
      )}
    </Map>
  )
}

MapContainer.propTypes = {
  data: PropTypes.array
}
