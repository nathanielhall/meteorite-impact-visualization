import React from 'react'
import { mount } from 'enzyme'
import { MapPopup } from './map-popup'

const setup = (propOverrides) => {
  const props = {
    location: {
      name: 'Name',
      year: '2001',
      nametype: 'VALID',
      recclass: 'C',
      mass: '993.3',
      fall: 'fell'
    },
    ...propOverrides
  }
  const wrapper = mount(<MapPopup {...props} />)
  return {
    props,
    wrapper
  }
}

test('<MapPopup /> renders', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

describe('form displays', () => {
  const { wrapper, props } = setup()
  it('name', () => {
    const { name } = props.location
    expect(wrapper.find('input[name="name"]').props().defaultValue).toBe(name)
  })
  it('year', () => {
    const { year } = props.location
    expect(wrapper.find('input[name="year"]').props().defaultValue).toBe(year)
  })
  it('nametype', () => {
    const { nametype } = props.location
    expect(wrapper.find('input[name="nametype"]').props().defaultValue).toBe(
      nametype
    )
  })
  it('recclass', () => {
    const { recclass } = props.location
    expect(wrapper.find('input[name="recclass"]').props().defaultValue).toBe(
      recclass
    )
  })
  it('mass', () => {
    const { mass } = props.location
    expect(wrapper.find('input[name="mass"]').props().defaultValue).toBe(mass)
  })
  it('fall', () => {
    const { fall } = props.location
    expect(wrapper.find('input[name="fall"]').props().defaultValue).toBe(fall)
  })
})
