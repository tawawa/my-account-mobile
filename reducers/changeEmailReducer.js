import {
  CHANGE_EMAIL_EMAIL_CHANGED,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  CHANGE_EMAIL
} from '../actions/email/emailTypes';

const INITIAL_STATE = {
  email: '',
  error: '',
  loading: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case CHANGE_EMAIL:
      return { ...state, loading: true, error: '', message: '' };
    case CHANGE_EMAIL_SUCCESS:
      return { ...state, ...INITIAL_STATE, message: 'Email successfully updated.' };
    case CHANGE_EMAIL_FAIL:
      return { ...state, error: action.error || 'Change Email Failed', email: '', loading: false, message: '' };
    default:
      return state;
  }
};
