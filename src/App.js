import React, { Component } from 'react';
import './App.css';
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom";
//COMPONENTS
import Home from './components/Home';
import Login from './components/Login';
//BLOCKSTACK
import { UserSession } from 'blockstack';
import { appConfig, ME_FILENAME } from './components/blockstack/constants';
//SOCKET.IO IMPORT
import io from 'socket.io-client';
// https://superchatt.herokuapp.com/
let socketio = io('https://superchatt.herokuapp.com/');

const userSession = new UserSession({ appConfig })

class App extends Component {

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route { ...rest } render={(props) => (
  //     //AUTHENTICATION
  //     0 === 0 
  //     ? <Component {...props}/> 
  //     : <Redirect to='/login' />
  //   )} />
  // )

  componentDidMount() {
    //console.log('app client connected')
    socketio.emit('a client connected');
  }

  render() {
    return (
      <div className="App">
        {/* ROUTES */}
        <Route exact path='/' render={((props) => <Home {...props} socketio={socketio} userSession={userSession}/>)}></Route>
        <Route path='/login' render={((props) => <Login {...props} userSession={userSession} />)}></Route>
      </div>
    ) 
  }
}

export default App;
