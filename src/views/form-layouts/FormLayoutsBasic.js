// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import DomainListingAdd from '../tables/DomainListingAdd'


const FormLayoutsBasic = () => {
  // ** States

  
  const [keywords, setKeywords] = useState('')
  const [fetchedData, setFetchedData] = useState([])
  const [isWhoisFetched, setisWhoisFetched] = useState(false)
  
  const fetchData = useCallback(async (keywords) => {
    
    let response = await axios.post(
       `${process.env.NEXT_PUBLIC_API_URL}whois?domain=${keywords}`
      )
      //setFetchedData(fetchedData.concat(response.data))
      setFetchedData(fetchedData => [response.data, ...fetchedData])
      setKeywords('')
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    fetchData(keywords)
 
  } 

  const clearWhois = () => {
    setisWhoisFetched(false)  
    setFetchedData([])
  }


  return (
    <Card>
      <CardHeader title='Rechercher un domaines' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField 
                name='domain' 
                fullWidth 
                label='Domaine' 
                placeholder='Saisir le nom de domaine' 
                onChange={e => setKeywords(e.target.value)}
                value={keywords}
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
                  fetchedData.map(row => (
                    <DomainListingAdd domain={row} />
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
