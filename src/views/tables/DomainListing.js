import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Box, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import AddTaskIcon from '@mui/icons-material/AddTask';

const DomainListing = (props) => {
    const statusObj = {
        true: { color: 'info' },
        false: { color: 'error' },
        current: { color: 'primary' },
        resigned: { color: 'warning' },
        professional: { color: 'success' }
    }
    console.log(props.domain)
    
    
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
            <TableCell><AddTaskIcon/></TableCell> 
        </TableRow>
    )
}


export default DomainListing