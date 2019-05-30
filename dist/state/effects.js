"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.adminRegister = exports.acceptInvite = exports.register = exports.resetPassword = exports.clearLocalStorage = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var API_ROOT = process.env.REACT_APP_API_ROOT || '';
/***
 * Response status is ok
 * @param response
 * @returns {boolean}
 */

var ok = function ok(response) {
  return _typeof(response) === 'object' && Object.keys(response).length === 0;
};
/***
 * Map Error
 * @param error
 * @returns {string}
 */


var mapError = function mapError(error) {
  var message = _typeof(error) !== 'object' || error instanceof TypeError || error instanceof SyntaxError ? "An unexpected problem has occured. Please check your internet connection.\n\n               If the problem persists please contact us." : error.message;
  return message;
};
/***
 * Clear local storage effect
 * @param settings
 * @returns {Function}
 */


var clearLocalStorage = function clearLocalStorage(settings) {
  return function (dispatch) {
    localStorage.removeItem(settings.localStorageKey);
  };
};
/***
 * Send reset password effect
 * @param sendPasswordResetEmail
 * @param email
 * @param success
 * @param error
 * @returns {Function}
 */


exports.clearLocalStorage = clearLocalStorage;

var resetPassword = function resetPassword(sendPasswordResetEmail, email, success, error) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return sendPasswordResetEmail(email);

              case 3:
                response = _context.sent;
                dispatch(success());
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                dispatch(error(mapError(_context.t0)));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
/***
 * Public register param type
 */


exports.resetPassword = resetPassword;

/***
 * Public register effect
 * @param createUserWithEmailAndPassword
 * @param credentials
 * @param profile
 * @param success
 * @param error
 * @returns {Function}
 */
var register = function register(createUserWithEmailAndPassword, credentials, profile, success, error) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return createUserWithEmailAndPassword(credentials, profile);

              case 3:
                dispatch(success());
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                dispatch(error(mapError(_context2.t0)));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
/***
 * Accept invite / register param type
 */


exports.register = register;

/***
 * Accept invite / register effect
 * @param params
 * @param token
 * @param key
 * @param success
 * @param error
 * @returns {Function}
 */
var acceptInvite = function acceptInvite(params, token, key, success, error) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, settings) {
        var endpoint, request, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                endpoint = settings.endpoint ? settings.endpoint.inviteUser : '/acceptInvite';
                _context3.next = 4;
                return fetch(API_ROOT + endpoint, {
                  method: 'POST',
                  body: JSON.stringify(_objectSpread({}, params, {
                    key: key,
                    token: token
                  })),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 4:
                request = _context3.sent;

                if (!request.ok) {
                  _context3.next = 9;
                  break;
                }

                dispatch(success());
                _context3.next = 13;
                break;

              case 9:
                _context3.next = 11;
                return request.json();

              case 11:
                response = _context3.sent;
                dispatch(error(mapError(response)));

              case 13:
                _context3.next = 18;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                dispatch(error(mapError(_context3.t0)));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 15]]);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
/***
 * Role types
 */


exports.acceptInvite = acceptInvite;

/***
 * Admin register effect
 * @param params
 * @param token
 * @param success
 * @param error
 * @param reset
 * @param settings
 * @returns {Function}
 */
var adminRegister = function adminRegister(params, token, success, error, reset, settings) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        var endpoint, request, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                endpoint = settings && settings.endpoint ? settings.endpoint.inviteUser : '/inviteUser';
                _context4.next = 4;
                return fetch(API_ROOT + endpoint, {
                  method: 'POST',
                  body: JSON.stringify(_objectSpread({}, params, {
                    token: token
                  })),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 4:
                request = _context4.sent;
                _context4.next = 7;
                return request.json();

              case 7:
                response = _context4.sent;

                if (ok(response)) {
                  dispatch(success());
                  reset && reset();
                } else {
                  dispatch(error(mapError(response)));
                }

                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                dispatch(error(mapError(_context4.t0)));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};
/***
 * Login param type
 */


exports.adminRegister = adminRegister;

/***
 * Login effect
 * @param signInWithEmailAndPassword
 * @param params
 * @param success
 * @param error
 * @returns {Function}
 */
var login = function login(signInWithEmailAndPassword, params, success, error) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return signInWithEmailAndPassword(params);

              case 3:
                response = _context5.sent;
                dispatch(success());
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                dispatch(error(mapError(_context5.t0)));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};
/***
 * Logout effect
 * @returns {Function}
 */


exports.login = login;

var logout = function logout(signOut, success, error) {
  return function (dispatch) {
    try {
      signOut();
      dispatch(success());
    } catch (e) {
      dispatch(error(mapError(e)));
    }
  };
};

exports.logout = logout;