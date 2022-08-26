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


const statusObj = {
  true: { color: 'info' },
  false: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_APP_API_URL}api/domains`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data['hydra:member'])
        setLoading(false)
      })
  }, [])



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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.status}</TableCell>

                <TableCell>{row.launchTime}</TableCell>

                <TableCell>
                  <Chip
                    label={row.hold ? 'oui' : 'non'}
                    color={statusObj[row.hold].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row.lastUpdate}</TableCell>
                <TableCell>{row.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable


