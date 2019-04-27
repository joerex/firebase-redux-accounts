"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _state = require("../state");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***
 * Default token endpoint
 * @param uid
 * @returns {string}
 */
var defaultTokenPath = function defaultTokenPath(uid) {
  return 'metadata/' + uid + '/refreshTime';
};
/***
 * Not ready message
 * @type {string}
 */


var notReady = 'Auth not ready';
/***
 * Map token to role
 * @param token
 * @returns Role
 */

var mapRole = function mapRole(token) {
  return {
    isClient: token.claims.isClient || false,
    isAdmin: token.claims.isAdmin || false,
    isMember: token.claims.isMember || false,
    isManager: token.claims.isManager || false,
    emailVerified: token.claims.email_verified,
    token: token.token
  };
};
/***
 * Firebase Service
 */


var FirebaseAccounts =
/*#__PURE__*/
function () {
  function FirebaseAccounts() {
    _classCallCheck(this, FirebaseAccounts);

    _defineProperty(this, "_refreshPathFromUid", void 0);

    _defineProperty(this, "_app", void 0);

    _defineProperty(this, "_dispatch", void 0);

    this._app = null;
  }
  /***
   * Initiate service
   * @param app
   * @param dispatch
   * @param tokenPath
   */


  _createClass(FirebaseAccounts, [{
    key: "init",
    value: function init(app, dispatch, tokenPath) {
      var _this = this;

      this._app = app;
      this._refreshPathFromUid = tokenPath || defaultTokenPath;
      this._dispatch = dispatch;
      this.auth.onAuthStateChanged(function (user) {
        _this.onAuthStateChanged(user);
      });
    }
    /***
     * Signout of Firebase
     */

  }, {
    key: "signOut",
    value: function signOut() {
      this.auth.signOut();
    }
    /***
     * Handle Firebase auth state change
     * @param user
     * @param dispatch
     * @returns {Promise<void>}
     */

  }, {
    key: "onAuthStateChanged",
    value: function () {
      var _onAuthStateChanged = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user, dispatch) {
        var role;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return this.getRole(user);

              case 4:
                role = _context.sent;

                this._dispatch((0, _state.loginSuccess)(user, role));

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                this._dispatch((0, _state.authError)(_context.t0));

              case 11:
                _context.next = 14;
                break;

              case 13:
                this._dispatch((0, _state.logoutSuccess)());

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function onAuthStateChanged(_x, _x2) {
        return _onAuthStateChanged.apply(this, arguments);
      }

      return onAuthStateChanged;
    }()
    /***
     * Get Role
     * @param user
     * @returns {Promise<*>}
     */

  }, {
    key: "getRole",
    value: function () {
      var _getRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(user) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  var path = _this2._refreshPathFromUid(user.uid);

                  var getTokenOnce =
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2() {
                      var token;
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return user.getIdTokenResult(true);

                            case 2:
                              token = _context2.sent;
                              resolve(mapRole(token));

                              _this2.database.ref(path).off('value');

                            case 5:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function getTokenOnce() {
                      return _ref.apply(this, arguments);
                    };
                  }();

                  _this2.database.ref(path).on('value', getTokenOnce);
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getRole(_x3) {
        return _getRole.apply(this, arguments);
      }

      return getRole;
    }()
    /***
     * Get app
     */

  }, {
    key: "app",
    get: function get() {
      return this._app ? this._app : {
        auth: this.auth,
        database: this.database
      };
    }
    /***
     * Get auth
     */

  }, {
    key: "auth",
    get: function get() {
      return this._app ? this._app.auth() : {
        signInWithEmailAndPassword: function signInWithEmailAndPassword() {
          return Promise.reject(notReady);
        },
        createUserWithEmailAndPassword: function createUserWithEmailAndPassword() {
          return Promise.reject(notReady);
        },
        signOut: function signOut() {
          return Promise.reject(notReady);
        },
        sendPasswordResetEmail: function sendPasswordResetEmail() {
          return Promise.reject(notReady);
        },
        onAuthStateChanged: function onAuthStateChanged() {
          return Promise.reject(notReady);
        }
      };
    }
    /***
     * Get database
     */

  }, {
    key: "database",
    get: function get() {
      return this._app ? this._app.database() : {
        ref: function ref(args) {
          return {
            on: function on() {
              return Promise.reject(notReady);
            },
            off: function off() {
              return Promise.reject(notReady);
            }
          };
        }
      };
    }
  }]);

  return FirebaseAccounts;
}();

var _default = new FirebaseAccounts();

exports["default"] = _default;