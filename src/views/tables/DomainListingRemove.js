import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Box, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCallback, useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsoleNetworkOutline } from 'mdi-material-ui';


const DomainListingRemove = (props) => {
    const statusObj = {
        true: { color: 'info' },
        false: { color: 'error' },
        current: { color: 'primary' },
        resigned: { color: 'warning' },
        professional: { color: 'success' }
    }
    
    const [display, setDisplay] = useState(true)
    
    const fetchData = useCallback(async (domain) => {
        let response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}api/domains/${domain.id}`)
            .then((response) =>{
                if(response.status === 204){
                    console.log('204')
                    notify()
                }
            })
            setDisplay(display => (!display))
            props.domain.display = display
    }, [])

    const handleRemoveDomain = (domain) => {
        fetchData(domain)
        props.handleRemoveItem(props.domain.id)
    }
    const notify = () => toast("Le domaine a bien été retiré !"); 
    console.log(props)
    return (
        <TableRow hover data-id={props.domain.id} key={props.domain.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{props.domain.name}</Typography>
                
                </Box>
            </TableCell>
            <TableCell>{props.domain.status}</TableCell>
            <TableCell>{props.domain.launchTime}</TableCell>
            <TableCell>
                 <Chip
                label={props.domain.hold ? 'oui' : 'non'}
                color={statusObj[props.domain.hold].color}
                sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                }}
                />
            </TableCell>
            <TableCell>{props.domain.lastUpdate}</TableCell>
            <TableCell>{props.domain.expiryDate}</TableCell>
            <TableCell>  
                {display && <DeleteForeverIcon classList={display} onClick={(e) => handleRemoveDomain(props.domain)}/>}
            </TableCell> 
            <ToastContainer/>
        </TableRow>
    )
}


export default DomainListingRemove