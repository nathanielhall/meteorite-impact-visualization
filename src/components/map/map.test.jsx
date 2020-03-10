import React from 'react'
import { mount } from 'enzyme'
import { Map } from './map'

const setup = (propOverrides) => {
  const props = {
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
