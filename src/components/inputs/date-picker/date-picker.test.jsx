import React from 'react'
import { mount } from 'enzyme'
import { DatePicker } from './date-picker'
import { KeyboardDatePicker as MuiDatePicker } from '@material-ui/pickers'

const setup = (propOverrides) => {
  const props = {
    name: 'datepicker',
    value: new Date('04/23/2001'),
    onChange: jest.fn(),
    label: 'My Field',
    format: 'dd/MM/yyyy',
    ...propOverrides
  }
  const wrapper = mount(<DatePicker {...props} />)
  return {
    props,
    wrapper,
    inputLocator: '[name="datepicker"]'
  }
}

test('<KeyboardDatePicker />', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

test('props were set on wrapped component', () => {
  const { wrapper, props } = setup()

  const muiDatePicker = wrapper.find(MuiDatePicker)
  expect(muiDatePicker.props().value).toBe(props.value)
  expect(muiDatePicker.props().label).toBe(props.label)
  expect(muiDatePicker.props().format).toBe(props.format)
  expect(muiDatePicker.props().placeholder).toBe(props.placeholder)
  expect(muiDatePicker.props().name).toBe(props.name)
})

test('the onChange is called', () => {
  const { wrapper, inputLocator, props } = setup()

  const input = wrapper.find(inputLocator).hostNodes()
  input.simulate('change', { target: { value: '01/01/2020' } })

  expect(props.onChange).toHaveBeenCalledTimes(1)
})
