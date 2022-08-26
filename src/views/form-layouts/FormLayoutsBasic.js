// ** React Imports
import { useState, useCallback } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import DomainListingAdd from '../tables/DomainListingAdd'
import axiosOptions from 'src/configs/axiosOptions'

const FormLayoutsBasic = () => {
  const [domainName, setDomainName] = useState('');
  const [fetchedData, setFetchedData] = useState([])

  const fetchData = useCallback(async (domainName) => {
    let response = await axios.get(`${process.env.NEXT_APP_API_URL}api/domains/whois?domainName=${domainName}`, axiosOptions)
    setFetchedData(fetchedData => [{ ...response.data.response.data, name: domainName }, ...fetchedData])
    setDomainName('')
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if ('' !== domainName) {
      fetchData(domainName)
    }
  }

  const clearWhois = () => {
    setFetchedData([])
  }

  const handleAddItem = (itemName) => {
    setFetchedData(
      fetchedData.filter((item) => {
        return item.name != itemName
      })
    )
  }

  return (
    <Card>
      <CardHeader title='Rechercher un domaines' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                name='domainName'
                fullWidth
                label='Nom de domaine'
                placeholder='Saisir le nom de domaine'
                onChange={e => setDomainName(e.target.value)}
                value={domainName}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Vérifications
                </Button>
                <Button onClick={clearWhois} variant='contained' size='large'>
                  Tout effacer
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      {fetchedData.length > 0 &&
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  fetchedData.map((row, index) => (
                    <DomainListingAdd key={index} domain={row} handleAddItem={handleAddItem} />
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      }
    </Card>
  )
}

export default FormLayoutsBasic
