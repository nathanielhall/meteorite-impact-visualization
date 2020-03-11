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
export const UserEditsDialog = ({ onClose }) => {
  // for each ls item
  //

  const getUserEdits = () => {
    let history = []

    // FIXME: Use reduce?
    for (var i = 0; i < localStorage.length; i++) {
      const lsKey = localStorage.key(i)

      if (lsKey.startsWith('mil:')) {
        const lsValue = JSON.parse(localStorage.getItem(lsKey) || '')
        const keyParts = lsKey.split(':')
        const id = keyParts[1]

        const item = lsValue.map((change, index) => {
          return {
            timestamp: new Date(change.timestamp),
            id: id,
            original: index === 0 ? '' : lsValue[index - 1].value,
            updated: change.value
          }
        })

        history = [...history, ...item]
      }
    }

    // Sort by timestamp with last change on top
    return history.sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1
      if (a.timestamp > b.timestamp) return -1
    })
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
              {getUserEdits().map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.timestamp.toDateString()}
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
