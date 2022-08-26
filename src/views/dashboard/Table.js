// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useState, useEffect } from 'react'
import fetchOptions from 'src/configs/fetchOptions'
import moment from 'moment-timezone'

const DashboardTable = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_APP_API_URL}api/domains?attemptMade=false&launchDate=ASC`, fetchOptions)
      .then(res => res.json())
      .then(data => {
        setData(data.response.data)
        setLoading(false)
      })
  }, [])

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
              <TableCell>Dernière mise à jour</TableCell>
              <TableCell>Ajouté le</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((row, index) => (
                <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.registrar ?? '___'}</TableCell>
                  <TableCell>{moment(row.expiresOn).format('DD/MM/Y HH:mm')}</TableCell>
                  <TableCell>{moment(row.launchDate).format('DD/MM/Y HH:mm')}</TableCell>
                  <TableCell>{row.lastUpdatedAt ? moment(row.lastUpdatedAt).format('DD/MM/Y HH:mm') : '___'}</TableCell>
                  <TableCell>{moment(row.createdAt).format('DD/MM/Y HH:mm')}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable


