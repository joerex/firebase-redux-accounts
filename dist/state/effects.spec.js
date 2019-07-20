"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _effects = require("./effects");

var _views = require("./views");

var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var middlewares = [_reduxThunk["default"]];
var mockStore = (0, _reduxMockStore["default"])(middlewares);

var mockResult = function mockResult(error) {
  return error ? Promise.reject(error) : Promise.resolve();
};

var mockError = {
  message: 'woops'
};
describe('Reset password', function () {
  it('should dispatch success actions', function () {
    var action = (0, _effects.resetPassword)(function () {
      return mockResult();
    }, '', _views.success, _views.error);
    var expectedActions = [(0, _views.success)()];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch error actions', function () {
    var action = (0, _effects.resetPassword)(function () {
      return mockResult(mockError);
    }, '', _views.success, _views.error);
    var expectedActions = [(0, _views.error)(mockError.message)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
/*
describe('Accept invite register', () => {
    it('should dispatch success actions', () => {
        const action = acceptInvite({}, '', '', success, error)
        const expectedActions = [success()]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch error actions', () => {
        const action = register({})
        const expectedActions = [error(error)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
*/

describe('Register actions', function () {
  it('should dispatch success actions', function () {
    var effect = (0, _effects.register)(function () {
      return mockResult();
    }, {}, {}, _views.success, _views.error);
    var expectedActions = [(0, _views.success)()];
    var store = mockStore({});
    return store.dispatch(effect).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch error actions', function () {
    var action = (0, _effects.register)(function () {
      return mockResult(mockError);
    }, {}, {}, _views.success, _views.error);
    var expectedActions = [(0, _views.error)(mockError.message)];
    var store = mockStore({});
    return store.dispatch(action).then(function () {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});