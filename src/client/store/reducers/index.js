import { combineReducers } from 'redux';
import { user } from './user';
import { messages } from './messages';
import { chat } from './chat';

const rootReducer = combineReducers({ user, messages, chat });

export default rootReducer;