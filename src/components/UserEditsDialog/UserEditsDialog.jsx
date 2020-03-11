import React, { useState, useEffect } from 'react'
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

export const UserEditsDialog = ({ onClose }) => {
  const [edits, setEdits] = useState()

  const getUserEdits = () => {
    let allEdits = []

    for (var i = 0; i < localStorage.length; i++) {
      const lsKey = localStorage.key(i)

      if (lsKey.startsWith('mil:')) {
        const lsValue = JSON.parse(localStorage.getItem(lsKey) || '')
        const keyParts = lsKey.split(':')
        const id = keyParts[1]

        const locationEdits = lsValue.map((change) => {
          return {
            key: change.timestamp,
            timestamp: new Date(change.timestamp),
            id: id,
            original: change.previous,
            updated: change.value
          }
        })

        allEdits = [...allEdits, ...locationEdits]
      }
    }

    // Sort by timestamp with last change on top
    return allEdits.sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1
      if (a.timestamp > b.timestamp) return -1
    })
  }

  useEffect(() => {
    const edits = getUserEdits()
    setEdits(edits)
  }, [])

  // FIXME: fix time format
  return (
    <Dialog open>
      <DialogTitle>User Edits</DialogTitle>
      <DialogContent>
        {edits && (
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
                  <TableRow key={row.key}>
                    <TableCell component="th" scope="row">
                      {row.timestamp.toISOString()}
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.original}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
