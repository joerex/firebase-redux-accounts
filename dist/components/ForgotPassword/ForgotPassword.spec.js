"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ForgotPassword = require("./ForgotPassword");

var _Login = require("../Login/Login");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_ForgotPassword.ForgotPasswordComponent, null));
  it('should render an email input', function () {
    expect(component.find('input[name="email"]').exists()).toEqual(true);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var stateTests = function stateTests() {
  var infoSelector = 'div.alert.alert-info';
  var successSelector = 'div.alert.alert-success';
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_ForgotPassword.ForgotPasswordComponent, null));
  it('should display info message or success message', function () {
    expect(component.find(infoSelector).exists()).toEqual(true);
    expect(component.find(successSelector).exists()).toEqual(false);
    component.setProps({
      resetSuccess: true
    });
    expect(component.find(infoSelector).exists()).toEqual(false);
    expect(component.find(successSelector).exists()).toEqual(true);
  });
};

var errorTests = function errorTests() {
  var error = 'Houston, we have a problem';
  var selector = 'div.alert.alert-danger.error';
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_ForgotPassword.ForgotPasswordComponent, null));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      error: error
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var resetPassword = jest.fn();
  var email = 'bob@gmail.com';
  var props = {
    resetPassword: resetPassword
  };
  var component = (0, _enzyme.mount)(_react["default"].createElement(_ForgotPassword.ForgotPasswordComponent, props));
  component.setState({
    email: email
  });
  it('should submit state', function () {
    component.find('button.submit').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(resetPassword).toBeCalledWith(email);
  });
};

describe('ForgotPassword Component', function () {
  describe('Render', renderTests);
  describe('State', stateTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});