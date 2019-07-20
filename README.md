# Redux Accounts • [![Build Status](https://badge.buildkite.com/7ca43607a8d528c59d06625800bd8e709c995decbcdaea0111.svg)](https://buildkite.com/joerex/firebase-redux-accounts)

For use with `react` + `react-redux` apps. 

### Components
- login
- logout
- register
- forgot password

### Reducers

The `view` reducer is designed to hold the common states of a view.

*State*

```
loading | enabled [success] | disabled | pending | error [message]
```
 
 *Actions*
 
 ```
 init | pending | success | error
 ```
 
 ---
 

The `forms` reducer is a composition of view reducers to facilitate common application account forms. 
It's optional but may save you some time writing boilerplate. At the very least it's a good example of how the `view`
reducer and actions can be composed in your app.

*State*

```
acceptInvite : ViewState,
register: ViewState,
forgotPassword: ViewState,
login: ViewState,
publicRegister: ViewState,
logout: ViewState,
```
 
 *Actions*
 
 ```
 login <view action> | logout <view action> | acceptInvite <view action> | register <view action> | publicRegister <view action> | forgotPassword <view action> | error
 ```
 

## Getting started


#### Install Dependencies
This guide assumes you are already using `react` and `react-redux`. Some of the functionality provided also depends on `redux-thunk`.

#### Use reducer
Todo: explain

```aidl
// load all possible forms into state

import {
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from 'redux-accounts/state/forms';
import appReducer './reducers'

const store = createStore(
  combineReducers({
      accounts: accountsReducer,
      app: appReducer,
  }),
  applyMiddleware(thunk)
);

...


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