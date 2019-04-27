"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Login = require("./Login");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Login.LoginComponent, null));
  it('should render a form', function () {
    expect(component.find('form').exists()).toBe(true);
  });
  it('should render an email input', function () {
    expect(component.find('input[name="username"]').length).toEqual(1);
  });
  it('should render a password input', function () {
    expect(component.find('input[name="password"]').length).toEqual(1);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var inputTests = function inputTests() {
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Login.LoginComponent, null));
  it('should handle username input', function () {
    component.find('input[name="username"]').simulate('change', {
      target: {
        value: 'bob',
        name: 'username'
      }
    });
    expect(component.find('input[name="username"]').props().value).toEqual('bob');
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
  var selector = 'div.alert.alert-danger.error';
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Login.LoginComponent, null));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      error: error
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var login = jest.fn();
  var state = {
    username: 'bob',
    password: 'activate'
  };
  var props = {
    login: login
  };
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Login.LoginComponent, props));
  component.setState(state);
  it('should submit state', function () {
    component.find('button.submit').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(login).toBeCalledWith(state);
  });
};

describe('Login Component', function () {
  describe('Render', renderTests);
  describe('Input', inputTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});