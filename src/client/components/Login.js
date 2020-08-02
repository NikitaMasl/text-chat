import React, { Component } from 'react';
import { setUser } from '../store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import '../scss/Login.scss'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            isError: false
        }
    }
    render() {
        const { username, isError } = this.state;
        let visibility = {
            visibility: "hidden"
        }
        return (
            <div className="login-container">
                <div className="login">
                    <div className="logo">
                        <i className="far fa-grin-wink"></i>
                        <h1>AlmostVK</h1>
                    </div>
                    <input placeholder="Enter your name"
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => {
                        this.setState({
                            username: e.target.value
                        })
                    }}/>
                    <h1 style={
                        isError
                        ?null
                        :visibility
                    }>Enter your name</h1>
                    <NavLink to="chats/" onClick={(e) => {
                        if(username === ''){
                            e.preventDefault()
                            this.setState({
                                isError:true
                            })
                        }else{
                            this.props.setUser(username)
                        }
                    }}><i className="fas fa-sign-in-alt"></i>Login</NavLink> 

                </div>
            </div>
        )
    }
}

const mapActionToProps = (dispatch) => {
    return {
        setUser: bindActionCreators(setUser, dispatch)
    }
};

export default connect(null, mapActionToProps)(Login);