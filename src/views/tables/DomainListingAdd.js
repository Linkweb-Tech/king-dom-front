import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Box, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useCallback, useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsoleNetworkOutline } from 'mdi-material-ui';

const DomainListingAdd = (props) => {
    const statusObj = {
        true: { color: 'info' },
        false: { color: 'error' },
        current: { color: 'primary' },
        resigned: { color: 'warning' },
        professional: { color: 'success' }
    }

    props.domain.isSnapped = false
    props.domain.isOwned = false
    
    const [display, setDisplay] = useState(true)
    
    const fetchData = useCallback(async (domain) => {
        let response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}api/domains`, 
            domain
            )
            .then((response) =>{
                if(response.status === 201){
                    console.log('201')
                    notify()
                }
            })
            setDisplay(display => (!display))
            props.domain.display = display
    }, [])

    const handleStoreDomain = (domain) => {
        fetchData(domain)
        props.handleAddItem(props.domain.name)
    }
    const notify = () => toast("Le domaine a bien été sauvegardé !"); 

    return (
        <TableRow hover key={props.domain.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
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
                {display && <AddTaskIcon classList={display} onClick={(e) => handleStoreDomain(props.domain)}/>}
            </TableCell> 
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </TableRow>
    )
}


export default DomainListingAdd