// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useState, useEffect } from 'react'
import DomainListingRemove from '../tables/DomainListingRemove'
import { ConsoleNetworkOutline } from 'mdi-material-ui'
import { CollectionsOutlined } from '@mui/icons-material'


const statusObj = {
  true: { color: 'info' },
  false: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const TableListing = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    //setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/domains`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data['hydra:member'])
        setLoading(false)
      })
  }, [setLoading])

  const handleRemoveItem = (itemID) => {
    setData(
      data.filter((item) => {
        return item.id != itemID
      })
    )
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <Card>
      <TableContainer>
        
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Heure de connection</TableCell>
              <TableCell>Verrouillé</TableCell>
              <TableCell>Dernière MAJ</TableCell>
              <TableCell>Date d'expiration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { 
              data.map(row => (
                <DomainListingRemove domain={row} handleRemoveItem={handleRemoveItem} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TableListing


