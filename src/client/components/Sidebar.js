import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../constants'
import { connect } from 'react-redux';
import io from 'socket.io-client';

import '../scss/Sidebar.scss';

const socket = io(BASE_URL);

function AppLink(props){
    return(
        <li>
            <NavLink {...props} activeClassName="activeLink" /> 
        </li>
    )  
}

class Sidebar extends Component {
    constructor(props){
        super(props)

        this.changeIsMenuOpen = this.changeIsMenuOpen.bind(this);

        this.state = {
            userRoom: [],
            isMenuOpen: false
        }
    }

    componentDidMount(){
        const { userRoom } = this.state;

        //Get users
        socket.on('roomUsers', users => {
            this.setState({
                userRoom: users
            })
          })
    }

    changeIsMenuOpen(){
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    render() {
        const { userRoom, isMenuOpen } = this.state;

        return (
            <>
            {
                isMenuOpen
                ?null
                :
                <label className="open" htmlFor="menu" onClick={this.changeIsMenuOpen} >
                    <i className="fa fa-bars" ></i>
                </label>
            }
            <aside className={
                    isMenuOpen
                    ?"menuopen"
                    :""
            }>
                <div className="logo">
                    <i className="far fa-grin-wink"></i>
                    <h1>AlmostVK</h1>
                </div>
                <nav>
                    <ul>
                        <AppLink to='/chats/1'>Chat1</AppLink>
                        <AppLink to='/chats/2'>Chat2</AppLink>
                        <AppLink to='/chats/3'>Chat3</AppLink>
                    </ul>
                </nav>
                <div className = "users-online">
                    <h4>Users Online</h4>
                    <ul id="users">
                        {
                            userRoom.map((el, index) => (
                                <li key={ index }>
                                    {el}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="logout"><NavLink exact to='/' ><i className="fas fa-sign-out-alt"></i> LogOut</NavLink></div>
                {
                isMenuOpen
                ?
                <label className="close" htmlFor="menu" onClick={this.changeIsMenuOpen} >
                    <i className="far fa-times-circle"></i>
                </label>
                :null
                }
            </aside>
            </>
        )
    }
}

const mapStateProps = (state) => {
    return {
        user: state.user,
        chat: state.chat
    };
};

export default connect(mapStateProps, null)(Sidebar);