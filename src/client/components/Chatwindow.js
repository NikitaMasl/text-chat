import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/Chatwindow.scss';

class Chatwindow extends Component {
    constructor(props){
        super(props)

        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.state = {
            messages: this.props.messages
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {
            return {
                messages: nextProps.messages
            }
        }
        return null;
    }
    
    scrollToBottom(){
        let chat = document.getElementById('bottomOfMsgContainer');
        if(chat){
            chat.scrollIntoView({ behavior: "smooth" });
        }
    }
    
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { messages } = this.state;
        let messagesToRender = messages.filter(msg => msg.room === this.props.chat)
        return (
            
            <div className="chat-container">
                <div className="messages-wrapper">
                    {/* Add message to DOM from store */}
                    {
                        messagesToRender && messagesToRender.map((msg, index) => (
                            <div key={index} className={
                                msg.isSystemMsg
                                ?"system-msg"
                                :
                                    msg.name === this.props.user
                                    ?"message align-right"
                                    :"message"
                            }>
                                {
                                    msg.isSystemMsg
                                    ?
                                    <>
                                        {
                                        msg.message === 'Welcome to the chat!'
                                        ?<h4>{msg.message}</h4>
                                        :<h4><span>{msg.name} </span>{msg.message}</h4>
                                        }
                                    </>
                                    :
                                    <>
                                        <h6><span>{msg.name} </span>at {msg.time}</h6>
                                        <h4>{msg.message}</h4>
                                    </>
                                }
                                
                            </div>
                        ))
                    }
                    <div id="bottomOfMsgContainer"></div>
                </div>
            </div>
        )
    }
}

Chatwindow.propTypes={
    messages: PropTypes.array
}
Chatwindow.defaultProps={
    messages: []
}

const mapStateProps = (state) => {
    return {
        user: state.user,
        messages: state.messages,
        chat: state.chat
    };
};

export default connect(mapStateProps, null)(Chatwindow);