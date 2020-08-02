import { SET_USER } from '../constants';
import { load } from 'redux-localstorage-simple';

let USER = load({ 
    state: ['username'],
    namespace:'user'
});
if(!USER || !USER.user || !USER.user.length){
    USER = {
        user: ''
    }
}

export const user = (state = USER.user, { type, name }) => {
    switch (type){
        case SET_USER:
            return name;
        default:
            return state;
    }
}