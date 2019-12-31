import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { appConfig, ME_FILENAME } from './blockstack/constants';
import axios from 'axios';
//IMAGES
import logo from '../images/chat.png';
//STYLES
import styled from 'styled-components';
const MasterContainer = styled.div`
    margin: 0 auto;
    margin-top: 200px;
    background-color: white;
    width: 50%;
    height: 400px;
`
const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #3d356b;
    padding: 20px;
`
const Input = styled.input`
    width: 50%;
    margin: 10px;
    padding: 10px;
    border: none;
    border-bottom: 5px solid lightblue
`

class Login extends Component {

    constructor(props) {
        super(props)
        this.loadMe = this.loadMe.bind(this)
        this.state = {
            me: {},
            userData: '',
            redirectToMe: false,
        }
    }
    
    //const [userData, setUserData] = useState();

    componentWillMount() {
        this.loadMe()
    }

    loadMe() {
        const options = { decrypt: false }
        this.props.userSession.getFile(ME_FILENAME, options)
        .then((content) => {
          if(content) {
            const me = JSON.parse(content)
            this.setState({me, redirectToMe: false})
          } else {
            const me = null
            this.setState({me, redirectToMe: true})
          }
        })
    }

    login = (e) => {
        e.preventDefault();
        //console.log(userData);
        //LOGIN THROUGH BLOCKSTACK
       this.props.userSession.redirectToSignIn()
        // https://superchatt.herokuapp.com/api/users/login
        // axios.post('http://localhost:8080/api/users/login', userData)
        //     .then((res) => {
        //         console.log(res);
        //         props.history.push('/');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            userData: e.target.value
        })
        //setUserData({...userData, [e.target.name] : e.target.value});
    }

    render() {
        return (
            <MasterContainer>
                <Header>
                    <h1 style={{ marginRight: '20px' }}>Login to Chat</h1>
                    <img src={logo} style={{ width: '50px', height: '50px' }}/>
                </Header>
                <Form>
                    <Input
                        placeholder='username'
                        name='username'
                        onChange={this.handleChange}
                    >
                    </Input>
                    <Input
                        placeholder='password'
                        name='password'
                        type='password'
                        onChange={this.handleChange}
                    >
                    </Input>
                    <button onClick={this.login}>Login</button>
                </Form>
                <Link to='/register'><h3>Don't have an account?</h3></Link>
            </MasterContainer>
        )
    }
}

export default Login;