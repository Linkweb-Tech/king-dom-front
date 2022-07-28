// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import FormLayoutsWhois from 'src/views/form-layouts/FormLayoutsBasic'

const Whois = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session) router.push('/401')  
  },[]);
  return (
    <ApexChartWrapper>
      <FormLayoutsWhois />
    </ApexChartWrapper>
  )
}

export default Whois
