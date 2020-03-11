import React from 'react'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
})

export const Header = ({ title, children }) => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
