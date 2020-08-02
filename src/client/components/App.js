import React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router,
    Route            
  } from 'react-router-dom';
import '../scss/App.scss';
import Login from './Login';
import Main from './Main';
import Videostream from './Videostream';

function App() {
    return (
        <Router hashType={'noslash'}>
            <Route exact path='/' ><Login /></Route>
            <Route path='/chats'><Main /></Route>
        </Router>
    )
}

export default hot(App)