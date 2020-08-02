import { SET_CHAT } from '../constants';
import { load } from 'redux-localstorage-simple';

let CHAT = load({ 
    state: ['chat'],
    namespace:'user'
});
if(!CHAT || !CHAT.chat || !CHAT.chat.length){
    CHAT = {
        chat: ''
    }
}

export const chat = (state = CHAT.chat, { type, number }) => {
    switch (type){
        case SET_CHAT:
            return number;
        default:
            return state;
    }
}