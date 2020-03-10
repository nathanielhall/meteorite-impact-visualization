import React from 'react'
import { mount } from 'enzyme'
import { Header } from './header'

const setup = (propOverrides) => {
  const props = {
    title: 'header title here',
    ...propOverrides
  }
  const wrapper = mount(<Header {...props} />)
  return {
    props,
    wrapper
  }
}

test('<Header />', () => {
  const { wrapper } = setup()
  expect(wrapper.exists()).toBeTruthy()
})

test('header title displays', () => {
  const { wrapper, props } = setup()

  expect(wrapper.find('h6').contains(props.title)).toBeTruthy()
})
