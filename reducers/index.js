import { combineReducers } from 'redux';
import forgotPasswordReducer from './forgotPasswordReducer';
import changeEmailReducer from './changeEmailReducer';
import changePasswordReducer from './changePasswordReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  forgot: forgotPasswordReducer,
  email: changeEmailReducer,
  password: changePasswordReducer,
});
