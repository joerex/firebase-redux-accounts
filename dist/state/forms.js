"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.reducer = exports.logout = exports.login = exports.forgotPassword = exports.publicRegister = exports.register = exports.acceptInvite = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _views = _interopRequireWildcard(require("./views"));

var ACCEPT_INVITE = 'ACCEPT_INVITE',
    REGISTER = 'REGISTER',
    PUBLIC_REGISTER = 'PUBLIC_REGISTER',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT';

var acceptInvite = function acceptInvite(directive) {
  return {
    type: ACCEPT_INVITE,
    directive: directive
  };
};

exports.acceptInvite = acceptInvite;

var register = function register(directive) {
  return {
    type: REGISTER,
    directive: directive
  };
};

exports.register = register;

var publicRegister = function publicRegister(directive) {
  return {
    type: PUBLIC_REGISTER,
    directive: directive
  };
};

exports.publicRegister = publicRegister;

var forgotPassword = function forgotPassword(directive) {
  return {
    type: FORGOT_PASSWORD,
    directive: directive
  };
};

exports.forgotPassword = forgotPassword;

var login = function login(directive) {
  return {
    type: LOGIN,
    directive: directive
  };
};

exports.login = login;

var logout = function logout(directive) {
  return {
    type: LOGOUT,
    directive: directive
  };
};

exports.logout = logout;

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    acceptInvite: {
      status: _views.ENABLED_STATE
    },
    register: {
      status: _views.ENABLED_STATE
    },
    forgotPassword: {
      status: _views.ENABLED_STATE
    },
    login: {
      status: _views.ENABLED_STATE
    },
    publicRegister: {
      status: _views.ENABLED_STATE
    },
    logout: {
      status: _views.ENABLED_STATE
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ACCEPT_INVITE:
      return (0, _objectSpread2["default"])({}, state, {
        acceptInvite: (0, _views["default"])(state.acceptInvite, action.directive)
      });

    case REGISTER:
      return (0, _objectSpread2["default"])({}, state, {
        register: (0, _views["default"])(state.register, action.directive)
      });

    case PUBLIC_REGISTER:
      return (0, _objectSpread2["default"])({}, state, {
        publicRegister: (0, _views["default"])(state.publicRegister, action.directive)
      });

    case FORGOT_PASSWORD:
      return (0, _objectSpread2["default"])({}, state, {
        forgotPassword: (0, _views["default"])(state.forgotPassword, action.directive)
      });

    case LOGIN:
      return (0, _objectSpread2["default"])({}, state, {
        login: (0, _views["default"])(state.login, action.directive)
      });

    case LOGOUT:
      return (0, _objectSpread2["default"])({}, state, {
        logout: (0, _views["default"])(state.logout, action.directive)
      });

    default:
      return state;
  }
};

exports.reducer = reducer;
var _default = reducer;
exports["default"] = _default;