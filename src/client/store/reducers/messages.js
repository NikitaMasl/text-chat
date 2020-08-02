import { ADD_MESSAGE } from '../constants';
import { load } from 'redux-localstorage-simple';

let MESSAGES = load({ 
    state: ['messages'],
    namespace:'user'
});

if(!MESSAGES || !MESSAGES.messages || !MESSAGES.messages.length){
    MESSAGES = {
        messages: []
    }
}

export const messages = (state = MESSAGES.messages, { type, id, name, message, isSystemMsg, room, time }) => {
    switch (type){
        case ADD_MESSAGE:
            let isThisMessageExs = false
            state.map(el => {
                if(el.id === id){
                    isThisMessageExs = true
                }
            })
            if(isThisMessageExs){
                return state
            }else{
                return [...state, {
                    id: id,
                    name: name,
                    message: message,
                    isSystemMsg: isSystemMsg,
                    room: room,
                    time: time
                }];
            }
        default:
            return state;
    }
}