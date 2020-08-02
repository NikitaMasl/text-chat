import React, { Component } from 'react';
import { addMessage, setChat } from '../store/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { BASE_URL } from '../constants'
import io from 'socket.io-client';

import '../scss/Chat.scss'
import Chatwindow from './Chatwindow';
import Videostream from './Videostream';

const socket = io(BASE_URL);

class Chat extends Component {
    constructor(props){
        super(props)

        this.sendMessage = this.sendMessage.bind(this);
        this.openVideo = this.openVideo.bind(this);

        this.state = {
            number: this.props.number,
            user: this.props.user,
            isChatChoosen: this.props.isChatChoosen,
            isStreamStarted: false,
            message: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {
            return {
                number: nextProps.number,
                isChatChoosen: nextProps.isChatChoosen,
                user: nextProps.user
            }
        }
        return null;
    }
    //Send message to server
    sendMessage(){
        const { message } = this.state;
        let input = document.getElementById('input-msg');

        socket.emit('chatMessage', message);
        //Clear input
        input.value = ''
    }
    componentDidMount(){
        const { number:room, user:username } = this.state;
        //Get msg from server and add it to store
        socket.on('message', message => {
            this.props.addMessage(message.id, message.username, message.text, message.isSystemMsg, message.room, message.time)
        })
        //Set chat value in store
        this.props.setChat(room)

        //join chatroom
        socket.emit('joinRoom', { username, room })

    }
    openVideo(value){
        this.setState({
            isStreamStarted: value
        })
    }
    render() {
        const { number, isChatChoosen, user, isStreamStarted } = this.state;

        // if(!isStreamStarted){
        //     socket.emit('Destroy')
        // }

        return (
            <section>
                <div className="user-info">
                    {
                        isStreamStarted
                        ?
                        <i className="fas fa-video-slash video" onClick={() => {
                            if(number !== 0){
                                this.openVideo(false)
                            }
                        }}></i>
                        :
                        <i className="fas fa-video video" onClick={() => {
                            if(number !== 0){
                                this.openVideo(true)
                            }
                        }}></i>
                    }
                    <h1><i className="far fa-user"></i>{user}</h1>
                </div>
                {/* Video window */}
                {
                    isStreamStarted && <Videostream number={number}/>
                }
                {/*Render messages container*/}
                {
                isChatChoosen
                ?
                <Chatwindow />
                :<h1>Choose Chat!</h1>
                }   
                <div className="massage-container">
                    <input id="input-msg" name="message" placeholder="Enter your message" onChange={(e) => {
                        this.setState({
                            message: e.target.value
                        })
                    }} onKeyPress = {(e) => {
                        if(e.key === 'Enter'){
                            this.sendMessage()
                        }
                    }}/>
                    <h4 onClick = {this.sendMessage}><i className="fas fa-paper-plane"></i> Send</h4>
                </div>
            </section>
        )
    }
}

Chat.propTypes={
    number: PropTypes.number,
    user: PropTypes.string,
    isChatChoosen: PropTypes.bool   
}
Chat.defaultProps={
    number: 0,
    user: '',
    isChatChoosen: true
}

const mapStateProps = (state) => {
    return {
        user: state.user
    };
};

const mapActionToProps = (dispatch) => {
    return {
        addMessage: bindActionCreators(addMessage, dispatch),
        setChat: bindActionCreators(setChat, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Chat);