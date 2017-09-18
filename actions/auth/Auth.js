import Auth0 from 'react-native-auth0';
import params from '../../auth0-params.json';

import axios from "axios";


export default class Auth {

  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    // this.myAuth0 = new Auth0({
    //   domain: params.domain,
    //   clientId: params.clientId
    // });
  }

  signin(email, password) {

    return new Promise((resolve, reject) => {

      const bodyParams = {
        client_id: params.clientId,
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: email,
        password: password,
        realm: params.realm,
        audience: params.apiAudience,
        scope: params.scope
      };

      console.log(bodyParams);

      // console.log(this.myAuth0.auth);

      axios.post(`https://${params.domain}/oauth/token`, bodyParams)

      // this.myAuth0
      //   .auth
      //   .passwordRealm(bodyParams)

        .then(response => {
          // this.setSession(payload);
          console.log("signin success blockk");
          console.log('data', response.data);
          const { id_token, access_token, expires_in } = response.data
          console.log('id_token', id_token);
          console.log('access_token', access_token);
          console.log('expires_in', expires_in);
          return resolve({ idToken: id_token, accessToken: access_token, expiresIn: expires_in });
        })
        .catch(err => {
          console.error(err);
          console.log("signin error block");
          return reject(new Error(err));
        });

    })

  }

  signout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('origin_access_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setSession(authResult) {
    // Set the time that the access token will expire at

    // let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    // localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    // let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // return new Date().getTime() < expiresAt;
    return true;
  }

}
