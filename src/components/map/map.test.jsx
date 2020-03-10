import React from 'react'
import { mount } from 'enzyme'
import { Map } from './Map'

const setup = (propOverrides) => {
  const props = {
    data: [],
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
