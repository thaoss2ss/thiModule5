import {Grid, Paper,Button, } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const navigate = useNavigate()
    const data = useSelector(state => state.product.product)

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs/>
                <Grid item xs>
                    <Paper elevation={2} sx={{ padding: 3 , mt: 10, boxShadow: '2px 2px 2px 2px'}}>
                        <h2>Chi tiết sản phẩm</h2>
                        <Button variant='contained' onClick={()=>navigate('/')}>Danh sách</Button>

                        <p>Tên: {data.name }</p>
                        <p>Giá: {data.price }</p>
                        <p>Tồn kho: {data.stock}</p>
                        <hr/>
                        <p>Mô tả: {data.description }</p>
                    </Paper>
                </Grid>
                <Grid item xs/>
            </Grid>
        </div>
    )
}

export default DetailPage;