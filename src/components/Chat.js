import React, { Component } from 'react';
//COMPONENTS
import Gifs from './Gifs';
import FileUpload from './FileUpload';
//STYLES
import styled from 'styled-components';
const MasterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 500px;
    margin: 0 auto;
    width: 100%;
    /* Media Query */
    @media (max-width: 800px) {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 80px;
    }
`
const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 60px;
    @media (max-width: 800px) {
        margin: 0 auto;
        width: 100%;
    }
`
const Form = styled.form`
    display: flex;
    width: 100%;
    /* Media Query */
    @media (max-width: 800px) {
        width: 100%;
    }
`
const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-top: 5px solid lightblue;
    border-radius: none;
    -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    /* Media Query */
    @media (max-width: 800px) {
        width: 100%;
    }
`
const Button = styled.button`
    width: 10%;
    border: none;
    background-color: #d7f4f3
    border-top: 5px solid lightblue;
    border-left: 1px solid grey;
    @media (max-width: 800px) {
        width: 10%;
        margin: 0 auto;
    }
`
const MessageContainer = styled.div`
    height: 100%;
    width: 100%; 
    overflow-y: auto; 
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
    /* Media Query */
    @media (max-width: 800px) {
        width: 100%;
    }
`
const Messages = styled.div`
    h4:nth-child(odd) { background: lightgrey; color: black }
    
`
const FriendContainer = styled.div`
    height: 580px;
    width: 25%;
    margin-top: 60px;
    -webkit-box-shadow: -6px 0px 20px -5px rgba(0,0,0,1);
    -moz-box-shadow: -6px 0px 20px -5px rgba(0,0,0,1);
    box-shadow: -6px 0px 20px -5px rgba(0,0,0,1);
    /* Media Query */
    @media (max-width: 800px) {
        display: none;
    }
`
const Typing = styled.p`
    width: 100%;
    background-color: #736f96;
    margin: 0px;
    padding: 10px 0px 10px 0px;
    @media (max-width: 800px) {
        width: 100%;
    }
`
const DarkMode = styled.button`
    margin: 0 auto;
    padding: 20px;
    position: relative;
    top: 700px;
    width: 90%;
`
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            date: '',
            typing: false,
            input: '',
            gif: [],
            gifs: false,
            file: false,
            darkMode: false
        }
    }

    // const [messages, setMessages] = useState([]);
    // const [input, setInput] = useState('');
    // const [messageState, setMessageState] = useState(false);
    // const [gifs, setGifs] = useState(false);

    componentDidMount() {
        //LISTEN FOR USER TYPING
        this.props.socketio.on('typing', async () => {
            this.setState({typing: true});
        });
        //LISTEN FOR MESSAGES
        this.props.socketio.on('chat message', async (msg, date) => {
            let newMessage = await msg;
            this.setState({messages: [...this.state.messages, newMessage]})
            console.log(this.state.messages)
        });
        //LISTEN FOR GIFS
        this.props.socketio.on('gif', async (gif) => {
            let newGif = await gif;
            this.setState({gif: [...this.state.gif, newGif]});
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

    //DARK MODE
    darkMode = (e) => {
        e.preventDefault();
        this.setState({ darkMode : true })
    }

    //HANDLE GIFS
    handleGifs = (e) => {
        e.preventDefault();
        this.setState({gifs: true});
    }
    
    handleChange = (e) => {
        e.preventDefault();
        this.props.socketio.emit('typing');
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
        this.setState({typing: false})
        document.getElementById('form').reset();
        //console.log('message sent: ', this.state.input);
        if(this.state.input.length === 0) {
            alert('Please enter a message!'); 
            return null;
        }
        this.props.socketio.emit('chat message', this.state.input);
    }

    render() {
    return (
        <MasterContainer>
            <ChatContainer>
                <MessageContainer style= {
                    this.state.darkMode ? 
                    {backgroundColor: 'black', color: 'white'} :
                    {backgroundColor: '#736f96', color: 'white'} 
                    }>
                    <Messages>
                        {this.state.messages.map((message, index) => {
                            console.log(this.props.username)
                            return (
                            <h4 style= {
                                {padding: '10px', margin: '0 auto'}} key={index}>{this.props.username, message}
                            </h4>
                        )})}
                    </Messages>
                    {this.state.gif.map((newGif) => {
                        return (
                            <iframe style={{border: 'none'}} src={newGif}/>
                        )
                    })}
                    {this.state.gifs ? <Gifs socketio={this.props.socketio}/> : null}
                    {this.state.file ? <FileUpload /> : null}
                </MessageContainer>
                <Typing style= {
                    this.state.typing ?
                    {visibility: 'visible'} :
                    {color: '#736f96'} 
                }>
                A user is typing!...
                </Typing>
                <Form id="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        placeholder="message"
                        name="message"
                        value={this.input}
                        onChange={this.handleChange}
                    >
                    </Input>
                    <Button type="button" onClick={(e) => 
                        this.handleSubmit(e)}>Send
                    </Button>
                    <Button type="button" onClick={(e) => 
                        this.state.gifs ? this.setState({gifs : false}) : this.handleGifs(e)}>Gif
                    </Button>
                    {/* <Button type="button" id="uploadButton" onClick={(e) => 
                        this.state.file ? this.setState({file: false}) : this.handleFile(e)}>{'📎'}
                    </Button>
                    <Button type="button">{'😁'}</Button> */}
                </Form>
            </ChatContainer>
            <FriendContainer style= { 
                this.state.darkMode ? 
                {backgroundColor: '#0B0C10', color: 'white'} : 
                {backgroundColor: 'white', color: 'black'}
                }>
                <h3>Online Users</h3>
                <img
                 src={ this.props.person.avatarUrl() ? this.props.person.avatarUrl() : avatarFallbackImage }
                 className="img-rounded avatar"
                 id="avatar-image"
                />
                {this.props.users.map((user) => {
                    return <p>{user}</p>
                })}
            </FriendContainer>
        </MasterContainer>
        )
    }
}

export default Chat;