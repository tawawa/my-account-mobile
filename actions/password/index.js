import * as EmailValidator from 'email-validator';
import {
  CHANGE_PASSWORD_PASSWORD_CHANGED,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD
} from './passwordTypes';

import {
  getIdToken,
  getAccessToken,
  getOriginAccessToken,
  getClaimFromToken
} from '../../utils/utils';

import params from '../../auth0-params.json';

export const passwordChanged = (text) => {
  return {type: CHANGE_PASSWORD_PASSWORD_CHANGED, payload: text};
};

export const changePassword = ({ password, idToken, accessToken, originAccessToken }) => {

  if (!password) {
    console.log("Illegal password");
    return {
      type: CHANGE_PASSWORD_FAIL,
      error: 'Illegal password'
    }
  }

  return (dispatch) => {

    dispatch({type: CHANGE_PASSWORD});

    var userId = getClaimFromToken(accessToken, "sub");
    console.log(`userid: ${userId}`);

    var sapId = getClaimFromToken(accessToken, "https://originenergy.com.au/uid");
    console.log(`sapId: ${sapId}`);

    const queryParams = `?originAccessToken=${originAccessToken}&newPassword=${password}&sapId=${sapId}&auth0UserId=${userId}`;

    fetch(`${params.apiUrl}/digital/password/update${queryParams}`, {
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
              type: CHANGE_PASSWORD_FAIL,
              error: 'Error occurred changing password'
            });
        }

        // success response here..
        console.log("change password success");
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: 'Your password has been updated'
        });

      })
        .catch(error => {
          return dispatch({
            type: CHANGE_PASSWORD_FAIL,
            error: 'Error occurred changing password'
          });
        });

  };

};
