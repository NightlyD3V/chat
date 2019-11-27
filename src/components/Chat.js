import React, { useState, useEffect } from 'react';
//SOCKET.IO IMPORTS
import openSocket from 'socket.io-client';
//COMPONENTS
import Gifs from './Gifs';
//STYLES
import styled from 'styled-components';
const MasterContainer = styled.div`
    display: flex;
`
const ChatContainer = styled.div`
    width: 100%;
    
`
const Form = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
`
const Input = styled.input`
    width: 75%;
    padding: 10px;
    border: none;
    border-top: 5px solid lightblue;
    -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
`
const Button = styled.button`
    width: 5%;
    border: none;
    border-top: 5px solid lightblue;
    border-left: 1px solid grey;
`
const MessageContainer = styled.div`
    background-color: white;
    height: 400px;
    max-width: 90%;
    padding: 10px;
    margin: 0 auto;
    margin-top: 20px;
    ovreflow-y: scroll;    
`

function Chat(props){

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [messageState, setMessageState] = useState(false);
    const [gifs, setGifs] = useState(false);

    //Create Socket.io connection
    const socketio = openSocket('http://localhost:8001');;
    // Create WebSocket connection
    const socket = new WebSocket('ws://localhost:8080') 
    // Log socket state
    useEffect(() => {
        props.connection(socket.readyState)
        setInterval(() => tick(), 1000)
    }, [])
    function tick() {
        props.connection(socket.readyState);
    }

    // Listen for messages
    socket.onopen = (message) => {
        console.log('Thanks for connecting to the socket!', message);
    }

    function getMessage(message){
        return new Promise((resolve) => {
            resolve(message);
        });
    }

    socket.onmessage = (message) => {
        console.log(`Received a message from a client ${message.data}`)
        getMessage(message)
            .then((res) => {
                //console.log(res);
                let parse = JSON.parse(res.data);
                const newMessage = parse.data.text;
                try {
                    //Add message data to array 
                    setMessages([ ...messages, newMessage ]);
                    setMessageState(true);
                } catch (e) {
                    console.log('Invalid JSON: ', message.data);
                    alert('Could not send message!');
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    socket.onerror = (err) => {
        //alert('There was an error connecting to the server!');
        console.log(err);
    }
    
    function sendMessage(input) {
        return new Promise((resolve) => {
            resolve(input)
        })
    }

    //HANDLE GIFS
    const handleGifs = (e) => {
        e.preventDefault();
        setGifs(true);
    }
    
    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input)
            .then((res) => {
                socket.send(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    console.log(gifs);
    return (
        <MasterContainer>
            <ChatContainer>
            <MessageContainer>
                {messages.map((message) => <p>{message}</p>)}
                {gifs ? <Gifs /> : null}
            </MessageContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    placeholder="message"
                    name="message"
                    onChange={handleChange}
                >
                </Input>
                <Button type="button" onClick={(e) => gifs ? setGifs(false) : handleGifs(e)}>Gif</Button>
                <Button type="button">{'📎'}</Button>
                <Button type="button">{'😁'}</Button>
            </Form>
            </ChatContainer>
            <div>
                <h1>Friends</h1>
            </div>
        </MasterContainer>
    )
}

export default Chat;