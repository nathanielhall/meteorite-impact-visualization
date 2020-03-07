import React from 'react'
import { Container } from '@material-ui/core'

export const Body = ({ children }) => {
  return (
    <Container maxWidth="lg" fixed>
      <main>{children}</main>
    </Container>
  )
}
