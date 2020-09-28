import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Auth0Provider
    domain="dev-934u86xf.eu.auth0.com"
    clientId="GxcSvPMunK9a9CH6qVwxwVR41QOjPOeC"
    redirectUri={window.location.origin}
    audience="https://dev-934u86xf.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata read:openid"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
