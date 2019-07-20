"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Login = _interopRequireDefault(require("./Login"));

var _views = require("../../state/views");

var mockProps = {
  state: {
    status: _views.ENABLED_STATE
  },
  onSubmit: function onSubmit() {}
};

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Login["default"], mockProps));
  it('should render a form', function () {
    expect(component.find('form').exists()).toBe(true);
  });
  it('should render an email input', function () {
    expect(component.find('input[name="email"]').length).toEqual(1);
  });
  it('should render a password input', function () {
    expect(component.find('input[name="password"]').length).toEqual(1);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var inputTests = function inputTests() {
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Login["default"], mockProps));
  it('should handle username input', function () {
    component.find('input[name="email"]').simulate('change', {
      target: {
        value: 'bob',
        name: 'email'
      }
    });
    expect(component.find('input[name="email"]').props().value).toEqual('bob');
  });
  it('should handle password input', function () {
    component.find('input[name="password"]').simulate('change', {
      target: {
        value: 'activate',
        name: 'password'
      }
    });
    expect(component.find('input[name="password"]').props().value).toEqual('activate');
  });
};

var errorTests = function errorTests() {
  var error = 'Houston, we have a problem';
  var mockErrorState = {
    status: _views.ERROR_STATE,
    error: error
  };
  var selector = 'div.alert.alert-danger.error';
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Login["default"], mockProps));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      state: mockErrorState
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var login = jest.fn();
  var params = {
    email: 'bob',
    password: 'activate'
  };
  var props = (0, _objectSpread2["default"])({}, mockProps, {
    onSubmit: function onSubmit() {
      return login(params);
    }
  });
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Login["default"], props));
  component.setState(params);
  it('should submit state', function () {
    component.find('button.submit').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(login).toBeCalledWith(params);
  });
};

describe('Login Component', function () {
  describe('Render', renderTests);
  describe('Input', inputTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});