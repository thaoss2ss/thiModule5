import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";

import {setProduct} from "../features/productSlice";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Products () {
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [mess, setMess] = useState({
        status: '',
        mess: '',
    });

    const navigate = useNavigate();

    const getProductsApi = async () => {

        let reqOptions = {
            url: 'http://localhost:3001/products',
            method: 'GET',

        };

        return await axios.request(reqOptions);
    };
    const getProductDetailApi = async id => {
        return await axios.get(`http://localhost:3001/products/${id}`);
    };
    const handleDetail = id => {
        getProductDetailApi(id)
            .then(res => {
                dispatch(setProduct(res.data));
            })
            .catch(err => console.log(err));
    };


    const handleDelete = async (id) => {
        let reqOptions = {
            url: `http://localhost:3001/products/${id}`,
            method: 'DELETE',
        };

        if (window.confirm('Are U Sure?')) {
            await axios
                .request(reqOptions)
                .then(res => {

                    setMess({
                        status: 'success',
                        mess: res.data.message,
                    });
                })
                .catch(err => {
                    setMess({
                        status: 'error',
                        mess: err.message,
                    });
                });
        }
    };

    const handleEdit = id => {
        getProductDetailApi(id)
            .then(res => {
                dispatch(setProduct(res.data));
                navigate('/edit');
            })
            .catch(err => console.log(err.message));
    };

    const handleCreate = () => {
        setMess({
            status: 'navigate',
            mess: '??ang chuy???n h?????ng trang...',
        });
        setTimeout(() => {
            navigate('/create');
        }, 1500);
    };

    useEffect(() => {
        getProductsApi()
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setMess({
                    status: 'error',
                    mess: err.message,
                });
            });
    },[handleDelete]);


    return loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    ) : (
        <>
            <Grid container spacing={1}>
                <Grid item xs></Grid>
                <Grid item xs={8}>
                    <Paper sx={{ padding: 1, height: 600 }}>
                        {mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
                        {mess && mess.status === 'navigate' ? <Alert severity='info'>{mess.mess}</Alert> : ''}
                        {mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}

                        <h1>Danh s??ch s???n ph???m</h1>

                        <Button variant='outlined' color='success' onClick={handleCreate}>
                            Th??m s???n ph???m
                        </Button>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell align='left'>T??n s???n ph???m</StyledTableCell>
                                        <StyledTableCell align='left'>Gi??(??)</StyledTableCell>
                                        <StyledTableCell align='left'>T???n kho</StyledTableCell>
                                        <StyledTableCell align='left'></StyledTableCell>
                                        <StyledTableCell align='left'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product, index) => (
                                        <StyledTableRow key={product.id}>
                                            <StyledTableCell component='th' scope='row'>
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align='left'>
                                                <Link to='/detail' onClick={() => handleDetail(product.id)}>
                                                    {product.name}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align='left'>{product.price}</StyledTableCell>
                                            <StyledTableCell align='left'>{product.stock}</StyledTableCell>

                                            <StyledTableCell align='left'>
                                                <Button variant='contained' color='error' onClick={() => handleDelete(product.id)}>
                                                    X??a
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align='left'>
                                                <Button variant='contained' color='success' onClick={() => handleEdit(product.name)}>
                                                    C???p nh???t
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </>
    );
};
