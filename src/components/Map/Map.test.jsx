import React from 'react'
import { mount } from 'enzyme'
import { Map } from './Map'
import { Marker } from 'react-leaflet'

const testData = [
  {
    name: 'Aachen',
    id: '1',
    nametype: 'Valid',
    recclass: 'L5',
    mass: '21',
    fall: 'Fell',
    year: '1880-01-01T00:00:00.000',
    reclat: '50.775000',
    reclong: '6.083330',
    geolocation: { type: 'Point', coordinates: [6.08333, 50.775] }
  },
  {
    name: 'Aarhus',
    id: '2',
    nametype: 'Valid',
    recclass: 'H6',
    mass: '720',
    fall: 'Fell',
    year: '1951-01-01T00:00:00.000',
    reclat: '56.183330',
    reclong: '10.233330',
    geolocation: { type: 'Point', coordinates: [10.23333, 56.18333] }
  },
  {
    name: 'Abee',
    id: '6',
    nametype: 'Valid',
    recclass: 'EH4',
    mass: '107000',
    fall: 'Fell',
    year: '1952-01-01T00:00:00.000',
    reclat: '54.216670',
    reclong: '-113.000000',
    geolocation: { type: 'Point', coordinates: [-113, 54.21667] }
  },
  {
    name: 'Acapulco',
    id: '10',
    nametype: 'Valid',
    recclass: 'Acapulcoite',
    mass: '1914',
    fall: 'Fell',
    year: '1976-01-01T00:00:00.000',
    reclat: '16.883330',
    reclong: '-99.900000',
    geolocation: { type: 'Point', coordinates: [-99.9, 16.88333] }
  },
  {
    name: 'Achiras',
    id: '370',
    nametype: 'Valid',
    recclass: 'L6',
    mass: '780',
    fall: 'Fell',
    year: '1902-01-01T00:00:00.000',
    reclat: '-33.166670',
    reclong: '-64.950000',
    geolocation: { type: 'Point', coordinates: [-64.95, -33.16667] }
  }
]

const setup = (propOverrides) => {
  const props = {
    data: testData,
    ...propOverrides
  }
  const wrapper = mount(<Map {...props} />)
  return {
    props,
    wrapper
  }
}

test('<Map /> renders', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

describe('<Map /> markers', () => {
  const { wrapper } = setup()
  it.each(testData)('exist for each location', (location) => {
    expect(
      wrapper.find(`[data-test-id="marker_${location.id}"]`).exists()
    ).toBeTruthy()
  })
})
