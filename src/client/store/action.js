import { SET_USER, ADD_MESSAGE, SET_CHAT } from './constants';

export const setUser = ( name ) => {
    return {
        type: SET_USER,
        name
    }
}

export const setChat = ( number ) => {
    return {
        type: SET_CHAT,
        number
    }
}


export const addMessage = ( id, name, message, isSystemMsg, room, time ) => {
    return {
        type: ADD_MESSAGE, 
        id,
        name,
        message,
        isSystemMsg,
        room,
        time
    }
}