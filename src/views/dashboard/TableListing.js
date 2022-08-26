// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useState, useEffect } from 'react'
import DomainListingRemove from '../tables/DomainListingRemove'
import fetchOptions from 'src/configs/fetchOptions'

const TableListing = (props) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  let filter = ''
  switch (props.domainType) {
    case 'isOwned':
      filter = '?attemptMade=true&isOwned=true&boughtOn=DESC'
      break;

    case 'isLost':
      filter = '?attemptMade=true&isOwned=false'

    default:
      break;
  }
  console.log(`${process.env.NEXT_APP_API_URL}api/domains${filter}`)
  useEffect(() => {
    //setLoading(true)
    fetch(`${process.env.NEXT_APP_API_URL}api/domains${filter}`, fetchOptions)
      .then(res => res.json())
      .then(data => {
        setData(data.response.data)
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
  if (!data || 0 === data.length) return <p>No profile data</p>
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Registrar</TableCell>
              <TableCell>Date d'expiration</TableCell>
              <TableCell>Date de lancement</TableCell>
              <TableCell>Date d'achat</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((row, index) => (
                <DomainListingRemove key={index} domain={row} handleRemoveItem={handleRemoveItem} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TableListing


