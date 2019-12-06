import React, { Component } from 'react';
//COMPONENTS
import Time from './Time';
import Chat from './Chat';
//IMAGES
import logo from '../images/chat.png';
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socketState: 1,
            clients: 0
        }
    }
    // const [socketState, setSocketState] = useState();
    // const [clients, setClients] = useState();

    // Create Socket.io connection
    // https://superchatt.herokuapp.com/
    // const socketio = io('http://localhost:8080');

    // useEffect(() => {
    //     socketio.emit('client connected')
    // },[])

    componentDidMount() {
        console.log('home client connected')
        this.props.socketio.on('client connected', (clientCount) => {
            console.log(clientCount);
            this.setState({ clients: clientCount })
        })
    }

    // useEffect(() => {
    //     socketio.on('client connected', async (clientCount) => {
    //     let client = await clientCount;
    //     setClients(client);
    //     })
    // }, [clients])

    render() {
        return (
            <div>
                <NavContainer>
                    <div style={{ display: 'flex' }}>
                    <Header>Chat</Header>
                    <img src={logo} style={{ width: '50px', height: '50px' }}/>
                    </div>
                    <p style={{ color: 'white', marginRight: '10px'}}>Online: {this.state.clients}</p>
                    <LinkContainer>
                    <Time connection={this.state.socketState}/>
                    </LinkContainer>
                </NavContainer>
                <Chat connection={this.state.SocketState} socketio={this.props.socketio}/>
                <footer style={{ color: 'white', marginBottom: '20px'}}><p>&copy;2019 @LambdaStudent</p></footer>
            </div>
        )
    }
}

export default Home;