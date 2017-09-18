import * as EmailValidator from 'email-validator';
import {
  CHANGE_EMAIL_EMAIL_CHANGED,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  CHANGE_EMAIL
} from './emailTypes';

import {
  getIdToken,
  getAccessToken,
  getOriginAccessToken,
  getClaimFromToken
} from '../../utils/utils';

import params from '../../auth0-params.json';

export const emailChanged = (text) => {
  return {type: CHANGE_EMAIL_EMAIL_CHANGED, payload: text};
};

export const changeEmail = ({ newEmail, idToken, accessToken, originAccessToken }) => {

  if (!EmailValidator.validate(newEmail)) {
    console.log("Illegal email");
    return {
      type: CHANGE_EMAIL_FAIL,
      error: 'Illegal email'
    }
  }

  return (dispatch) => {

    dispatch({type: CHANGE_EMAIL});

    var email = getClaimFromToken(idToken, "email");
    console.log(`email: ${email}`);

    console.log(`Performing change email for old email: ${email} and new email: ${newEmail}`);

    var userId = getClaimFromToken(accessToken, "sub");
    console.log(`userid: ${userId}`);

    var sapId = getClaimFromToken(accessToken, "https://originenergy.com.au/uid");
    console.log(`sapId: ${sapId}`);

    const queryParams = `?originAccessToken=${originAccessToken}&oldEmail=${email}&newEmail=${newEmail}&sapId=${sapId}&auth0UserId=${userId}`;

    fetch(`${params.apiUrl}/digital/email/update${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    })
      .then((res) => res.json())
      .then(resJson => {

        const { success } = resJson;
        if (success !== 'true') {
            return dispatch({
              type: CHANGE_EMAIL_FAIL,
              error: 'Error occurred changing email'
            });
        }

        // success response here..
        console.log("change email success");
        dispatch({
          type: CHANGE_EMAIL_SUCCESS,
          payload: 'Your email has been updated'
        });

      })
        .catch(error => {
          return dispatch({
            type: CHANGE_EMAIL_FAIL,
            error: 'Error occurred changing email'
          });
        });

  };

};
