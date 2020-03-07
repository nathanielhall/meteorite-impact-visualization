import React from 'react'
import { Header } from './header'
import { Body } from './body'

export const Layout = () => {
  return (
    <div>
      <Header />
      <Body>
        <span>Hello</span>
      </Body>
    </div>
  )
}
