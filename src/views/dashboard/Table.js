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

// const rows = [
//   {
//     age: 27,
//     status: 'current',
//     date: '09/27/2018',
//     name: 'Sally Quinn',
//     salary: '$19586.23',
//     email: 'eebsworth2m@sbwire.com',
//     designation: 'Human Resources Assistant'
//   },
//   {
//     age: 61,
//     date: '09/23/2016',
//     salary: '$23896.35',
//     status: 'professional',
//     name: 'Margaret Bowers',
//     email: 'kocrevy0@thetimes.co.uk',
//     designation: 'Nuclear Power Engineer'
//   },
//   {
//     age: 59,
//     date: '10/15/2017',
//     name: 'Minnie Roy',
//     status: 'rejected',
//     salary: '$18991.67',
//     email: 'ediehn6@163.com',
//     designation: 'Environmental Specialist'
//   },
//   {
//     age: 30,
//     date: '06/12/2018',
//     status: 'resigned',
//     salary: '$19252.12',
//     name: 'Ralph Leonard',
//     email: 'dfalloona@ifeng.com',
//     designation: 'Sales Representative'
//   },
//   {
//     age: 66,
//     status: 'applied',
//     date: '03/24/2018',
//     salary: '$13076.28',
//     name: 'Annie Martin',
//     designation: 'Operator',
//     email: 'sganderton2@tuttocitta.it'
//   },
//   {
//     age: 33,
//     date: '08/25/2017',
//     salary: '$10909.52',
//     name: 'Adeline Day',
//     status: 'professional',
//     email: 'hnisius4@gnu.org',
//     designation: 'Senior Cost Accountant'
//   },
//   {
//     age: 61,
//     status: 'current',
//     date: '06/01/2017',
//     salary: '$17803.80',
//     name: 'Lora Jackson',
//     designation: 'Geologist',
//     email: 'ghoneywood5@narod.ru'
//   },
//   {
//     age: 22,
//     date: '12/03/2017',
//     salary: '$12336.17',
//     name: 'Rodney Sharp',
//     status: 'professional',
//     designation: 'Cost Accountant',
//     email: 'dcrossman3@google.co.jp'
//   }
// ]

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
    fetch('https://localhost:8000/api/domains')
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
