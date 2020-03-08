import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core'

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

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Meteorite Impact Locations
        </Typography>

        <Button color="inherit">Filter</Button>
      </Toolbar>
    </AppBar>
  )
}
