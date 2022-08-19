// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TableListing from 'src/views/dashboard/TableListing'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'


const NosDomaines = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session) router.push('/401')  
  },[session,router]);
  

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12}>
          <TableListing domainType='isOwned' />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default NosDomaines
