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

test('renders', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

describe('when text is changed', () => {
  it('calls the onChange handler', () => {
    const {
      wrapper,
      props: { onChange }
    } = setup()
    const testValue = 'testabc'
    wrapper.find('input').simulate('change', { target: { value: testValue } })
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: testValue } })
    )
  })
})

describe('when focus is lost', () => {
  it('calls onBlur handler', () => {
    const { wrapper, props } = setup()

    wrapper.find('input').simulate('blur')
    expect(props.onBlur).toBeCalledTimes(1)
  })
})
