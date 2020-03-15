import React from 'react'
import { mount } from 'enzyme'
import { MeteoriteImpactImport } from './MeteoriteImpactImport'

const setup = (propOverrides) => {
  const props = {
    startDate: '01/01/2020',
    endDate: '01/01/2020',
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    ...propOverrides
  }
  const wrapper = mount(<MeteoriteImpactImport {...props} />)
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
    props: { onSubmit, startDate, endDate }
  } = setup({ startDate: '01/01/2010', endDate: '01/01/2020' })

  wrapper
    .find(startDateLocator)
    .simulate('change', { target: { name: 'start', value: startDate } })
  wrapper
    .find(endDateLocator)
    .simulate('change', { target: { name: 'end', value: endDate } })

  wrapper.find(submitLocator).simulate('click')

  expect(onSubmit).toHaveBeenCalled(1)
  expect(onSubmit).toHaveBeenCalledWith({
    start: startDate,
    end: endDate
  })
})
