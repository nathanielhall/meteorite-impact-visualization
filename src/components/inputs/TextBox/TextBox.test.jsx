import React from 'react'
import { mount } from 'enzyme'
import { TextBox } from './TextBox'

const setup = (propOverrides) => {
  const props = {
    name: 'txtbox',
    label: 'Textbox',
    onBlur: jest.fn(),
    onChange: jest.fn(),
    ...propOverrides
  }
  const wrapper = mount(<TextBox {...props} />)
  return {
    props,
    wrapper
  }
}

test('<TextBox />', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

test.todo('more tests')
