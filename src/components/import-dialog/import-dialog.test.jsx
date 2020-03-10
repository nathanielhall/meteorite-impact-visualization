import React from 'react'
import { mount } from 'enzyme'
import { ImportDialog } from './import-dialog'

const setup = (propOverrides) => {
  const props = {
    startDate: '',
    endDate: '',
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    ...propOverrides
  }
  const wrapper = mount(<ImportDialog {...props} />)
  return {
    props,
    wrapper,
    startDateLocator: 'input[name="start"]',
    endDateLocator: 'input[name="end"]',
    submitLocator: '[type="submit"]'
  }
}

test('<ImportDialog />', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

test.skip('can submit the form with valid values', () => {
  const {
    wrapper,
    startDateLocator,
    endDateLocator,
    submitLocator,
    props
  } = setup()

  const startDate = '01/01/2020'
  const endDate = '01/01/2020'

  wrapper
    .find(startDateLocator)
    .simulate('change', { target: { name: 'start', value: startDate } })
  wrapper
    .find(endDateLocator)
    .simulate('change', { target: { name: 'end', value: endDate } })

  wrapper.find(submitLocator).simulate('click')

  expect(props.onSubmit).toHaveBeenCalled(1)
  expect(props.onSubmit).toHaveBeenCalledWith({
    start: startDate,
    end: endDate
  })
})
