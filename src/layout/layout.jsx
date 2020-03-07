import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const Layout = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

export const Body = ({ children }) => {
  return (
    <Container maxWidth="lg" fixed>
      <main>{children}</main>
    </Container>
  )
}
export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Meteorite Impact Locations
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
