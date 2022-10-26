import {
    Alert,
    Box,
    CircularProgress,
    Grid,
    Paper,
    TextField
} from "@mui/material";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {setProduct} from "../features/productSlice";

const UpdateProduct = () => {
    const [products, setProducts] = useState({});
    const [mess, setMess] = useState({
        status: '',
        mess: '',
    })
    const [loading, setLoading] = useState({loading: false});
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const data = useSelector(state => state.product.product);
    const handleChange = e => {
        setProducts({ ...products, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        if (window.confirm('Are u sure?')) {
            navigate('/');
        }
    };

    const editProductApi = async (id) => {
        return await axios.request({
            url: `http://localhost:3001/products/${id}`,
            method: 'PUT',
            headers: { 'Content-Type': 'Application/json' },
            data: JSON.stringify({
                name: products.name,
                price: products.price,
                stock: products.stock,
                description: products.description
            })
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editProductApi(data.id)
            .then(res => {
                setMess('Sửa thông tin sản phẩm thành công!')
                setProducts({})
                dispatch(setProduct({
                    id: '',
                    name: '',
                    price: 0,
                    stock: 0,
                    description: ''
                }))
                setTimeout(()=>navigate('/'),1000)
            }).catch(err=>console.log(err.message))

    };

    useEffect(() => {
        setProducts({
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        loading ? (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box>
        ) : (
            <>
                <Grid container item>
                    <Grid item xs></Grid>
                    <Grid item xs={5}>
                        <Paper elevation={3} sx={{padding: 2, marginTop: 10}}>
                            {mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
                            {mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}
                            {mess && mess.status === 'navigate' ? <Alert severity='info'>{mess.mess}</Alert> : ''}
                            <Box component='form' sx={{
                                '& .MuiTextField-root': {m: 1, width: '25ch'},
                            }} onSubmit={handleSubmit}>
                                <h2 style={{textAlign: 'center'}}>Edit</h2>
                                <div style={{textAlign: 'center'}}>
                                    <TextField
                                        label='Tên Sản Phẩm'
                                        onChange={handleChange}
                                        required
                                        type='text'
                                        maxRows={6}
                                        value={products.name}
                                        name="name"

                                    />
                                    <TextField
                                        label='Giá(đ)'
                                        onChange={handleChange}
                                        required
                                        type='number'
                                        maxRows={6}
                                        value={products.price}
                                        name="price"
                                    />
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <TextField
                                        label='Tồn Kho'
                                        onChange={handleChange}
                                        required
                                        type='number'
                                        maxRows={6}
                                        value={products.stock}
                                        name="stock"
                                    />
                                    <TextField
                                        label='Mô tả'
                                        onChange={handleChange}
                                        required
                                        type='text'
                                        maxRows={6}
                                        value={products.description}
                                        name="description"
                                    />
                                </div>

                                <div style={{textAlign: 'center'}}>
                                    <Button variant='contained' color='success'
                                            sx={{marginTop: 5, alignItems: 'center'}} type='submit'
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Button
                                        variant='outlined'
                                        color='success'
                                        sx={{marginTop: 1, alignItems: 'center'}}
                                        onClick={handleBack}>
                                        Cancel
                                    </Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </>
        )
    )
}

export default UpdateProduct;
