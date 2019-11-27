import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
const Input = styled.input`
    bacgkround-color: grey;
    padding: 5px;
    border: none;
    -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
`
const GifStyle = styled.div`
    max-height: 200px;
    overflow-y: scroll;
    
`

function Gifs() {

    const [input, setInput] = useState('');
    const [trendingGifs, setTrendingGifs] = useState()

    //GET TRENDING GIFS
    useEffect(() => {
        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=U8UKw35ueyklFWh3eMu1korjjQHekuqu&limit=5`)
            .then((res) => {
                console.log(res.data);
                setTrendingGifs(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                alert('Couldn\'t get gifs 😭')
            })
    }, [])
    
    //SEARCH FOR GIFS
    useEffect(() => {
        axios.get(`http://api.giphy.com/v1/gifs/search?api_key=U8UKw35ueyklFWh3eMu1korjjQHekuqu&q=${input}&limit=5`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                alert('Couldn\'t get gifs 😭')
            })
    },[input])

    const handleChanges = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        console.log(input)
    }

    if(trendingGifs) {
        return (
            <div>
                <h2>Trending</h2>
                <GifStyle>
                    {trendingGifs.map((gif) => {
                        return (
                            <iframe src={gif.embed_url} /> 
                        )
                    })}
                </GifStyle>
                <Input
                    placeholder="search"
                    name="gif"
                    onChange={handleChanges}
                >
                </Input>
            </div>
        )
    } else return 'Loading...'
}

export default Gifs;