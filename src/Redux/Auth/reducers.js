import {  LOGIN_USER_SUCCESS,LOGIN_USER_ERROR} from './types';

const INIT_STATE = {
    loggedIn: false,
    message : ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_ERROR:
            return { ...state, loggedIn : false , message : action.payload};
        case LOGIN_USER_SUCCESS:
            return { ...state, loggedIn: true , message :action.payload };
        default: return { ...state };
    }
}