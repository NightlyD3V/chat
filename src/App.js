import React, { useState, useEffect } from 'react';
import './App.css';
//SOCKET.IO IMPORTS
import io from 'socket.io-client';
//COMPONENTS
import Time from './components/Time';
import Chat from './components/Chat';
//IMAGES
import logo from './images/chat.png';
//STYLES
import styled from 'styled-components';
const Header = styled.h1`
  margin: 0px;
  margin-right: 10px;
  color: white;
  margin-left: 20px;
  font-family: 'Fjalla One', sans-serif;
`
const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0B0C10;
  height: 60px;
  position: fixed;
  width: 100%;
`
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const Links = styled.h3`
  color: white;
  margin-right: 20px;
`
const SocketState = styled.div`
    display: flex;
    justify-content: flex-end;  
    align-items: center;
    background-color: #190061;
    height: 20px;
    padding: 5px;
`
const Connected = styled.h3`
    margin: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 95px;
    color: green;
`
const Connecting = styled.h3`
    margin: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 95px;
    color: yellow;
`

function App() {

  const [socketState, setSocketState] = useState();
  const [clients, setClients] = useState(0);

  // Create Socket.io connection
  const socketio = io('https://superchatt.herokuapp.com/');

  socketio.on('client connected', async (res) => {
    let clients = await res;
    setClients(clients);
  })

  return (
    <div className="App">
      <header className="App-header">
          <NavContainer>
            <div style={{ display: 'flex' }}>
              <Header>Chat</Header>
              <img src={logo} style={{ width: '50px', height: '50px' }}/>
            </div>
            <p style={{ color: 'white', marginRight: '10px'}}>Online Users: {clients}</p>
            <LinkContainer>
            <Time connection={socketState}/>
            </LinkContainer>
          </NavContainer>
          <Chat connection={setSocketState} socketio={socketio}/>
          <footer style={{ color: 'white', marginBottom: '20px'}}><p>&copy;2019 @LambdaStudent</p></footer>
      </header>
    </div>
  );
}

export default App;
