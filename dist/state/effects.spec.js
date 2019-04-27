"use strict";

var _services = _interopRequireDefault(require("../services"));

var _effects = require("./effects");

var _index = require("./index");

var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middlewares = [_reduxThunk["default"]];
var mockStore = (0, _reduxMockStore["default"])(middlewares);
var dispatch = jest.fn();

var auth = function auth() {
  return {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    onAuthStateChanged: jest.fn()
  };
};

var error = 'woops';

var authMockError = function authMockError() {
  return {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn().mockRejectedValue(new Error(error)),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn().mockRejectedValue(new Error(error)),
    onAuthStateChanged: jest.fn()
  };
};

var database = function database() {
  return {
    ref: jest.fn()
  };
};

var databaseMockError = function databaseMockError() {
  return {
    ref: jest.fn().mockRejectedValue(new Error(error))
  };
};

var app = {
  auth: auth,
  database: database
};
var appError = {
  auth: authMockError,
  database: databaseMockError
};
describe('Reset password', function () {
  it('should call firebase auth', function () {
    _services["default"].init(app, dispatch);

    var spy = jest.spyOn(_services["default"], 'auth', 'get');
    var action = (0, _effects.resetPassword)('bob@gmail.com');
    action(dispatch);
    expect(spy).toHaveBeenCalled();
  });
  it('should dispatch pending and success actions', function () {
    _services["default"].init(app, dispatch);

    var email = 'bob@gmail.com';
    var action = (0, _effects.resetPassword)(email);
    var expectedActions = [(0, _index.authPending)(), (0, _index.resetPasswordSuccess)(email)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch pending and error actions', function () {
    _services["default"].init(appError, dispatch);

    var action = (0, _effects.resetPassword)('');
    var expectedActions = [(0, _index.authPending)(), (0, _index.authError)(error)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe('Public register', function () {
  var params = {
    email: 'bob@gmail.com',
    password: 'activate'
  };
  it('should call firebase auth', function () {
    _services["default"].init(app, dispatch);

    var spy = jest.spyOn(_services["default"], 'auth', 'get');
    var action = (0, _effects.register)(params);
    action(dispatch);
    expect(spy).toHaveBeenCalled();
  });
  it('should dispatch pending and success actions', function () {
    _services["default"].init(app, dispatch);

    var action = (0, _effects.register)(params);
    var expectedActions = [(0, _index.authPending)(), (0, _index.loginSuccess)()];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch pending and error actions', function () {
    _services["default"].init(appError, dispatch);

    var action = (0, _effects.register)({});
    var expectedActions = [(0, _index.authPending)(), (0, _index.authError)(error)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe('Accept invite register', function () {
  var params = {
    email: 'bob@gmail.com',
    password: 'activate'
  };
  it('should call firebase auth', function () {
    _services["default"].init(app, dispatch);

    var spy = jest.spyOn(_services["default"], 'auth', 'get');
    var action = (0, _effects.register)(params);
    action(dispatch);
    expect(spy).toHaveBeenCalled();
  });
  it('should dispatch pending and success actions', function () {
    _services["default"].init(app, dispatch);

    var action = (0, _effects.register)(params);
    var expectedActions = [(0, _index.authPending)(), (0, _index.loginSuccess)()];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch pending and error actions', function () {
    _services["default"].init(appError, dispatch);

    var action = (0, _effects.register)({});
    var expectedActions = [(0, _index.authPending)(), (0, _index.authError)(error)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});