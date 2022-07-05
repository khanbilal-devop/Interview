import { SAVE_USERS} from './types';

const INIT_STATE = {
    users: {},
    message : ''
};

export default (state = INIT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case SAVE_USERS:
            return { ...state, users: action.payload?.data , message :action.payload?.message };
        default: return { ...state };
    }
}