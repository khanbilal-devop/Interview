import { combineReducers } from 'redux';
import authReducer from './Auth/reducers';
import user from './Users/reducers';
// import designerReducer from "./designer/reducer"
// import cartReducer from "./cart/reducer"
// import userReducer from "./user/reducer"
// import authUser from './authAndRegister/reducer';

const reducers = combineReducers({
  authReducer,
  user
  // loadingStatus,
  // notification,
  // designerReducer,
  // cartReducer,
  // userReducer,
  // authUser
});

export default reducers;