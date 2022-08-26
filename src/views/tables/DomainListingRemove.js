import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCallback, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment-timezone'
import axiosOptions from 'src/configs/axiosOptions';

const DomainListingRemove = (props) => {
    const [display, setDisplay] = useState(true)

    const fetchData = useCallback(async (domain) => {
        await axios.delete(`${process.env.NEXT_APP_API_URL}api/domains/${domain.id}`, axiosOptions)
        setDisplay(display => (!display))
        props.domain.display = display
    }, [])

    const handleRemoveDomain = (domain) => {
        fetchData(domain)
        props.handleRemoveItem(props.domain.id)
    }
    return (
        <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{props.domain.name}</Typography>
            </TableCell>
            <TableCell>{props.domain.registrar ?? '___'}</TableCell>
            <TableCell>{moment(props.domain.expiresOn).format('DD/MM/Y HH:mm')}</TableCell>
            <TableCell>{moment(props.domain.launchDate).format('DD/MM/Y HH:mm')}</TableCell>
            <TableCell>{props.domain.boughtOn ? moment(props.domain.boughtOn).format('DD/MM/Y HH:mm:ss') : '___'}</TableCell>
            <TableCell>
                {display && <DeleteForeverIcon onClick={(e) => handleRemoveDomain(props.domain)}/>}
            </TableCell>
        </TableRow>
    )
}


export default DomainListingRemove