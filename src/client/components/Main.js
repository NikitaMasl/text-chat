import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Portal from '../portal/Portal';

import Sidebar from './Sidebar';
import Chat from './Chat';
import Modalwindow from './Modalwindow';

import '../scss/Main.scss';

class Main extends Component {
    constructor(props)  {
        super(props)
    }
    render() {
        return (
            <main>
                {this.props.user === ''
                ? 
                <Portal>
                    <Modalwindow/>
                </Portal>
                : 
                <>
                <Sidebar />
                <Route exact path='/chats/'><Chat isChatChoosen={false}/></Route>
                <Route path='/chats/1'><Chat number={ 1 } /></Route>
                <Route path='/chats/2'><Chat number={ 2 } /></Route>
                <Route path='/chats/3'><Chat number={ 3 } /></Route>
                </>
                }
            </main>
        )
    }
}

const mapStateProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateProps, null)(Main);
