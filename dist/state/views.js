"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuccess = exports.getError = exports.getErrorCount = exports.getLoading = exports.getPending = exports["default"] = exports.clearError = exports.loaded = exports.reset = exports.success = exports.error = exports.pending = exports.ERROR_ACTION = exports.SUCCESS_ACTION = exports.PENDING_ACTION = exports.CLEAR_ERROR_ACTION = exports.RESET_ACTION = exports.INIT_ACTION = exports.DISABLED_STATE = exports.ENABLED_STATE = exports.LOADING_STATE = exports.ERROR_STATE = exports.PENDING_STATE = void 0;
var // view states
PENDING_STATE = 'PENDING_STATE',
    ERROR_STATE = 'ERROR_STATE',
    LOADING_STATE = 'LOADING_STATE',
    ENABLED_STATE = 'ENABLED_STATE',
    DISABLED_STATE = 'DISABLED_STATE',
    // actions
INIT_ACTION = 'INIT_ACTION',
    RESET_ACTION = 'RESET_ACTION',
    CLEAR_ERROR_ACTION = 'CLEAR_ERROR_ACTION',
    PENDING_ACTION = 'PENDING_ACTION',
    SUCCESS_ACTION = 'SUCCESS_ACTION',
    ERROR_ACTION = 'ERROR_ACTION';
/* States */

exports.ERROR_ACTION = ERROR_ACTION;
exports.SUCCESS_ACTION = SUCCESS_ACTION;
exports.PENDING_ACTION = PENDING_ACTION;
exports.CLEAR_ERROR_ACTION = CLEAR_ERROR_ACTION;
exports.RESET_ACTION = RESET_ACTION;
exports.INIT_ACTION = INIT_ACTION;
exports.DISABLED_STATE = DISABLED_STATE;
exports.ENABLED_STATE = ENABLED_STATE;
exports.LOADING_STATE = LOADING_STATE;
exports.ERROR_STATE = ERROR_STATE;
exports.PENDING_STATE = PENDING_STATE;

/* Action creators */
var pending = function pending() {
  return {
    type: PENDING_ACTION
  };
};

exports.pending = pending;

var error = function error(_error) {
  return {
    type: ERROR_ACTION,
    error: _error
  };
};

exports.error = error;

var success = function success() {
  return {
    type: SUCCESS_ACTION
  };
};

exports.success = success;

var reset = function reset() {
  return {
    type: RESET_ACTION
  };
};

exports.reset = reset;

var loaded = function loaded() {
  return {
    type: INIT_ACTION
  };
};

exports.loaded = loaded;

var clearError = function clearError() {
  return {
    type: CLEAR_ERROR_ACTION
  };
};
/* reducer */


exports.clearError = clearError;

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    status: LOADING_STATE
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case PENDING_ACTION:
      return {
        status: PENDING_STATE
      };

    case SUCCESS_ACTION:
      return {
        status: ENABLED_STATE,
        success: true
      };

    case ERROR_ACTION:
      var count = function count(s) {
        switch (s.status) {
          case ERROR_STATE:
            return s.count + 1;

          default:
            return 1;
        }
      };

      return {
        status: ERROR_STATE,
        error: action.error,
        count: count(state)
      };

    case RESET_ACTION:
    case INIT_ACTION:
    case CLEAR_ERROR_ACTION:
      return {
        status: ENABLED_STATE,
        success: false
      };

    default:
      return state;
    //(action.type: empty)
  }
};

var _default = reducer;
/* SELECTORS */

exports["default"] = _default;

var getPending = function getPending(state) {
  return state.status === PENDING_STATE;
};

exports.getPending = getPending;

var getLoading = function getLoading(state) {
  return state.status === LOADING_STATE;
};

exports.getLoading = getLoading;

var getErrorCount = function getErrorCount(state) {
  switch (state.status) {
    case ERROR_STATE:
      return state.count;

    default:
      return 0;
  }
};

exports.getErrorCount = getErrorCount;

var getError = function getError(state) {
  switch (state.status) {
    case ERROR_STATE:
      return state.error;

    default:
      return null;
  }
};

exports.getError = getError;

var getSuccess = function getSuccess(state) {
  switch (state.status) {
    case ENABLED_STATE:
    case DISABLED_STATE:
      return state.success;

    default:
      return null;
  }
};

exports.getSuccess = getSuccess;