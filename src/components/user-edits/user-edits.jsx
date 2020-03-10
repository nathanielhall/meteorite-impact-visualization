import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

// TODO: determine if this should be moved into useEffect or outside component
// TODO: think about removing the localstorage access to more easily test this
export const UserEdits = ({ onClose }) => {
  const getHistory = () => {
    let history = []

    for (var i = 0; i < localStorage.length; i++) {
      const lsKey = localStorage.key(i)

      if (lsKey.startsWith('mil:')) {
        const lsValue = JSON.parse(localStorage.getItem(lsKey) || '')
        const keyParts = lsKey.split(':')
        const id = keyParts[1]

        const report = lsValue.map((change, index) => {
          return {
            timestamp: new Date(change.timestamp).toDateString(),
            id: id,
            original: index === 0 ? '' : lsValue[index - 1].value,
            updated: change.value
          }
        })

        history = [...history, ...report]
      }
    }

    return history
  }

  return (
    <Dialog open>
      <DialogTitle>User Edits</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Original</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getHistory().map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.timestamp}
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.original}</TableCell>
                  <TableCell>{row.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
