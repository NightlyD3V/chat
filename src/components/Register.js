import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//IMAGES
import logo from '../images/chat.png';
//STYLES
import styled from 'styled-components';
const MasterContainer = styled.div`
    margin: 0 auto;
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
    background-color: grey;
    padding: 20px;
`
const Input = styled.input`
    width: 50%;
    margin: 10px;
    padding: 10px;
    border: none;
    border-bottom: 5px solid lightblue
`

function Register(props) {
    
    const [userData, setUserData] = useState();

    const register = (e) => {
        e.preventDefault();
        console.log(userData);
        axios.post('https://superchatt.herokuapp.com/api/users/register', userData)
            .then((res) => {
                console.log(res);
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUserData({...userData, [e.target.name] : e.target.value});
    }

    return (
        <MasterContainer>
            <Header>
                <h1 style={{ marginRight: '20px' }}>Register to Chat</h1>
                <img src={logo} style={{ width: '50px', height: '50px' }}/>
            </Header>
            <Form>
                <Input
                    placeholder='username'
                    name='username'
                    onChange={handleChange}
                >
                </Input>
                <Input
                    placeholder='password'
                    name='password'
                    onChange={handleChange}
                >
                </Input>
                <button onClick={register}>Register</button>
            </Form>
            <Link to='/login'><h3>Have an account?</h3></Link>
        </MasterContainer>
    )
}


export default Register