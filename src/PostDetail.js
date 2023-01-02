import React from 'react';
import "./PhotoDetail.css"
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const PostDetail = () => {
    const { state } = useLocation();
    const { item } = state; // Read values passed on state
    console.log(item)
    return (
        <div >

            <Card sx={{ maxWidth: 1024, mt: 3, ml: 32 }}  >
                <CardContent  >
                    <Typography sx={{}} align='center' variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="h6" component="div" > Points: {item.points}</Typography>
                    <Typography variant="h6" component="div" align=''>Comments</Typography>

                    {
                        item.children.map((val, index) => {
                            return <>
                                <div className="comment">
                                    <AccountCircleIcon /><span><h4>{val.author}</h4></span>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: val.text }} />
                                <hr />
                            </>
                        })
                    }
                </CardContent>
            </Card>
        </div >
    )
}

export default PostDetail
