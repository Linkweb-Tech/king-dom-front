import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Typography } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useCallback, useState } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import axiosOptions from 'src/configs/axiosOptions';
import moment from 'moment-timezone'

const DomainListingAdd = (props) => {
    props.domain.isSnapped = false
    props.domain.isOwned = false

    const [display, setDisplay] = useState(true)

    const fetchData = useCallback(async (domain) => {
        await axios.post(`${process.env.NEXT_APP_API_URL}api/domains`, domain, axiosOptions)
        setDisplay(display => (!display))
        props.domain.display = display
    }, [])

    const handleStoreDomain = (domain) => {
        fetchData(domain)
        props.handleAddItem(props.domain.name)
    }

    return (
        <TableRow hover key={props.domain.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{props.domain.name}</Typography>
            </TableCell>
            <TableCell>{props.domain.registrar ?? '___'}</TableCell>
            <TableCell>{moment(props.domain.expiresOn).format('DD/MM/Y HH:mm')}</TableCell>
            <TableCell>{moment(props.domain.launchDate).format('DD/MM/Y HH:mm')}</TableCell>
            <TableCell>{props.domain.lastUpdatedAt ? moment(props.domain.lastUpdatedAt).format('DD/MM/Y HH:mm') : '___'}</TableCell>
            <TableCell>
                {display && <AddTaskIcon onClick={(e) => handleStoreDomain(props.domain)}/>}
            </TableCell>
        </TableRow>
    )
}


export default DomainListingAdd