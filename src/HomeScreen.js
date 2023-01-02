import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./App.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';



const HomeScreen = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        query: 'test',
        nbpages: 0,
        pages: 0,
        hits: []
    });
    const [searchTitle, setSearchTittle] = useState("");


    let API = `http://hn.algolia.com/api/v1/search?query=${searchTitle}`;

    const fetchApiData = async (url) => {
        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setPost(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchApiData(API);
    }, [API]);
   

    const handleChange = (e) => {
        setSearchTittle(e.target.value);
    };


    const fetchApi = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
            const data = await res.json();
            data && navigate('/postDetail',{state:{item:data}});
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDetails = (id) => {
        fetchApi(id);
    };

    // console.log(result);

    function handleSearchResult() {
        return post.hits.length &&
            post.hits.map((item, index) => {
                return (
                    <div key={index} onClick={() => handleDetails(item.objectID)}>
                        <Card sx={{ maxWidth: 600, mt: 3, ml: "35%" }}>
                            <CardContent  >
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">{item.url}Click here for more...</Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })
    }

    return (
        <div>
            <h1>Hacker New Post</h1>
            <TextField style={{ marginTop: '10px', marginLeft: '10%', marginRight: '10%' }}
                fullWidth label="Search Query" id="fullWidth" onChange={handleChange} />
            {loading ? <h2 >Loading...</h2> :
                <div className="row">
                    {handleSearchResult()}
                </div>}
        </div>
    );
};

export default HomeScreen;
