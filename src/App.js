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

const userSession = new UserSession({ appConfig: appConfig })

class App extends Component {
  constructor() {
    super()
    this.state= {
      userData: {}
    }
  }
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
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }

  render() {
    return (
      !userSession.isSignInPending() ?
      <div className="App">
        {/* ROUTES */}
        <Route exact path='/' render={((props) => <Home {...props} socketio={socketio} userSession={userSession}/>)}></Route>
        <Route path='/login' render={((props) => <Login {...props} userSession={userSession} />)}></Route>
      </div> : null
    ) 
  }
}

export default App;
