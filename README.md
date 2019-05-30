# Firebase + Redux Accounts • [![Build Status](https://badge.buildkite.com/7ca43607a8d528c59d06625800bd8e709c995decbcdaea0111.svg)](https://buildkite.com/joerex/firebase-redux-accounts)

For use with `react` + `react-redux` apps. Provides components and state management for Firebase projects.

---

## Getting started

#### Setup Firebase

- Create a firebase project
- Copy project settings to your react app

#### Install Dependencies
This guide assumes you are already using `react` and `react-redux`.

```aidl
$ npm install firebase redux-thunk firebase-redux-accounts
```

#### Combine reducer

The auth reducer can be added as any key in `combineReducers`.

```aidl
import {
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from 'firebase-redux-accounts/dist/state';
import appReducer './reducers'

const store = createStore(
  combineReducers({
      auth: authReducer,
      app: appReducer,
  }),
  applyMiddleware(thunk)
);

...
```

#### Initialize Firebase app
An `auth` service wraps the firebase application and dispatches actions on auth state change:

- `authError` 
- `loginSuccess`
- `logoutSuccess`

```aidl
// App.js

import * as firebase from "firebase"
import auth from 'firebase-redux-accounts/dist/services'
import {settings} from './settings';

class App extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(settings.firebase)
      auth.init(firebase.app(), this.props.dispatch)
    }
  }
  render() { ... } 
}
```

#### Use selectors

```js
// App.js

import {
  getAuthLoading,
  getAuthPending
  getAuthenticated,
  getAuthFailedAttempts,
  getAuthError,
  getRole,
  getAuthUpdatePasswordSuccess,
  getAuthResetPasswordSuccess,
  getAuthRegisterSuccess,
  getUser
} from 'firebase-redux-accounts/dist/reducer';

...

export default connect(
  (state) => {
    return {
      user: getUser(state.auth),
      role: getRole(state.auth),
      authenticated: getAuthenticated(state.auth),
      authLoading: getAuthLoading(state.auth)
    }
  },
  (dispatch) => {
    return {dispatch};
  })(App);
```

#### Use pre-built components

```js
import {
  Login,
  Logout,
  Register,
  ForgotPassword,
} from 'firebase-redux-accounts/dist/components';
```

#### Dispatch actions / effects directly

```js
import {
  authPending,
  authError,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  resetPasswordSuccess,
  updatePasswordSuccess,
  clearError
} from 'firebase-redux-accounts/dist/actions';

import {
  resetPassword,
  register,
  login,
  logout
} from 'firebase-redux-accounts/dist/effects';
```

## Invitations

This package has support [`joerex/firebase-users`](https://github.com/joerex/firebase-users) which provides lambda function that can be deployed to your firebase project and used for invitation functionality.

This api enables actions you can use:

- `acceptInvite`
- `adminRegister`
- `validateEmail`

In addition to the lambda function and `env` variable is necessary when building your app:
```
REACT_APP_API_ROOT=https://your-google-cloud-api.io
```