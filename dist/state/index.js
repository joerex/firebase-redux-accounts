"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.getAuthRegisterSuccess = exports.getAuthUpdatetPasswordSuccess = exports.getAuthResetPasswordSuccess = exports.getAuthUpdatePasswordSuccess = exports.getRole = exports.getAuthError = exports.getAuthFailedAttempts = exports.getAuthenticated = exports.getAuthLoading = exports.getAuthToken = exports.getAuthPending = exports["default"] = exports.getAuthState = exports.initAuthState = exports.REDUCER_ID = exports.inviteAccepted = exports.clearError = exports.registerSuccess = exports.resetPasswordSuccess = exports.logoutSuccess = exports.loginSuccess = exports.authError = exports.authPending = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* ACTIONS */
var authPending = function authPending() {
  return {
    type: 'AUTH_PENDING'
  };
};

exports.authPending = authPending;

var authError = function authError(error) {
  return {
    type: 'AUTH_ERROR',
    error: error
  };
};

exports.authError = authError;

var loginSuccess = function loginSuccess(user, role) {
  return {
    type: 'LOGIN_SUCCESS',
    user: user,
    role: role
  };
};

exports.loginSuccess = loginSuccess;

var logoutSuccess = function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS'
  };
};

exports.logoutSuccess = logoutSuccess;

var resetPasswordSuccess = function resetPasswordSuccess(email) {
  return {
    type: 'RESET_PASSWORD_SUCCESS',
    email: email
  };
};

exports.resetPasswordSuccess = resetPasswordSuccess;

var registerSuccess = function registerSuccess() {
  return {
    type: 'REGISTER_SUCCESS'
  };
};

exports.registerSuccess = registerSuccess;

var clearError = function clearError() {
  return {
    type: 'CLEAR_ERROR'
  };
};

exports.clearError = clearError;

var inviteAccepted = function inviteAccepted() {
  return {
    type: 'INVITE_ACCEPTED'
  };
};
/* REDUCER */


exports.inviteAccepted = inviteAccepted;
var REDUCER_ID = 'react-redux-accounts';
exports.REDUCER_ID = REDUCER_ID;

var initAuthState = function initAuthState(user, role) {
  return {
    reducerId: REDUCER_ID,
    state: {
      updatePasswordSuccess: false,
      resetPasswordSuccess: false,
      registerSuccess: false,
      loading: true,
      authenticated: false,
      failedAuthAttempts: 0,
      error: null,
      pending: false
    },
    role: role,
    user: user
  };
};

exports.initAuthState = initAuthState;

var getAuthState = function getAuthState(state) {
  var reducers = Object.keys(state);

  for (var i = 0; i < reducers.length; i++) {
    if (state[reducers[i]].reducerId === REDUCER_ID) {
      return state[reducers[i]];
    }
  }

  return initAuthState();
};

exports.getAuthState = getAuthState;

var authReducer = function authReducer() {
  var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initAuthState();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'AUTH_PENDING':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          pending: true
        })
      });

    case 'INVITE_ACCEPTED':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          pending: false
        })
      });

    case 'AUTH_ERROR':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          failedAuthAttempts: ++auth.state.failedAuthAttempts,
          error: action.error,
          loading: false,
          pending: false
        })
      });

    case 'UPDATE_ROLE':
      return _objectSpread({}, auth, {
        role: action.role
      });

    case 'LOGIN_SUCCESS':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          authenticated: true,
          failedAuthAttempts: 0,
          loading: false,
          pending: false
        }),
        user: action.user,
        role: action.role
      });

    case 'LOGOUT_SUCCESS':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          authenticated: false,
          failedAuthAttempts: 0,
          loading: false,
          pending: false
        }),
        user: null,
        role: null
      });

    case 'RESET_PASSWORD_SUCCESS':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          failedAuthAttempts: 0,
          resetPasswordSuccess: true,
          pending: false
        })
      });

    case 'REGISTER_SUCCESS':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          registerSuccess: true,
          pending: false,
          failedAuthAttempts: 0,
          error: null
        })
      });

    case 'SET_INITIALIZED':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          loading: false
        })
      });

    case 'CLEAR_ERROR':
      return _objectSpread({}, auth, {
        state: _objectSpread({}, auth.state, {
          error: null
        })
      });

    default:
      return auth;
    //(action.type: empty)
  }
};

var _default = authReducer;
/* SELECTORS */

exports["default"] = _default;

var getAuthPending = function getAuthPending(auth) {
  return auth.state.pending;
};

exports.getAuthPending = getAuthPending;

var getAuthToken = function getAuthToken(auth) {
  if (auth.role && auth.role.token) {
    return auth.role.token;
  }
};

exports.getAuthToken = getAuthToken;

var getAuthLoading = function getAuthLoading(auth) {
  return auth.state.loading;
};

exports.getAuthLoading = getAuthLoading;

var getAuthenticated = function getAuthenticated(auth) {
  return auth.state.authenticated;
};

exports.getAuthenticated = getAuthenticated;

var getAuthFailedAttempts = function getAuthFailedAttempts(auth) {
  return auth.state.failedAuthAttempts;
};

exports.getAuthFailedAttempts = getAuthFailedAttempts;

var getAuthError = function getAuthError(auth) {
  return auth.state.error;
};

exports.getAuthError = getAuthError;

var getRole = function getRole(auth) {
  return auth.role;
};

exports.getRole = getRole;

var getAuthUpdatePasswordSuccess = function getAuthUpdatePasswordSuccess(auth) {
  return auth.state.updatePasswordSuccess;
};

exports.getAuthUpdatePasswordSuccess = getAuthUpdatePasswordSuccess;

var getAuthResetPasswordSuccess = function getAuthResetPasswordSuccess(auth) {
  return auth.state.resetPasswordSuccess;
};

exports.getAuthResetPasswordSuccess = getAuthResetPasswordSuccess;

var getAuthUpdatetPasswordSuccess = function getAuthUpdatetPasswordSuccess(auth) {
  return auth.state.updatePasswordSuccess;
};

exports.getAuthUpdatetPasswordSuccess = getAuthUpdatetPasswordSuccess;

var getAuthRegisterSuccess = function getAuthRegisterSuccess(auth) {
  return auth.state.registerSuccess;
};

exports.getAuthRegisterSuccess = getAuthRegisterSuccess;

var getUser = function getUser(auth) {
  return auth.user;
};

exports.getUser = getUser;