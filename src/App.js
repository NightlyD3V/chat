import React, { useState } from 'react';
import './App.css';
//COMPONENTS
import Time from './components/Time';
import Chat from './components/Chat';
//STYLES
import styled from 'styled-components';
const Header = styled.h1`
  margin: 0px;
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

  return (
    <div className="App">
      <header className="App-header">
          <NavContainer>
            <Header>Super Chat</Header>
            <LinkContainer>
              <Links>Login</Links>
              <Links>Logout</Links>
            <Time connection={socketState}/>
            </LinkContainer>
          </NavContainer>
          <Chat connection={setSocketState}/>
          <footer><p>&copy;2019 @LambdaStudent</p></footer>
      </header>
    </div>
  );
}

export default App;
