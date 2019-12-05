import React, { Component } from 'react';
import './App.css';
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom";
//COMPONENTS
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
//SOCKET.IO IMPORT
import io from 'socket.io-client';
let socketio = io('https://cors-anywhere.superchatt.herokuapp.com/');

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
    console.log('app client connected')
    socketio.emit('client connected');
  }

  render() {
    return (
      <div className="App">
        {/* ROUTES */}
        <Route exact path='/' render={((props) => <Home {...props} socketio={socketio} />)}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    ) 
  }
}

export default App;
