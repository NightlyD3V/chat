import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
const Input = styled.input`
    width: 90%;
    padding: 5px;
    border: none;
    border-top: 5px solid lightblue;
    -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
`
const GifStyle = styled.div`
    max-height: 300px;
    overflow-y: scroll;
    position: relative;
    background-color: lightgrey;
`
const IframeBlocker = styled.div`
    z-index: 2;
`
const Iframe = styled.iframe`
    border: none;
    background-color: grey;
    padding: 10px;
    margin: 10px;
    z-index: 1;
`

function Gifs() {

    const [input, setInput] = useState('');
    const [trendingGifs, setTrendingGifs] = useState()

    //GET TRENDING GIFS
    useEffect(() => {
        axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=U8UKw35ueyklFWh3eMu1korjjQHekuqu&limit=8`)
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
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=U8UKw35ueyklFWh3eMu1korjjQHekuqu&q=${input}&limit=8`)
            .then((res) => {
                setTrendingGifs(res.data.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                alert('Couldn\'t get gifs 😭')
            })
    }

    //SEND GIF
    const clickGif = (e) => {
        const gifs = document.querySelectorAll('#gifs');
        //console.log(gifs)
        console.log(e.target)
        alert('you clicked the gif! :D')
    }

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
                    {trendingGifs.map((gif, key) => {
                        return (
                            <IframeBlocker key ={key} onClick={(e) => clickGif(e)}>
                                <Iframe id='gifs' src={gif.embed_url} /> 
                            </IframeBlocker>
                        )
                    })}
                </GifStyle>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="search"
                        name="gif"
                        onChange={handleChanges}
                    >
                    </Input>
                </form>
            </div>
        )
    } else return 'Loading...'
}

export default Gifs;