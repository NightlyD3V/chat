import React, { Component } from 'react';
//COMPONENTS
import Gifs from './Gifs';
import FileUpload from './FileUpload';
//STYLES
import styled from 'styled-components';
const MasterContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow-y: scroll;  
`
const ChatContainer = styled.div`
    width: 100%;
    height: 90%;
    margin-left: 100px;

`
const Form = styled.form`
    display: flex;
    width: 80%;
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
    height: 90%;
    width: 73.5%;
    margin-top: 100px;  
    overflow-y: scroll; 
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`
const Messages = styled.div`
    p:nth-child(odd) { background: #eee; }
    
`
const FriendContainer = styled.div`
    background-color: white;
    border-left: 5px solid lightblue;
    height: 100vh;
    width: 15%;
    position: fixed;
    right: 0px;
    margin-top: 60px;
`

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            input: '',
            gifs: false,
            file: false
        }
    }

    // const [messages, setMessages] = useState([]);
    // const [input, setInput] = useState('');
    // const [messageState, setMessageState] = useState(false);
    // const [gifs, setGifs] = useState(false);

    componentDidMount() {
        this.props.socketio.on('chat message', async (msg) => {
            let newMessage = await msg;
            this.setState({messages: [...this.state.messages, newMessage]})
            console.log(this.state.messages)
        })
    }   
    // Create WebSocket connection
    //const socket = new WebSocket('ws://localhost:8080') 
    // Log socket state
    // useEffect(() => {
    //     props.connection(socket.readyState)
    //     setInterval(() => tick(), 1000)
    // }, [])
    // function tick() {
    //     props.connection(socket.readyState);
    // }

    // Listen for messages
    // socket.onopen = (message) => {
    //     console.log('Thanks for connecting to the socket!', message);
    // }

    // function getMessage(message){
    //     return new Promise((resolve) => {
    //         resolve(message);
    //     });
    // }

    // socket.onmessage = (message) => {
    //     console.log(`Received a message from a client ${message.data}`)
    //     getMessage(message)
    //         .then((res) => {
    //             //console.log(res);
    //             let parse = JSON.parse(res.data);
    //             const newMessage = parse.data.text;
    //             try {
    //                 //Add message data to array 
    //                 setMessages([ ...messages, newMessage ]);
    //                 setMessageState(true);
    //             } catch (e) {
    //                 console.log('Invalid JSON: ', message.data);
    //                 alert('Could not send message!');
    //                 return;
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // } 
    // socket.onerror = (err) => {
    //     //alert('There was an error connecting to the server!');
    //     console.log(err);
    // }

    // function sendMessage(input) {
    //     return new Promise((resolve) => {
    //         resolve(input)
    //     })
    // }

    //HANDLE GIFS
    handleGifs = (e) => {
        e.preventDefault();
        this.setState({gifs: true});
    }
    
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            input: e.target.value
        });
    }

    //HANDLE FILE UPLOAD
    handleFile = (e) => {
        e.preventDefault();
        this.setState({file: true});
        console.log(document.getElementById('upload'));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('message sent: ', this.state.input);
        this.setState({input: ''});
        this.props.socketio.emit('chat message', this.state.input);
        // sendMessage(input)
        //     .then((res) => {
        //         props.socketio.emit('chat message', res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        return false;
        // sendMessage(input)
        //     .then((res) => {
        //         socket.send(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    render() {
    return (
        <MasterContainer>
            <ChatContainer>
                <MessageContainer>
                    <Messages>
                        {this.state.messages.map((message, index) => <p style={{padding: '10px', margin: '0 auto'}} key={index}>{message}</p>)}
                    </Messages>
                    {this.state.gifs ? <Gifs /> : null}
                    {this.state.file ? <FileUpload /> : null}
                </MessageContainer>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        placeholder="message"
                        name="message"
                        value={this.input}
                        onChange={this.handleChange}
                    >
                    </Input>
                    {/* <Button type="button" onClick={(e) => this.handleSubmit(e)}></Button> */}
                    <Button type="button" onClick={(e) => this.state.gifs ? this.setState({gifs: false}) : this.handleGifs(e)}>Gif</Button>
                    <Button type="button" id="uploadButton" onClick={(e) => this.state.file ? this.setState({file: false}) : this.handleFile(e)}>{'📎'}</Button>
                    <Button type="button">{'😁'}</Button>
                </Form>
            </ChatContainer>
            <FriendContainer>
                <h3>Friends</h3>
            </FriendContainer>
        </MasterContainer>
        )
    }
}

export default Chat;